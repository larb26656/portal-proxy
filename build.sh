docker build -t portal-proxy .
docker create --name portal-proxy-container portal-proxy
# clear old output
rm -rf ./dist
docker cp portal-proxy-container:/app/dist ./dist
docker rm portal-proxy-container