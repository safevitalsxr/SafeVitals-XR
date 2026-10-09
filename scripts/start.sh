#!/bin/bash

cd /home/ubuntu/SafeVitals-XR

pm2 restart safevitals-frontend

pm2 save
