#!/bin/bash

cd /home/ubuntu/SafeVitals-XR

export PATH=$PATH:/usr/bin:/usr/local/bin

npm install
npm run build

pm2 restart safevitals-frontend || pm2 start npm --name safevitals-frontend -- run start

pm2 save
