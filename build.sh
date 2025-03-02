docker build -t portal-proxy .
docker create --name portal-proxy-container portal-proxy
# clear old output
rm -rf ./output
docker cp portal-proxy-container:/app/dist ./output
docker rm portal-proxy-container