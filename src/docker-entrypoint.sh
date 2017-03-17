#!/bin/sh
cd /app

if [ "$1" ]
then
    PORT=$1 node ./www
else
    PORT=51366 node ./www
fi
