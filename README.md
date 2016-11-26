# Racket O Meter app

[![Build Status](https://travis-ci.org/racketometer/frontend-application.svg?branch=master)](https://travis-ci.org/racketometer/frontend-application)
[![Coverage Status](https://coveralls.io/repos/github/racketometer/frontend-application/badge.svg?branch=master)](https://coveralls.io/github/racketometer/frontend-application?branch=master)
[![dependencies Status](https://david-dm.org/racketometer/frontend-application/status.svg)](https://david-dm.org/racketometer/frontend-application)
[![devDependencies Status](https://david-dm.org/racketometer/frontend-application/dev-status.svg)](https://david-dm.org/racketometer/frontend-application?type=dev)

* [Development](#development)
  * [Running](#running)
  * [Linting](#linting)
  * [Unit testing](#unit-testing)
* [Contributors](#contributors)


<h2 id="development">Development</h2>

Install platform runtimes for iOS and Android and npm dependencies.

```
$ tns install
```

<h3 id="running">Running</h3>

The following commands are available for starting the application in `livesync` mode.
Refer to the NativeScript [CLI documentation](https://github.com/NativeScript/nativescript-cli#the-commands) for more options.
```
$ npm run android
$ npm run android-emulator
$ npm run ios
```

<h3 id="linting">Linting</h3>

Linting uses [tslint](https://www.npmjs.com/package/tslint) + [codelyzer](https://github.com/mgechev/codelyzer) rules.

```
$ npm run tslint
```

<h3 id="unit-testing">Unit Testing</h3>

Unit testing is done with [mocha](https://mochajs.org/) and [chai](http://chaijs.com/).

```
$ npm test
```

Coverage is generated with [istanbul](https://github.com/gotwarlost/istanbul) and posted to [Coveralls.io](https://coveralls.io/github/racketometer/frontend-application?branch=master).
```
$ npm run coverage
```
<h2 id="contributors">Contributors</h2>

The following is a list of all the people that have helped build app. Thanks for your contributions!

[<img alt="Crevil" src="https://avatars.githubusercontent.com/u/6881694?v=3&s=117" width="117">](https://github.com/Crevil)[<img alt="Karnich" src="https://avatars.githubusercontent.com/u/6881674?v=3&s=117" width="117">](https://github.com/Karnich)

<!-- Note: The table above get generated with the following commands -->
<!-- npm run contributes -->
<!-- paste the result into this section -->
