# GitHub Badge

[![Bower version](http://img.shields.io/bower/v/github-badge.svg?style=flat)](http://bower.io/search/?q=github-badge)
[![Build Status](https://img.shields.io/travis/joelself/github-badge/master.svg?style=flat)](https://travis-ci.org/joelself/github-badge)
[![DevDependencies Status](http://img.shields.io/david/dev/joelself/github-badge.svg?style=flat)](https://david-dm.org/joelself/github-badge#info=devDependencies)

[![Github Repo Demonstration](https://raw.githubusercontent.com/joelself/github-badge/gh-pages/img/github-badge.png)](https://github.com/joelself/github-badge)

A jQuery widget to show-off your Github Repositories.

Takes the best of [ricardobeat/github-repos](https://github.com/ricardobeat/github-repos) and [zenorocha/jquery-github](https://github.com/zenorocha/jquery-github) and adds:

* Option to display the number of watchers
* Official GitHub font for icons
* Configurable date format

NOW! No longer requires jQuery or Zepto!

## Browser Support

We do care about it.

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Getting started

Three quick start options are available:

* [Download latest release](https://github.com/joelself/github-badge/releases)
* Clone the repo: `git@github.com:joelself/github-badge.git`
* Install with [Bower](http://bower.io): `bower install github-badge`

## Setup

Use [Bower](http://bower.io) to fetch all dependencies:

```sh
$ bower install
```

Now you're ready to go!

## Usage

Create an attribute called `data-repo`:

```html
<div data-repo="jquery-boilerplate/jquery-boilerplate"></div>
```

Include widget's CSS and JS:

```html
<link rel="stylesheet" href="assets/base.css">
<script src="github-badge.min.js"></script>
```

Make sure the font is in the same directory as the ```base.css``` (or change ```base.css``` to reference the correct directory:

![Fonts in same directory as css](https://raw.githubusercontent.com/joelself/github-badge/gh-pages/img/font-dir.png)

Call the plugin:

```javascript
GHBadges.create("[data-repo]");
```

Or call it with options

```javascript
GHBadges.create("[data-repo]", {iconStars: true, iconWatchers: true, iconForks: true, iconIssues: true, dateFormat: "M/D/Y"});
```

And that's it.

[Check full example's source code](https://github.com/joelself/github-badge/blob/master/demo/index.html).

## Options

Here's a list of available settings.

```javascript
$("[data-repo]").github({
	iconStars:  false,
	iconWatchers: true,
	iconForks:  true,
	iconIssues: false,
        dateFormat: "D/M/Y"
});
```

Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`iconStars`		| *Boolean*		| `false`		| Displays the number of stars in a repository.
`iconWatchers`| *Boolean*		| `true`		| Displays the number of watchers in a repository.
`iconForks`		| *Boolean*		| `true`		| Displays the number of forks in a repository.
`iconIssues`	| *Boolean*		| `false`		| Displays the number of issues in a repository.
`dateFormat`	| *String*		| `"D/M/Y"`		| Specifies what format the date should be display as.

## Structure

The basic structure of the project is given in the following way:

```
.
|-- assets/
|-- demo/
|   |-- index.html
|   |-- index-zepto.html
|-- dist/
|   |-- github-badge.js
|   |-- github-badge.min.js
|-- src/
|   |-- github-badge.js
|   |-- github-badge.template.js
|   |-- template.html
|-- .editorconfig
|-- .gitignore
|-- .jshintrc
|-- .travis.yml
|-- bower.json
|-- github-badge.json
|-- Gruntfile.js
`-- package.json
```

#### [assets/](https://github.com/joelself/github-badge/tree/master/assets)

Contains CSS and Font files to create that lovely Github box.

#### [demo/](https://github.com/joelself/github-badgeb/tree/master/demo)

Contains a simple HTML file to demonstrate the plugin.

#### [dist/](https://github.com/joelself/github-badge/tree/master/dist)

This is where the generated files are stored once Grunt runs JSHint and other stuff.

#### [src/](https://github.com/joelself/github-badge/tree/master/src)

Contains the files responsible for the plugin.

#### [.editorconfig](https://github.com/joelself/github-badge/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/joelself/github-badge/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/joelself/github-badge/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/joelself/github-badge/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [gihub-badge.json](https://github.com/joelself/github-badge/tree/master/github-badge.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/joelself/github-badge/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/joelself/github-badge/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Showcase

* [dislocal.com/personal-projects](http://dislocal.com/personal-projects/)

**Have you used this plugin in your project?**

Let me know! Send a [tweet](http://twitter.com/joelself) or [pull request](https://github.com/joelself/github-badge/pull/new/master) and I'll add it here :)

## Alternatives

**Prefer AngularJS?**

No problem, [@lucasconstantino](https://github.com/lucasconstantino) already did that. Check [his fork](https://github.com/lucasconstantino/angular-github-repo)!

## Contributing

Check [CONTRIBUTING.md](https://github.com/joelself/github-badge/blob/master/CONTRIBUTING.md).

## History

Check [Releases](https://github.com/joelself/github-badge/releases) for detailed changelog.

## Credits

Based on [zenorocha/jquery-github](https://github.com/zenorocha/jquery-github) and [ricardobeat/github-repos](https://github.com/ricardobeat/github-repos)

## License

[MIT License](http://joelself.mit-license.org) © Joel Self
