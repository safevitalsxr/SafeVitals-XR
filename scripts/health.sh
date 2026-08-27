#!/bin/bash

sleep 10

curl -f http://127.0.0.1:3000/ > /dev/null

exit $?
