const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

async function getCommitHash() {
  try {
    const output = await exec('git rev-parse --short HEAD', {
      encoding: 'utf8',
    });

    return output.stdout.trim();
  } catch (gitErr) {
    console.error('Error getting git commit hash:', gitErr);
    return 'unknown';
  }
}

async function getDataFromPackage(packageJsonPath) {
  const dataJson = await fs.readFile(packageJsonPath, 'utf8');
  const data = JSON.parse(dataJson);

  return data;
}

async function writeFile(outputPath, data) {
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf8');
}

async function main() {
  try {
    const { version } = await getDataFromPackage(packageJsonPath);
    const data = {
      version,
    };

    const commitHash = await getCommitHash();
    data.commitHash = commitHash;

    const outputPath = path.join(__dirname, '..', 'version.json');

    writeFile(outputPath, data);
    console.log('version.json file has been created successfully');
  } catch (err) {
    console.error('Error processing files:', err);
  }
}

main();
