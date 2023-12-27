#!/bin/bash

COMMIT_HASH=$(git rev-parse HEAD)
DEPLOYMENT_SERVER_FILE="../k8s-configuration/deployment-server.yml"
DEPLOYMENT_CLIENT_FILE="../k8s-configuration/deployment-client.yml"

OS="$(uname)"
if [ "$OS" = "Darwin" ]; then
    # macOS
    sed -i '' "s|cesar02dd/server:latest|cesar02dd/server:$COMMIT_HASH|g" $DEPLOYMENT_SERVER_FILE
    sed -i '' "s|cesar02dd/client:latest|cesar02dd/client:$COMMIT_HASH|g" $DEPLOYMENT_CLIENT_FILE
else
    # Linux 
    sed -i "s|cesar02dd/server:latest|cesar02dd/server:$COMMIT_HASH|g" $DEPLOYMENT_SERVER_FILE
    sed -i "s|cesar02dd/client:latest|cesar02dd/client:$COMMIT_HASH|g" $DEPLOYMENT_CLIENT_FILE
fi

echo "Deployment files updated: $COMMIT_HASH"
