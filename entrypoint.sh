#!/bin/sh
apt-get update && apt-get upgrade -y
cd /frontend
npm install
npm start