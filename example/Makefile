TV_NAME := $(shell ~/tizen-studio/tools/sdb devices | perl -ne 'if(/\bdevice\b/){ @_ = split (/\s+/, $$_); print @_[0]; } ')
DEVICE_NAME = emulator-26101
CERTIFICATE_PROFILE = Tivi
TV_PROFILE = TiviTV
APP_NAME = example
PACKAGE_ID = G8xrhAN5vv

build:
	npx react-scripts build
	cp config.xml icon.png build
	tizen build-web --output ../tizen_build -- build
	tizen package --type wgt --sign $(CERTIFICATE_PROFILE) -- tizen_build

build-tv:
	npx react-scripts build
	cp config.xml icon.png build
	tizen build-web --output ../tizen_build -- build
	tizen package --type wgt --sign $(TV_PROFILE) -- tizen_build

start:
	tizen install --name $(APP_NAME).wgt -s $(DEVICE_NAME) -- tizen_build
	tizen run --pkgid $(PACKAGE_ID).$(APP_NAME) -s $(DEVICE_NAME)

start-tv:
	tizen install --name $(APP_NAME).wgt -s $(TV_NAME) -- tizen_build
	tizen run --pkgid $(PACKAGE_ID).$(APP_NAME) -s $(TV_NAME)

clean:
	tizen clean
	tizen uninstall --pkgid $(PACKAGE_ID).$(APP_NAME) -s $(DEVICE_NAME)

clean-tv:
	tizen clean
	tizen uninstall --pkgid $(PACKAGE_ID).$(APP_NAME) -s $(TV_NAME)

restart:
	make clean
	rm -rf build
	make build
	make start

restart-tv:
	make clean-tv
	rm -rf build
	make build-tv
	make start-tv