const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const packageJsonFilePath = path.join(__dirname, '..', 'package.json');
const versionFilePath = path.join(__dirname, '..', 'dist/constant/version.js');

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

async function replaceInFile(filePath, replacements) {
  let content = await fs.readFile(filePath, 'utf8');

  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key, 'g'), value);
  }

  await fs.writeFile(filePath, content, 'utf8');
}

async function patchVersionFile(filePath, data) {
  const replacements = {
    '<APP_VERSION>': data.version,
    '<APP_VERSION_COMMIT_HASH>': data.commitHash,
  };

  await replaceInFile(filePath, replacements);
}

async function main() {
  try {
    const { version } = await getDataFromPackage(packageJsonFilePath);
    const data = {
      version,
    };

    const commitHash = await getCommitHash();
    data.commitHash = commitHash;

    await patchVersionFile(versionFilePath, data);
    console.log('Patch version successfully');
  } catch (err) {
    console.error('Error processing files:', err);
  }
}

main();
