#!/bin/sh
# Use source login.curl.sh so that $TOKEN enviroment variable is set to curren session
# 
# https://medium.com/@nieldw/using-curl-to-authenticate-with-jwt-bearer-tokens-55b7fac506bd
# curl -vv -d '{"username": "root2", "password": "salasana"}'  -H 'Content-Type: application/json' http://localhost:3003/api/login
TOKEN=$(curl -s -X POST --data '{"username": "root2", "password": "salasana"}'  -H 'Content-Type: application/json' http://localhost:3003/api/login | jq -r '.token');
echo $TOKEN
# Set TOKEN to env
export TOKEN
