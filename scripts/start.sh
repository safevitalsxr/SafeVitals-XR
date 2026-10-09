#!/bin/bash
set -e
cd /home/ubuntu/SafeVitals-XR
npm ci --production
pm2 describe safevitals-frontend > /dev/null 2>&1 \
  && pm2 restart safevitals-frontend \
  || pm2 start npm --name "safevitals-frontend" -- start
pm2 save
