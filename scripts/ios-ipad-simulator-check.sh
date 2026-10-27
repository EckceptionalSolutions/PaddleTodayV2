#!/usr/bin/env bash
set -euo pipefail
SOURCE="${1:?Application checkout required}"
PHASE="${2:?prepare or capture required}"
EVIDENCE="$RUNNER_TEMP/ipad-evidence"
DERIVED="$RUNNER_TEMP/ipad-derived"
CACHE="$RUNNER_TEMP/ios-simulator-build-cache"
APP="$CACHE/PaddleToday.app"
mkdir -p "$EVIDENCE"
export EVIDENCE SOURCE APP CACHE
if [[ "$PHASE" == prepare ]]; then
  if [[ -d "$APP" ]]; then
    echo 'Using exact-source compiled simulator cache.'
    exit 0
  fi
cd "$SOURCE/apps/mobile"
npx expo prebuild --platform ios --no-install 2>&1 | tee "$EVIDENCE/prebuild.log"
(cd ios && pod install --repo-update) 2>&1 | tee "$EVIDENCE/pods.log"
xcodebuild -quiet -workspace ios/PaddleToday.xcworkspace -scheme PaddleToday -configuration Release -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath "$DERIVED" ARCHS="$(uname -m)" ONLY_ACTIVE_ARCH=YES CODE_SIGNING_ALLOWED=NO 2>&1 | tee "$EVIDENCE/xcodebuild.log"
mkdir -p "$CACHE"
ditto "$DERIVED/Build/Products/Release-iphonesimulator/PaddleToday.app" "$APP"
python3 - <<'PY'
import os,json,plistlib,subprocess,hashlib
info=plistlib.load(open(os.environ['APP']+'/Info.plist','rb'))
json.dump({'sourceCommit':subprocess.check_output(['git','-C',os.environ['SOURCE'],'rev-parse','HEAD'],text=True).strip(),'version':info['CFBundleShortVersionString'],'build':info['CFBundleVersion'],'nativeSimulator':True,'physicalDevice':False,'testFlightBinary':False,'identity':'local guest','planningLocation':'synthetic Minneapolis demo preference','savedRoutes':'Two public demo routes; no owner account data','javascriptSha256':hashlib.sha256(open(os.environ['APP']+'/main.jsbundle','rb').read()).hexdigest(),'xcode':subprocess.check_output(['xcodebuild','-version'],text=True).strip()},open(os.environ['CACHE']+'/provenance.json','w'),indent=2)
PY
  exit 0
fi
[[ "$PHASE" == capture ]]
test -d "$APP"
cp "$CACHE/provenance.json" "$EVIDENCE/provenance.json"
python3 - <<'PY'
import json,os,subprocess,hashlib
p=json.load(open(os.environ['CACHE']+'/provenance.json'))
assert p['sourceCommit']==subprocess.check_output(['git','-C',os.environ['SOURCE'],'rev-parse','HEAD'],text=True).strip()
assert p['javascriptSha256']==hashlib.sha256(open(os.environ['APP']+'/main.jsbundle','rb').read()).hexdigest()
PY
cd "$RUNNER_TEMP"
curl --fail --location --silent --show-error https://github.com/mobile-dev-inc/Maestro/releases/download/cli-2.12.0/maestro.zip -o maestro.zip
curl --fail --location --silent --show-error https://github.com/mobile-dev-inc/Maestro/releases/download/cli-2.12.0/checksums_sha256.txt -o checksums_sha256.txt
CHECKSUM="$(awk '$2 ~ /maestro.zip$/ { print $1 }' checksums_sha256.txt)"
test "${#CHECKSUM}" = 64
echo "$CHECKSUM  maestro.zip" | shasum -a 256 -c -
unzip -q maestro.zip -d maestro-install
export PATH="$RUNNER_TEMP/maestro-install/maestro/bin:$PATH"
DEVICE_KINDS="ipad iphone"
case "${NATIVE_CAPTURE_SCOPE:-all}" in
  all) FLOW="$GITHUB_WORKSPACE/tests/mobile-native/ipad-guest.yaml" ;;
  route-details) FLOW="$GITHUB_WORKSPACE/tests/mobile-native/route-screens.yaml" ;;
  explore-list) FLOW="$GITHUB_WORKSPACE/tests/mobile-native/explore-list.yaml"; DEVICE_KINDS="iphone" ;;
  *) echo 'Unknown capture scope'; exit 1 ;;
esac
FAILED=0
for DEVICE_KIND in $DEVICE_KINDS; do
  export DEVICE_KIND
  mkdir -p "$EVIDENCE/$DEVICE_KIND"
  xcrun simctl list devices available --json > "$RUNNER_TEMP/ipad-devices.json"
  export SIMULATOR_ID="$(python3 "$GITHUB_WORKSPACE/scripts/ios-simulator-demo-state.py" select)"
  xcrun simctl boot "$SIMULATOR_ID"
  xcrun simctl bootstatus "$SIMULATOR_ID" -b
  xcrun simctl status_bar "$SIMULATOR_ID" override --time '9:41' --dataNetwork wifi --wifiMode active --wifiBars 3 --batteryState charged --batteryLevel 100
  xcrun simctl install "$SIMULATOR_ID" "$APP"
  export CONTAINER="$(xcrun simctl get_app_container "$SIMULATOR_ID" com.paddletoday.mobile data)"
  python3 "$GITHUB_WORKSPACE/scripts/ios-simulator-demo-state.py" seed
  maestro --device "$SIMULATOR_ID" test --test-output-dir "$EVIDENCE/$DEVICE_KIND/maestro" "$FLOW" || FAILED=1
  xcrun simctl shutdown "$SIMULATOR_ID"
done
exit "$FAILED"
