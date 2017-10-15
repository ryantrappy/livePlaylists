#!/usr/bin/env bash

# handy function for terminal logging
function echoDate {
	echo "`date +%H:%M:%S` $1"
}

firebase deploy > logging.txt;

echo "firebase deployed on ";
echoDate;