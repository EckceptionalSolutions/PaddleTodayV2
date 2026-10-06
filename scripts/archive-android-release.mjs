import { archiveAndroidRelease } from './lib/android-release-archive.mjs';

const index = process.argv.indexOf('--destination');
if (index < 0 || !process.argv[index + 1]) throw new Error('Supply --destination with the chosen archive directory. This command archives only and never removes checkout copies.');
const result = await archiveAndroidRelease({ destination: process.argv[index + 1] });
console.log(JSON.stringify(result, null, 2));
