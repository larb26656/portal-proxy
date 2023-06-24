# build UI
cd ui/
npm run build:prod
cd ..

# clear previous build
rm -rf ui-assets
# mkdir ui-assets

cp -R ui/dist/protal-proxy-ui ui-assets

# build core
npm run build