# Makefile to start Titanium Mobile project from the command line.
# More info at http://github.com/guilhermechapiewski/titanium-jasmine

PROJECT_ROOT=$(shell pwd)
empty :=
space := $(empty) $(empty)
escapedSpace := \

ESCAPED_PROJECT_ROOT=$(subst $(space),$(escapedSpace),$(PROJECT_ROOT))
APP_UUID=$(app_uuid)
DIST_NAME=$(dist_name)

run-iphone:
	@DEVICE_TYPE=iphone PLATFORM=ios make run
test-iphone:
	@DEVICE_TYPE=iphone PLATFORM=ios make test
run-ipad:
	@DEVICE_TYPE=ipad PLATFORM=ios make run
test-ipad:
	@DEVICE_TYPE=ipad PLATFORM=ios make test
run-android:
	@DEVICE_TYPE=android PLATFORM=android make run
test-android:
	@DEVICE_TYPE=android PLATFORM=android make test
distribute-universal:
	@DEVICE_TYPE=universal UPDATE_BUILD_NUMBER=1 PLATFORM=ios make distribute
distribute-appstore:
	@echo "Distributing application for app store"
	@PROJECT_ROOT=${ESCAPED_PROJECT_ROOT} PLATFORM=ios DEVICE_TYPE=universal RUN_UNIT_TESTS=0 DISTRIBUTE_APP=0 DISTRIBUTE_APP_STORE=1 UPDATE_BUILD_NUMBER=1 APP_UUID=${APP_UUID} DIST_NAME=${DIST_NAME} bash ${ESCAPED_PROJECT_ROOT}/bin/titanium.sh
distribute-android:
	@echo "Distributing application for app store"
	@PROJECT_ROOT=${ESCAPED_PROJECT_ROOT} PLATFORM=android RUN_UNIT_TESTS=0 DISTRIBUTE_APP=0 DISTRIBUTE_APP_STORE=1 UPDATE_BUILD_NUMBER=1 DIST_NAME=${DIST_NAME} bash ${ESCAPED_PROJECT_ROOT}/bin/titanium.sh

run:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make run-[iphone|ipad]\" instead.";\
		exit 1;\
	fi
	@echo "" > ${ESCAPED_PROJECT_ROOT}/app/controllers/testsEnabled.js
	@echo "$$.testsEnabled=false;" > ${ESCAPED_PROJECT_ROOT}/app/controllers/testsEnabled.js
	@RUN_UNIT_TESTS=0 make launch-titanium
test:
	@if [ "${DEVICE_TYPE}" == "" ]; then\
		echo "Please run \"make test-[iphone|ipad]\" instead.";\
		exit 1;\
	fi
	@echo "$$PROJECT_ROOT"
	@echo "Enabling tests"
	@echo "$$.testsEnabled=true;" > ${ESCAPED_PROJECT_ROOT}/app/controllers/testsEnabled.js

	@RUN_UNIT_TESTS=1 make launch-titanium

distribute:
	@echo "Distributing application"
	@echo "" > ${ESCAPED_PROJECT_ROOT}/app/controllers/testsEnabled.js
	@echo "$$.testsEnabled=false;" > ${ESCAPED_PROJECT_ROOT}/app/controllers/testsEnabled.js
	@PROJECT_ROOT=${ESCAPED_PROJECT_ROOT} DEVICE_TYPE=${DEVICE_TYPE} RUN_UNIT_TESTS=0 DISTRIBUTE_APP=1 UPDATE_BUILD_NUMBER=${UPDATE_BUILD_NUMBER} APP_UUID=${APP_UUID} DIST_NAME=${DIST_NAME} bash ${ESCAPED_PROJECT_ROOT}/bin/titanium.sh
clean:
	@rm -rf "${ESCAPED_PROJECT_ROOT}/build/*"
	@mkdir -p "${ESCAPED_PROJECT_ROOT}/build/"
	@echo "Deleted: ${ESCAPED_PROJECT_ROOT}/build/*"

launch-titanium:
	@echo "Building with Titanium... (DEVICE_TYPE:${DEVICE_TYPE} PLATFORM:${PLATFORM}))"
	@PROJECT_ROOT=${ESCAPED_PROJECT_ROOT} PLATFORM=${PLATFORM} DISTRIBUTE_APP=0 DEVICE_TYPE=${DEVICE_TYPE} RUN_UNIT_TESTS=${RUN_UNIT_TESTS} bash ${ESCAPED_PROJECT_ROOT}/bin/titanium.sh
