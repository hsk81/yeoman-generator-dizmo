# generator-dizmo [![NPM version][npm-image]][npm-url]
> Dizmo generator

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-dizmo` using [npm] (we assume you have [node.js](https://nodejs.org/) pre-installed):

```bash
npm install -g yo
npm install -g generator-dizmo
```

On most operating systems the `-g` option (shortcut for `--global`) requires super user (administrator) rights: Therefore, on Unix like systems you might be required to run the above commands using either `sudo` (i.e. `sudo npm install -g yo` and `sudo npm install -g generator-dizmo`), or run them directly from your super user account of your operating system.

## Quick start

Invoke the dizmo generator with a name of your choice, for example `my-dizmo` and answer a few questions:

    yo dizmo my-dizmo

After a successful build, drag and drop the `./build/MyDizmo-0.0.0.dzm` file onto *dizmoViewer*: You should see the front side of the dizmo with `Hello World!` written on it. The name parameter is optional and can be changed at the prompt. Further, calling `yo dizmo` is equivalent to invoking the default generator with `yo dizmo:app`.

To list all possible arguments and options of the generator, enter:

     yo dizmo --help

## Caching

[Npm] uses a built in [cache](https://docs.npmjs.com/misc/config#cache) mechanism to accelerate package installation. There are various configuration options to control the behaviour of the cache. Here, we are interested in [cache-min](https://docs.npmjs.com/misc/config#cache-min):

> The minimum time (in seconds) to keep items in the registry cache before re-checking against the registry. [default: 10]

The provided default of `10` seconds is too short, to efficiently make use of caching. Therefore, we recommend setting it to for example a week by running the configuration command:

    npm config set cache-min 604800

By setting `chache-min` to `604800`, you ensure that no package with a timestamp younger than a week is checked against the central registry for a possible update. This significantly improves your [npm] experience.

Further, we suggest to clear the cache initially by running `npm cache clean`, but this is not necessarily required: It will simply wipe out your cached packages, and ensure that no corrupted cache exists. However, this also means that your very first dizmo skeleton generation (and corresponding installation of [npm] packages) will take longer than later invocations. By running `npm cache ls` you can determine, which [npm] packages have already been cached.

*Note:* It's recommended to clean the cache also before an update of the `generator-dizmo` generator itself, by running `npm cache clean`.

### Questions

At the start, you will be asked a few questions, after which the terminal should look similar to:

    ~/my-dizmos $ yo dizmo

         _-----_
        |       |    .--------------------------.
        |--(o)--|    |  Welcome to the awesome  |
       `---------´   |     dizmo generator!     |
        ( _´U`_ )    '--------------------------'
        /___A___\
         |  ~  |
       __'.___.'__
     ´   `  |° ´ Y `

    ? Name your dizmo: MyDizmo
    ? Describe it: My Dizmo
    ? And its bundle ID? com.example.my_dizmo
    ? What's your name? Name Surname
    ? And your email? name.surname@mail.net

The `dizmo` generator asks you some questions -- let's have a look at them:

    ? Name your dizmo: MyDizmo

If no `dizmoName` argument is provided then by default `MyDizmo` will be suggested: accept or change it as desired. This name will be used to create a project folder in the current director. For example, for the `MyDizmo` name the folder will be `my-dizmo/`.

    ? Describe it: My Dizmo

You should provide a short succinct description of your project. By default the name of the current dizmo will be taken as a base for a suggestion.

    ? And its bundle ID? com.example.my_dizmo

Each dizmo is required to have a unique `bundle.identifier`, which is a name of the bundle each dizmo *instance* will belong to: For example, each sticky-note dizmo would have the *same* `com.dizmo.stickynote` bundle ID (but with *different* dizmo IDs). Choose as a prefix the domain of your company (in reverse notation with top level domain names like `com` or `org` preceding the rest), and then append a name related to the dizmo.

    ? What's your name? Full Name

Provide your full name, to designate yourself as the author of the project. By default, the current GIT user name &ndash; if available &ndash; or OS login will be suggested. Anything you enter here will be remembered and automatically suggested as the default at your next invocation of `yo dizmo`.

The entry will be stored once the project skeleton is setup in `package.json` under `person.name`. For multiple contributors, see the [npm:package.json](https://docs.npmjs.com/files/package.json) documentation, section [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

    ? And your email? my@email.net

Provide your email, so people can reach out to you for feedback, bug reports etc. By default the generator suggests the GIT user email &ndash; if available &ndash; or the `MAIL` environment variable (which you may want to correct with your proper email). Again, the next time you invoke `yo dizmo`, your most recent entry will be the new default suggestion.

The entry will be stored in `package.json` under `person.email`.
For multiple contributors, see again [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

## Skeleton

After you have answered the last question, the generator will create the project's skeleton. If you have the `tree` command installed on your operating system, then you can visualize the directory structure:

    my-dizmo $ tree
    .
    ├── .eslintrc.json
    ├── assets
    │   ├── Icon-dark.svg
    │   ├── Icon.svg
    │   ├── locales
    │   │   ├── translation.de.json
    │   │   └── translation.en.json
    │   └── Preview.png
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       └── *
    ├── gulpfile.js
    ├── help
    │   └── en
    │       ├── help.md
    │       └── placeholder-400x275.png
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── src
        ├── index.html
        ├── index.js
        ├── lib
        │   └── i18n-*.min.js
        └── style
            └── style.scss

Let's have a look at each ot the top level files and directories:

* `.eslintrc.json`: a JSON file, which can be used to configure the linting process for the JavaScript code; see [eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring) for further information.

* `assets`: A folder containing asset files like images, which can be accessed from within the dizmo using a relative path like `assets/Preview.png`. Put any such files (or media) which are not directly related to styling into this folder. You can also create sub-folders or any nested directory structure according to your needs. One such folder is `assets/locales` where JSON files for translation purposes can be found. 

* `gulp`: A folder containing a build system based on [gulp](http://gulpjs.com/). If you are familiar with `gulp`, then you can change the build mechanism according to your needs; otherwise, just use it as it is.

* `gulpfile.js`: The main script driving the `gulp` build system; usually you can leave this file as it is.

* `help`: Once you have developed your dizmo, you might want to provide user documentation, which can be placed in this folder.

* `LICENCE`: By default an [ISC](http://opensource.org/licenses/ISC) (Internet Software Consortium) license is generated, which is functionally equivalent to the simplified BSD and MIT licenses, but with a simpler language. Leave or change this according to your needs.

* `package.json`: This is an important file! It is consumed by the [npm] package manager, provides run scripts for the build system (like `lint`, `clean`, `make`, `install` etc.), and allows to change the dizmo settings. Have a look below at the corresponding section for further information.

* `README.md`: A simple shortened version of this README.md; it is meant to provide a quick overview, and can then be replaced with a project specific content.

* `src`: A folder containing your own scripts for your dizmo, like `index.html` and `index.js` plus style sheets under `style/`, which use by default [SASS](http://sass-lang.com/). Further, in the `src/lib/` folder you can put third party libraries, which you can then directly reference via a `<script>` tag in the `index.html` markup.

## Package manager: package.json

Dizmos use [npm] as a package manager; to thoroughly understand its functionality, please consult ["What is npm?"](https://docs.npmjs.com/getting-started/what-is-npm) and work through the 15 small video based tutorials in the *Getting Started* section.

### Dizmo section

In addition to the default entries of [npm] the `package.json` file contains a `dizmo` section:

    "dizmo": {
        "build": {
            "lint": true,
            "minify": {
                "markups": {
                    "htmlmin": false
                },
                "scripts": {
                    "sourcemaps": false,
                    "obfuscator": false,
                    "uglify": false
                },
                "styles": {
                    "sourcemaps": false,
                    "sass": false
                }
            }
            "minify": {
                "markups": false,
                "scripts": false,
                "styles": false
            }
        },
        "settings": {
            "bundle-identifier": "com.example.my_project",
            "bundle-name": "My Project",
            "height": 240,
            "width": 480
        }
    }

And here is a list of available options:

* `build/lint`: switches [ESLint][eslint] based linting on or off -- edit the `.eslintrc.json` configuration file to have a detailed control over the linting process; see also [gulp-eslint] for additional information.

* `build/minify`: switches the minification of the markup (i.e. `*.html`), scripts (i.e. `*.js`) and styles (i.e. `*.css`) on or off -- but each sub-process can also be toggled separately. Further, they also can be tweaked in detail by providing a corresponding configuration object; see the corresponding [gulp-htmlmin], [javascript-obfuscator], [gulp-uglify] and [gulp-sass] pages for more information. Source map generation can be controlled as well, and is off by default. Further, to keep `package.json` simple, the `build/minify` flag is set upon project generation directly to `false`.

* `settings`: Any entry provided here will be translated to an entry in `build/Info.plist`, which is the main control file defining the properties of a dizmo.

### Default Configuration

The `dizmo` section in `package.json` can be extended with default values, which have to reside in `.generator-dizmo/config.json` (in *any* of the parent directories):

    {
        "dizmo": {
            "path": "..", "settings": {
                ..
            }
        }
    }

The configuration is hierarchical and recursive, meaning that a `.generator-dizmo/config.json` file can be saved in any parent directory of the current project, all of which are then merged during the build dynamically into `package.json`, where configuration values from files in the *lower levels* (meaning closer to `package.json`) have precedence.

#### Yeoman: Managing Configuration

As alternative to `.generator-dizmo/config.json` the `.yo-rc.json` file can be used to store default configuration values; see [managing configuration](http://yeoman.io/authoring/storage.html) for further information.

## NPM scripts

Please read first [npm#scripts](https://docs.npmjs.com/misc/scripts) -- in each `package.json` the following scripts are available:

* `clean`: completely removes the `./build` sub-directory.
```
npm run clean
```

* `deploy`: builds and installs the dizmo to a installation path given by the `dizmo/path` configuration entry in `package.json` (or better in `.generator-dizmo/config.json`):
```
npm run deploy
```

* `deploy`: ..or if the `DZM_PATH` environment variable has been defined, then the dizmo is copied to the corresponding location.
```
DZM_PATH=/path/to/installed/dizmos npm run deploy
```

* `lint`: applies linting to your source code using [ESLint][eslint], which can be configured via `.eslintrc.json`.
```
npm run lint
```

* `make`: builds the dizmo (including the `*.dzm` artifact) from scratch and puts it into the `./build` sub-directory.
```
npm run make
```

* `test`: ensures to run tests -- by default no tests nor a test framework are pre-defined (therefore, a simple `exit 0` script has been provided). It is up to the dizmo developer to decide how tests shall be implemented. The only condition is, that the main test script should provide an exit value of `0` in case of success.
```
npm run test
```

* `watch`: watches your source code, and incrementally (and quickly!) rebuilds the dizmo on any change.
```
npm run watch
```

* `watch`: ..further, it copies the build to the installation path, if either the `dizmo/path` configuration has been set in `package.json` (or better in `.generator-dizmo/config.json`) or `DZM_PATH` environment variable has been provided.
```
DZM_PATH=/path/to/installed/dizmos npm run watch
```

## Build

Once your dizmo is build, a `build/` folder with the following structure is created:

    my-dizmo $ tree build/
    build/
    ├── MyDizmo
    │   ├── Icon-dark.svg
    │   ├── Icon.svg
    │   ├── Info.plist
    │   ├── Preview.png
    │   ├── assets
    │   │   ├── Icon-dark.svg
    │   │   ├── Icon.svg
    │   │   └── Preview.png
    │   ├── help.zip
    │   ├── index.html
    │   ├── index.js
    │   ├── lib
    │   │   └── i18n-*.min.js
    │   └── style
    │       └── style.css
    └── MyDizmo-0.0.0.dzm

* `MyDizmo-0.0.0.dzm`: A ZIP archive of the `MyDizmo` folder with a version suffix, which has been defined in `package.json`. Please see [semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning) for further information.

  In dizmoViewer only the dizmo bundle with the highest version number is cached! Therefore, it is important to increase the version, when releasing a dizmo to your audience. However, simply changing the version suffix in the `*.dzm` file name will *not* work: The version is required to be set in `MyDizmo/Info.plist` (which happens automatically based on the version information in `package.json`).

* `MyDizmo/Info.plist`: a list of properties (in XML notation) defining a dizmo. This file is derived from the original `.info.plist` template, which has been enriched with information from `package.json`.

* `MyDizmo/assets`: a copy of the original `assets` folder;
* `MyDizmo/help.zip`: a ZIP archive of the original `help` folder;
* `MyDizmo/index.html`: the main HTML script;
* `MyDizmo/index.js`: the main JavaScript;
* `MyDizmo/lib/i18n-*.min.js`: [i18next](http://i18next.com/) internationalization wrapper;
* `MyDizmo/style/style.css`: Cascading Style Sheets.

### Dizmo instantiation

By dragging and dropping the `MyDizmo-0.0.0.dzm` artifact onto dizmoViewer a corresponding dizmo can be instantiated. If it has not been already installed, it will get installed to the default location as well.

## Extended sub-generators

Once you have accommodated yourself with some dizmo development, you can go further and try out the `dizmo:ext-coffee-script` and `dizmo:ext-type-script` sub-generators.

### dizmo:ext-coffee-script &ndash; CoffeeScript integration

Invoke the `dizmo:ext-coffee-script` sub-generator with:

    yo dizmo my-dizmo --coffee-script

This will run the basic generator and then apply on top of it the extended CoffeeScript sub-generator, which will then create (or modify) the project's standard structure:

    my-dizmo $ tree
    .
    ├── coffeelint.json
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       └── *
    ├── package.json
    └── src
        └── index.coffee

* **CoffeeScript:** Using the `index.coffee` file, you can start developing your application in [CoffeeScript](http://coffeescript.org/).

### dizmo:ext-type-script &ndash; TypeScript integration

Invoke the `dizmo:ext-type-script` sub-generator with:

    yo dizmo my-dizmo --type-script

This will run the basic generator and then apply on top of it the extended [TypeScript](http://www.typescriptlang.org/) sub-generator, which will create (or modify) the project's standard structure:

    my-dizmo $ tree
    .
    ├── .tslint.json
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       └── *
    ├── package.json
    ├── src
    │   └── app
    │       ├── app.ts
    │       ├── dizmo.ts
    │       └── window.ts
    └── tsconfig.json

* **TypeScript:** Using the `index.ts` file you can start developing your application in [TypeScript](http://www.typescriptlang.org/).

## Miscellanea

### GIT initialization

Invoke a generator (or a sub-generator) combined with the `--git` option:

    yo dizmo my-dizmo --git

The created project folder will now be named `my-dizmo.git`, and it will be initialized as a GIT repository -- no commits will be performed though. Further, this only will work if the `git` command is accessible.

### Dependency management

All (sub-)generators support dependency management using [Node modules][node-module]: You can structure your dizmo code using `require`, `exports` and `module.exports` objects. Further, you can install external third party libraries and reference them directly with `require`. For example, to use `jQuery` run:
```
npm install --save jquery
```
Then in your code you can get a reference with:
```
var $ = require('jquery');
```
If you want to remove an installed library just run:
```
npm remove --save jquery
```

This approach works well, as long as the external libraries are not too large, since otherwise the build process may take longer. In such cases you should use the incremental builder using the watcher:
```
npm run watch
```
Or you can simply drop a library into the `src/lib/` sub-directory and reference it accordingly via a corresponding `<script>` tag in the `index.html` markup.

## Troubleshooting/FAQ

### Did I forget to run `npm install`?

If `npm install` is *not* run before attempting to build a dizmo, then a message similar to the one below might be produced:
```bash
error argv "/usr/local/bin/node" "/usr/local/bin/npm" "run" "make"
error node v4.2.6
error npm  v3.8.1
error code ELIFECYCLE
error MyDizmo@0.0.0 make: `node ./node_modules/gulp/bin/gulp.js`
error Exit status 1
error Failed at the MyDizmo@0.0.0 make script 'node ./node_modules/gulp/bin/gulp.js'.
```

In such a case, just run `npm install` to ensure that all the required dependencies get installed locally.

## License

 © 2017 [dizmo AG, Switzerland](http://dizmo.com/)

[eslint]: http://eslint.org/
[gulp-eslint]: https://www.npmjs.com/package/gulp-eslint
[gulp-htmlmin]: https://www.npmjs.com/package/gulp-htmlmin
[gulp-sass]: https://www.npmjs.com/package/gulp-sass
[gulp-uglify]: https://www.npmjs.com/package/gulp-uglify
[javascript-obfuscator]: https://github.com/javascript-obfuscator/javascript-obfuscator
[node-module]: https://nodejs.org/api/modules.html
[npm]: https://www.npmjs.com
[npm-image]: https://badge.fury.io/js/generator-dizmo.svg
[npm-url]: https://npmjs.org/package/generator-dizmo
