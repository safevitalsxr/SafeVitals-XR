#!/bin/bash

cd /home/ubuntu/SafeVitals-XR

npm install

npm run build

pm2 restart safevitals-frontend || pm2 start npm --name safevitals-frontend -- start

pm2 save
