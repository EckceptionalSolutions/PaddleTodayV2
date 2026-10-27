#!/usr/bin/env bash
set -euo pipefail
SOURCE="${1:?Application checkout required}"
EVIDENCE="$RUNNER_TEMP/ipad-evidence"
DERIVED="$RUNNER_TEMP/ipad-derived"
mkdir -p "$EVIDENCE"
export EVIDENCE SOURCE
cd "$SOURCE/apps/mobile"
npx expo prebuild --platform ios --no-install > "$EVIDENCE/prebuild.log" 2>&1
(cd ios && pod install --repo-update) > "$EVIDENCE/pods.log" 2>&1
xcrun simctl list devices available --json > "$RUNNER_TEMP/ipad-devices.json"
export SIMULATOR_ID="$(python3 - <<'PY'
import json,os
d=json.load(open(os.environ['RUNNER_TEMP']+'/ipad-devices.json'))['devices']
choices=[(runtime,device) for runtime,devices in d.items() if 'iOS-26' in runtime for device in devices if 'iPad Pro 13' in device['name'] and device['isAvailable']]
if not choices: raise SystemExit('No installed iPad Pro 13-inch iOS 26 simulator')
runtime,device=sorted(choices,key=lambda c:c[0])[-1]
json.dump({'runtime':runtime,'device':device['name'],'udid':device['udid']},open(os.environ['EVIDENCE']+'/simulator.json','w'),indent=2)
print(device['udid'])
PY
)"
xcrun simctl boot "$SIMULATOR_ID"
xcrun simctl bootstatus "$SIMULATOR_ID" -b
xcrun simctl status_bar "$SIMULATOR_ID" override --time '9:41' --dataNetwork wifi --wifiMode active --wifiBars 3 --batteryState charged --batteryLevel 100
xcodebuild -workspace ios/PaddleToday.xcworkspace -scheme PaddleToday -configuration Release -sdk iphonesimulator -destination "id=$SIMULATOR_ID" -derivedDataPath "$DERIVED" ONLY_ACTIVE_ARCH=YES CODE_SIGNING_ALLOWED=NO > "$EVIDENCE/xcodebuild.log" 2>&1
APP="$DERIVED/Build/Products/Release-iphonesimulator/PaddleToday.app"
test -d "$APP"
xcrun simctl install "$SIMULATOR_ID" "$APP"
CONTAINER="$(xcrun simctl get_app_container "$SIMULATOR_ID" com.paddletoday.mobile data)"
export CONTAINER APP
python3 - <<'PY'
import os,json,pathlib,plistlib,subprocess,hashlib
p=pathlib.Path(os.environ['CONTAINER'])/'Library/Application Support/com.paddletoday.mobile/RCTAsyncLocalStorage_V1'
p.mkdir(parents=True,exist_ok=True)
# Only local guest demo preferences. No authentication tokens or production account data.
values={'paddletoday:welcome-completed:v1':'1','paddletoday:welcome-choice:v1':'guest','paddletoday:user-location':json.dumps({'latitude':44.98,'longitude':-93.26,'label':'Minneapolis, MN','source':'search'})}
(p/'manifest.json').write_text(json.dumps(values))
info=plistlib.load(open(os.environ['APP']+'/Info.plist','rb'))
json.dump({'sourceCommit':subprocess.check_output(['git','-C',os.environ['SOURCE'],'rev-parse','HEAD'],text=True).strip(),'version':info['CFBundleShortVersionString'],'build':info['CFBundleVersion'],'nativeSimulator':True,'physicalDevice':False,'testFlightBinary':False,'identity':'local guest','planningLocation':'synthetic Minneapolis demo preference','xcode':subprocess.check_output(['xcodebuild','-version'],text=True).strip()},open(os.environ['EVIDENCE']+'/provenance.json','w'),indent=2)
PY
cd "$RUNNER_TEMP"
curl --fail --location --silent --show-error https://github.com/mobile-dev-inc/Maestro/releases/download/cli-2.12.0/maestro.zip -o maestro.zip
curl --fail --location --silent --show-error https://github.com/mobile-dev-inc/Maestro/releases/download/cli-2.12.0/checksums_sha256.txt -o checksums_sha256.txt
CHECKSUM="$(awk '$2 ~ /maestro.zip$/ { print $1 }' checksums_sha256.txt)"
test "${#CHECKSUM}" = 64
echo "$CHECKSUM  maestro.zip" | shasum -a 256 -c -
unzip -q maestro.zip -d maestro-install
export PATH="$RUNNER_TEMP/maestro-install/maestro/bin:$PATH"
maestro --device "$SIMULATOR_ID" test --test-output-dir "$EVIDENCE/maestro" "$GITHUB_WORKSPACE/tests/mobile-native/ipad-guest.yaml"
