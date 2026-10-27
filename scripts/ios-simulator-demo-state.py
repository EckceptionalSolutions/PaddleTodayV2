"""Local simulator demo preferences only; never authenticate or change cloud data."""
import json, os, pathlib, sys

if sys.argv[1] == 'select':
    devices = json.load(open(os.environ['RUNNER_TEMP'] + '/ipad-devices.json'))['devices']
    prefix = 'iPad Pro 13' if os.environ['DEVICE_KIND'] == 'ipad' else 'iPhone 17 Pro Max'
    choices = [(runtime, device) for runtime, items in devices.items() if 'iOS-26' in runtime
               for device in items if device['name'].startswith(prefix) and device['isAvailable']]
    if not choices:
        raise SystemExit('Required installed simulator unavailable: ' + prefix)
    runtime, device = sorted(choices, key=lambda c: c[0])[-1]
    destination = pathlib.Path(os.environ['EVIDENCE']) / os.environ['DEVICE_KIND'] / 'simulator.json'
    destination.write_text(json.dumps({'runtime': runtime, 'device': device['name'], 'udid': device['udid']}, indent=2))
    print(device['udid'])
elif sys.argv[1] == 'seed':
    storage = pathlib.Path(os.environ['CONTAINER']) / 'Library/Application Support/com.paddletoday.mobile/RCTAsyncLocalStorage_V1'
    storage.mkdir(parents=True, exist_ok=True)
    routes = [
        {'slug': 'cannon-river-welch', 'name': 'Cannon River', 'reach': 'Cannon Falls to Welch', 'savedAt': '2026-10-27T09:41:00Z'},
        {'slug': 'minnesota-river-le-sueur-henderson', 'name': 'Minnesota River', 'reach': 'Le Sueur to Henderson', 'savedAt': '2026-10-27T09:41:00Z'},
    ]
    values = {'paddletoday:welcome-completed:v1': '1', 'paddletoday:welcome-choice:v1': 'guest',
              'paddletoday:user-location': json.dumps({'latitude': 44.98, 'longitude': -93.26, 'label': 'Minneapolis, MN', 'source': 'search'}),
              'paddletoday:saved-rivers': json.dumps(routes)}
    (storage / 'manifest.json').write_text(json.dumps(values))
else:
    raise SystemExit('select or seed required')
