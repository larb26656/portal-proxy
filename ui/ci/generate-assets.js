const fs = require('fs-extra');
const { generateFonts, FontAssetType, OtherAssetType } = require('fantasticon');

function clearAndCreateDir(dir) {
  if (fs.existsSync(dir)) {
    fs.removeSync(dir);
  }
  fs.ensureDirSync(dir);
}

function generateIcon(inputDir, outputDir, name, prefix) {
  // prepare dir
  clearAndCreateDir(outputDir);

  return generateFonts({
    inputDir: inputDir,
    outputDir: outputDir,
    name: name,
    fontTypes: [FontAssetType.EOT, FontAssetType.WOFF2, FontAssetType.WOFF],
    assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML, OtherAssetType.JSON, OtherAssetType.TS],
    formatOptions: { json: { indent: 2 } },
    templates: {},
    pathOptions: {},
    codepoints: {},
    fontHeight: 300,
    round: undefined, // --
    descent: undefined, // Will use `svgicons2svgfont` defaults
    normalize: undefined, // --
    selector: null,
    tag: 'i',
    prefix: prefix,
  });
}

async function bootstrap() {
  // generate portalProxyIcon
  const portalProxyIcon = await generateIcon('./src/assets/generate/icon', './src/assets/generate/icon-font/pp-icon', 'portal-proxy-icon', 'pp-i');
  console.log(portalProxyIcon);
}

bootstrap();
