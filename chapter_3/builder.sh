#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: ./builder.sh <github_repo_user/repo_name> <docker_hub_repo>"
    exit 1
fi

GITHUB_REPO=$1
DOCKER_REPO=$2
TEMP_DIR="temp_repo"

echo "--- Cloning repository: https://github.com/$GITHUB_REPO ---"

# 1. Clone
rm -rf "$TEMP_DIR"
git clone "https://github.com/$GITHUB_REPO.git" "$TEMP_DIR"

# Check if clone was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to clone."
    exit 1
fi

# 2. Build 
echo "--- Building: $DOCKER_REPO ---"
cd "$TEMP_DIR" || exit

docker build -t "$DOCKER_REPO" .

if [ $? -ne 0 ]; then
    echo "Error: build failed."
    cd ..
    rm -rf "$TEMP_DIR"
    exit 1
fi

# 3. Publish
echo "--- Publishing to: $DOCKER_REPO ---"
docker push "$DOCKER_REPO"

if [ $? -ne 0 ]; then
    echo "Error: Push failed. Are you logged in to Hub?"
    cd ..
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Cleanup
echo "--- Cleaning up ---"
cd ..
rm -rf "$TEMP_DIR"

echo "Done! Image $DOCKER_REPO is now on Docker Hub."