#!/bin/bash

COMMIT_HASH=$(git rev-parse HEAD)
DEPLOYMENT_SERVER_FILE="k8s-configuration/deployment-server.yml"
DEPLOYMENT_CLIENT_FILE="k8s-configuration/deployment-client.yml"
GITHUB_ACTIONS_FILE=".github/workflows/main.yml" 

OS="$(uname)"
if [ "$OS" = "Darwin" ]; then
    # macOS
    sed -i '' "s|cesar02dd/server:.*|cesar02dd/server:$COMMIT_HASH|g" $DEPLOYMENT_SERVER_FILE
    sed -i '' "s|cesar02dd/client:.*|cesar02dd/client:$COMMIT_HASH|g" $DEPLOYMENT_CLIENT_FILE
    sed -i '' "s|\${{\ secrets.DOCKERHUB_USERNAME }}/server:.*|\${{\ secrets.DOCKERHUB_USERNAME }}/server:$COMMIT_HASH|g" $GITHUB_ACTIONS_FILE
    sed -i '' "s|\${{\ secrets.DOCKERHUB_USERNAME }}/client:.*|\${{\ secrets.DOCKERHUB_USERNAME }}/client:$COMMIT_HASH|g" $GITHUB_ACTIONS_FILE
else
    # Linux 
    sed -i "s|cesar02dd/server:.*|cesar02dd/server:$COMMIT_HASH|g" $DEPLOYMENT_SERVER_FILE
    sed -i "s|cesar02dd/client:.*|cesar02dd/client:$COMMIT_HASH|g" $DEPLOYMENT_CLIENT_FILE
    sed -i '' "s|\${{\ secrets.DOCKERHUB_USERNAME }}/server:.*|\${{\ secrets.DOCKERHUB_USERNAME }}/server:$COMMIT_HASH|g" $GITHUB_ACTIONS_FILE
    sed -i '' "s|\${{\ secrets.DOCKERHUB_USERNAME }}/client:.*|\${{\ secrets.DOCKERHUB_USERNAME }}/client:$COMMIT_HASH|g" $GITHUB_ACTIONS_FILE
fi

echo "Deployment files and GitHub Actions workflow updated: $COMMIT_HASH"

