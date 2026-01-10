#!/bin/sh
if [ "$#" -ne 2 ]; then
    echo "Usage: builder <github_repo> <docker_repo>"
    exit 1
fi

GITHUB_REPO=$1
DOCKER_REPO=$2
TEMP_DIR="temp_repo"

echo "$DOCKER_PWD" | docker login -u "$DOCKER_USER" --password-stdin || exit 1

rm -rf "$TEMP_DIR"
git clone "https://github.com/$GITHUB_REPO.git" "$TEMP_DIR" || exit 1

cd "$TEMP_DIR"
docker build -t "$DOCKER_REPO" .
docker push "$DOCKER_REPO"

cd ..
rm -rf "$TEMP_DIR"