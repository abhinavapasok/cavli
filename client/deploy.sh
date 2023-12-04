#!/bin/sh

echo "Switching to branch master"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
sudo rm -rf /var/www/example.com/*
scp -i /Users/abhinavap/Downloads/key.pem -r ./dist/. ubuntu@44.219.251.149:/var/www/example.com/
echo "Deployment complete"