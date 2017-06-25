#!/bin/bash

PROJECT_ROOT=${PROJECT_ROOT}
APP_DEVICE=${DEVICE_TYPE}
PLATFORM=${PLATFORM}
TALL=${TALL}
RETINA=${RETINA}
IPHONE_SDK_VERSION="10.2"
IOS_SIM_VERSION="10.2"
TI_SDK_VERSION="6.0.0 .GA"
TI_DIR="~/Library/Application\ Support/Titanium"
TI_ASSETS_DIR="${TI_DIR}/mobilesdk/osx/${TI_SDK_VERSION}"
TI_IPHONE_DIR="${TI_ASSETS_DIR}/iphone"
TI_PHONE_SIMULATOR_DIR="~/Library/Application\ Support/iPhone\ Simulator"
TI_PHONE_APPLICATIONS_DIR="${TI_PHONE_SIMULATOR_DIR}/${IPHONE_SDK_VERSION}/Applications"
UNIT_TEST_RESULTS_FILENAME="Results.html"
TI_BUILD="${TI_IPHONE_DIR}/builder.py"
RUN_TESTS=${RUN_UNIT_TESTS}
DISTRIBUTE_APP=${DISTRIBUTE_APP}
UPDATE_BUILD_NUMBER=${UPDATE_BUILD_NUMBER}
APP_UUID=${APP_UUID}

if [ "DEVICE_TYPE" == "" ]; then
	echo "[ERROR] Please inform DEVICE_TYPE ('ipad' or 'iphone')."
	exit 1
fi

# Get APP parameters from current tiapp.xml
APP_ID=`cat tiapp.xml | grep "<id>" | sed -e "s/<\/*id>//g"`
APP_NAME="HigherLower"
if [ "APP_ID" == "" ] || [ "APP_NAME" == "" ]; then
	echo "[ERROR] Could not obtain APP parameters from tiapp.xml file (does the file exist?)."
	exit 1
fi

if [ $RUN_TESTS -eq 1 ]
then
	if [ $PLATFORM == "android" ]
	then
		echo "##teamcity[progressStart 'Building App Integration']"
		echo "Building Android Test..."
		bash -c "tn s8" &
		sleep 200
	else
		bash -c "tn iphone-6" &
		sleep 200
	fi
fi
exit 0
