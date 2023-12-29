#!/bin/bash

COMMIT_HASH=$(git rev-parse HEAD)
DEPLOYMENT_SERVER_FILE="k8s-configuration/deployment-server.yml"
DEPLOYMENT_CLIENT_FILE="k8s-configuration/deployment-client.yml"
DEPLOYMENT_MYSQL_FILE="k8s-configuration/deployment-mysql.yml"
GITHUB_ACTIONS_FILE=".github/workflows/main.yml" 

OS="$(uname)"

update_file() {
    local file=$1
    local pattern=$2
    local replacement=$3
    local os=$4

    if [ "$os" = "Darwin" ]; then
        sed -i '' "s|$pattern|$replacement|g" "$file"
    else
        sed -i "s|$pattern|$replacement|g" "$file"
    fi

    if [ $? -eq 0 ]; then
        echo "File update successfully: $file"
    else
        echo "Error updating file: $file"
    fi
}

update_file $DEPLOYMENT_SERVER_FILE "cesar02dd/server:.*" "cesar02dd/server:$COMMIT_HASH" $OS
update_file $DEPLOYMENT_CLIENT_FILE "cesar02dd/client:.*" "cesar02dd/client:$COMMIT_HASH" $OS
update_file $DEPLOYMENT_MYSQL_FILE "cesar02dd/mysql:.*" "cesar02dd/mysql:$COMMIT_HASH" $OS
update_file $GITHUB_ACTIONS_FILE "\${{\ secrets.DOCKERHUB_USERNAME }}/server:.*" "\${{\ secrets.DOCKERHUB_USERNAME }}/server:$COMMIT_HASH" $OS
update_file $GITHUB_ACTIONS_FILE "\${{\ secrets.DOCKERHUB_USERNAME }}/client:.*" "\${{\ secrets.DOCKERHUB_USERNAME }}/client:$COMMIT_HASH" $OS
update_file $GITHUB_ACTIONS_FILE "\${{\ secrets.DOCKERHUB_USERNAME }}/mysql:.*" "\${{\ secrets.DOCKERHUB_USERNAME }}/mysql:$COMMIT_HASH" $OS

echo "Files updated with hash: $COMMIT_HASH"
