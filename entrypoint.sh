#!/bin/sh
apt-get update && apt-get upgrade -y
yarn install
node ace serve --watch