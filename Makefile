run:
	node_modules/.bin/electron .
build:
	node_modules/.bin/electron-packager . wundertray --platform=linux --arch=x64 --out=dist --overwrite
