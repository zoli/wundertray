all: build
run:
	node_modules/.bin/electron .
build:
	node_modules/.bin/electron-packager . wundertray --platform=linux --arch=x64 --out=dist --overwrite
install: install_bin install_desktop
uninstall:
	rm -rf /usr/lib/wundertray /usr/bin/wundertray
	rm -rf /usr/share/applications/wundertray.desktop
install_bin:
	mkdir -p /usr/lib/wundertray
	cp -r dist/wundertray-linux-x64/* /usr/lib/wundertray
	ln -fs /usr/lib/wundertray/wundertray /usr/bin/wundertray
install_desktop:
	install -m 644 -p ./wundertray.desktop /usr/share/applications/wundertray.desktop
