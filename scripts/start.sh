#!/bin/bash

cd /home/ubuntu/SafeVitals-XR

pm2 restart safevitals-frontend || pm2 start npm --name safevitals-frontend -- run dev

pm2 save
