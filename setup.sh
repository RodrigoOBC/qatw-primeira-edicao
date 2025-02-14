cd .devcontainer/
docker-compose -f docker-compose.yml up -d --build 
docker network connect qatw-primeira-edicao_skynet playwrightDevContainer
