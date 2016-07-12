# Groceries

This branch contains the starting point for NativeScript’s [TypeScript & Angular 2 Getting Started Guide](http://docs.nativescript.org/angular/tutorial/ng-chapter-0). If you're looking for the completed state of the getting started guide, refer to [this repo's “angular-end” branch](https://github.com/NativeScript/sample-Groceries/tree/angular-end).
	Install win
	http://docs.nativescript.org/angular/start/ns-setup-win
	
	npm i -g nativescript
	
	tns doctor
	
	tns platform add ios
	
	tns run android --emulator
##development
	tns livesync android --emulator --watch
###images build
	http://nsimage.brosteins.com/

#TypeScript
	mkdir projectWithGulp && cd projectWithGulp && mkdir src && mkdir dist

projectWithGulp/
    +- src/
    +- dist/
	npm init //create package.js
	npm install -g typescript gulp-cli //install TypeScript and gulp globally
	npm install --save-dev gulp gulp-typescript//Gulp-typescript is a gulp plugin for Typescript.

##browserify
	npm install --save-dev browserify tsify vinyl-source-stream
##watchify
	npm install --save-dev watchify gulp-util
##uglify
	npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps
##babel
	npm install --save-dev babelify vinyl-buffer gulp-sourcemaps