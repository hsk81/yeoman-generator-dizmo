[![NPM version](https://badge.fury.io/js/%40dizmo%2Fgenerator-dizmo.svg)](https://npmjs.org/package/@dizmo/generator-dizmo)

# @dizmo/generator-dizmo
> Dizmo generator

## Prerequisites

* [Node.js] v8.11.3 LTS (or higher); for Linux distribution based packages (`deb` or `rpm`) see also [binary distributions](https://github.com/nodesource/distributions).

## How does dizmoGen work?

DizmoGen is a generator to create a project folder that contains a skeleton for a new dizmo. Further, the *build scripts* needed to turn the source code into a packed and installable dizmo artifact (`*.dzm`) are present as well. The generator itself is based on the [Yeoman] generator toolkit (which in turn is based on [Node.js]). After the initial generation of a project, neither dizmoGen nor Yeoman are required anymore to build your dizmo.

Use any text editor or IDE to edit the generated source code. Once ready you can use the build scripts to turn your project into a correctly formatted and packed dizmo: Invoking `npm run <script>` uses internally a Node.js based tool named [gulp], which orchestrates the entire build process to turn your source code into a dizmo. Possible `<script>` commands are `build`, `lint`, `clean` etc.

As the *totality* of all build scripts with their dependencies account for more than `100` MBytes, the dependencies are *excluded* when pushing a source folder to a remote Git repository. So, if you get a dizmo project from an external origin it is necessary to install them first. This is done within the build process *automatically* or can be triggered manually by invoking `npm install` from within the project folder, which will create a folder named `node_modules`, which should never be included in the Git repository!

The options and commands available to build, test and deploy dizmos will be upgraded from time to time. In such a case it may become necessary to update the relevant build scripts using dizmoGen (and Yeoman) again. Check the «Upgrading the Build System» section below about how to actualize your version of dizmoGen and the build scripts in your own dizmo project.

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-dizmo` using [npm] (we assume you have [Node.js] pre-installed):

```bash
(sudo) npm install -g yo
```
```bash
(sudo) npm install -g @dizmo/generator-dizmo
```

On most operating systems the `-g` option (shortcut for `--global`) requires super user (administrator) rights: Therefore, on Unix like systems you might be required to run the above commands using either `sudo` (i.e. `sudo npm install -g yo` and `sudo npm install -g generator-dizmo`), or run them directly from your super user account of your operating system.

## Quick start

Invoke the dizmo generator with a name of your choice, for example `my-dizmo` and answer a few questions:

    yo @dizmo/dizmo my-dizmo

After a successful build, drag and drop the `./build/MyDizmo-0.0.0.dzm` file onto *dizmoViewer*: You should see the front side of the dizmo with `Hello World!` written on it. The name parameter is optional and can be changed at the prompt. Further, calling `yo @dizmo/dizmo` is equivalent to invoking the default generator with `yo @dizmo/dizmo:app`.

To list all possible arguments and options of the generator, enter:

     yo @dizmo/dizmo --help

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

    ~/my-dizmos $ yo @dizmo/dizmo

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

Provide your full name, to designate yourself as the author of the project. By default, the current GIT user name &ndash; if available &ndash; or OS login will be used directly *without* actually prompting for the name. Otherwise, anything you enter here will be remembered and automatically used as the default on your next invocation of `yo @dizmo/dizmo`.

The entry will be stored once the project skeleton is setup in `package.json` under `person.name`. For multiple contributors, see the [npm:package.json](https://docs.npmjs.com/files/package.json) documentation, section [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

    ? And your email? my@email.net

Provide your email, so people can reach out to you for feedback, bug reports etc. By default the generator uses the GIT user email &ndash; if available &ndash; or the `MAIL` environment variable.

The entry will be stored in `package.json` under `person.email`.
For multiple contributors, see again [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

## Upgrading the Build System

Since the build system of each dizmo is saved directly within a project, we need an upgrade mechanism of the former for an existing latter. But first, we have to upgrade `generator-dizmo` by running:
```
npm upgrade -g @dizmo/generator-dizmo
```

Then *within* an existing project's main folder, we can execute:
```
yo @dizmo/dizmo --upgrade
```

It's also possible to only invoke `yo @dizmo/dizmo`, in which case each and every conflict between the existing and new files and folders need to be manually signed-off by the user. Since *all* conflicts need to be decided on, instead of just the conflicts w.r.t. the build system, this manual upgrading can be onerous.

However, with the `yo @dizmo/dizmo --upgrade` command, *only* the build system of the actual project is upgraded, while the none-build related files and folders remain untouched.

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

* `package.json`: This is an important file! It is consumed by the [npm] package manager, provides run scripts for the build system (like `lint`, `clean`, `build`, `install` etc.), and allows to change the dizmo settings. Have a look below at the corresponding section for further information.

* `README.md`: A simple shortened version of this README.md; it is meant to provide a quick overview, and can then be replaced with a project specific content.

* `src`: A folder containing your own scripts for your dizmo, like `index.html` and `index.js` plus style sheets under `style/`, which use by default [SASS](http://sass-lang.com/). Further, in the `src/lib/` folder you can put third party libraries, which you can then directly reference via a `<script>` tag in the `index.html` markup.

## Package manager: package.json

Dizmos use [npm] as a package manager; to thoroughly understand its functionality, please consult ["What is npm?"](https://docs.npmjs.com/getting-started/what-is-npm) and work through the 15 small video based tutorials in the *Getting Started* section.

### Dizmo section

In addition to the default entries of [npm] the `package.json` file contains a `dizmo` section:

    "dizmo": {
        "settings": {
            "attributes": {
                "settings/usercontrols/allowresize": true
            },
            "bundle-identifier": "com.example.my_project",
            "bundle-name": "My Project",
            "category": "",
            "height": 360,
            "tags": [
                "my-project"
            ],
            "width": 480
        },
        "store": {
            "host": "https://store-api.dizmo.com"
        },
        "build": {
            "lint": true,
            "minify": {
                "markups": {
                    "htmlmin": true
                },
                "scripts": {
                    "sourcemaps": false,
                    "obfuscate": true,
                    "uglify": true
                },
                "styles": {
                    "sourcemaps": true,
                    "sass": true
                }
            }
        }
    }

And here is a list of available options:

* `settings`: any entry provided here will be translated to an entry in `build/Info.plist`, which is the main control file defining the properties of a dizmo.

* `store`: configuration entries required by `npm run upload`, which needs `store/host` (by default pointing to `https://store-api.dizmo.com`), `store/user` and `store/pass`. The latter two should *not* be directly set in `package.json` but instead via the default configuration (see below), to avoid the store credentials to be accidentally committed to a version control system.

* `build/lint`: switches [ESLint][eslint] based linting on or off -- edit the `.eslintrc.json` configuration file to have a detailed control over the linting process; see also [gulp-eslint] for additional information.

* `build/minify`: switches the minification of the markup (`*.html`), scripts (`*.js`) and styles (`*.[s]css`) on or off -- but each sub-process can also be toggled separately. Further, they also can be tweaked in detail by providing a configuration object; see the corresponding [gulp-htmlmin], [javascript-obfuscator], [gulp-uglify] and [gulp-sass] pages for more information. Source map generation can be controlled as well, and is off by default. Further, to keep `package.json` simple, the `build/minify` flag is set upon project generation directly to `false`.

  It is not recommended to obfuscate vendor scripts and polyfills, since the obfuscated code can be 15-80% slower (depending on the options) and the files are significantly larger. Hence, when possible (large) third party libraries like `jquery.min.js` should be embedded into a dizmo under e.g. the `src/lib/` directory, and then they should be referenced with a `<script href="lib/jquery.min.js">` tag directly from within your HTML markup: This will avoid the libraries being obfuscated and hence, there won't be any performance penalty.

  Any library however, that is installed into a dizmo project via e.g. `npm install --save jquery` and then referenced as `var $ = require('jquery')` from your source code, will be collected by the build system and subsequently also obfuscated! This might actually be desirable, if the third party library is maybe company internal code, and you wish to use it in your dizmo: This arrangement will protect your company's intellectual property while offering you the desired functionality.

### Default Configuration

The `dizmo` section in `package.json` can be extended with default values, which have to reside in `.generator-dizmo/config.json` (in *any* of the parent directories):

    {
        "dizmo": {
            "deploy-path": "..", "store": {
                "host": "https://store-api.dizmo.com",
                "user": "..",
                "pass": ".."
            }
        }
    }

The configuration is hierarchical and recursive, meaning that a `.generator-dizmo/config.json` file can be saved in any parent directory of the current project, all of which are then merged during the build dynamically into `package.json`, where configuration values from files in the *lower levels* (meaning closer to `package.json`) have precedence.

#### Yeoman: Managing Configuration

As alternative to `.generator-dizmo/config.json` the `.yo-rc.json` file can be used to store default configuration values; see [managing configuration](http://yeoman.io/authoring/storage.html) for further information.

## NPM scripts

> Before running any script, please ensure that `npm install` has been executed, and that the dependencies beneath `node_modules` are up to date!

Please read first [npm#scripts](https://docs.npmjs.com/misc/scripts) -- in each `package.json` the following scripts are available:

* `clean`: completely removes the `./build` sub-directory.
```
npm run clean
```

* `deploy`: builds and installs the dizmo to a installation path given by the `dizmo/deploy-path` configuration entry in `package.json` (or better in `.generator-dizmo/config.json`):
```
npm run deploy
```

* `deploy`: ..or if the `DZM_DEPLOY_PATH` environment variable has been defined, then the dizmo is copied to the corresponding location.
```
DZM_DEPLOY_PATH=/path/to/my/dizmos npm run deploy
```

* `lint`: applies linting to your source code using [ESLint][eslint], which can be configured via `.eslintrc.json`.
```
npm run lint
```

* `build`: builds the dizmo (including the `*.dzm` artifact) from scratch and puts it into the `./build` sub-directory.
```
npm run build
```

* `test`: ensures to run tests -- by default no tests nor a test framework are pre-defined, hence *no* such script is predefined either! It is up to the dizmo developer to decide how tests shall be implemented. The only condition is, that the main test script should provide an exit value of `0` in case of success.
```
npm run test
```

* `watch`: watches your source code, and incrementally (and quickly!) rebuilds the dizmo on any change.
```
npm run watch
```

* `watch`: ..further, it copies the build to the installation path, if either the `dizmo/deploy-path` configuration has been set in `package.json` (or better in `.generator-dizmo/config.json`) or `DZM_DEPLOY_PATH` environment variable has been provided.
```
DZM_DEPLOY_PATH=/path/to/my/dizmos npm run watch
```

* `upload`: uploads a `*.dzm` artifact to the dizmoStore requiring a host and user name plus a valid password. They can be set via the `store/host`, `store/user` and `store/pass` configuration in `package.json` (or better in `.generator-dizmo/config.json`) or the `DZM_STORE_HOST`, `DZM_STORE_USER` and `DZM_STORE_PASS` environment variables.
```
DZM_STORE_HOST=https://store-api.dizmo.com npm run upload
```

## CLI options

The build process supports command line arguments to quickly override some of the the configuration in `package.json`. It's important to realize that this CLI support is directly integrated via the underlying primitives, i.e. linting can be enabled or disabled via `--lint` or via `--no-lint`, and this argument can be provided to *any* script which depends on the linting step.

Further, this CLI support has been implemented for *all* generators and sub-generators (see below the CoffeeScript and TypeScript sections). In many cases the arguments are boolean flags which can be enable or disable a certain build step (like linting or minification).

But many can also accept specific configuration objects -- as JSON -- which may or may not be dependent of the particular sub-generator being used: For example, the configuration for linting JavaScript is different than the one for linting TypeScript, since the former uses `eslint` and the latter `tslint`. And since they have different configuration specifications, it's not possible to provide the same configuration object.

However, for the daily usage the default settings should be more than enough! Simply using the CLI arguments as boolean flags to enable or disable a particular step will do the job. Further, please notice that when you e.g disable linting then during the build the corresponding step will *still* be shown, but it won't perform any actual linting!

### Linting: `--lint` or `--no-lint`

On the command line linting can be enabled by providing `--lint`, and it can be disabled by providing `--no-lint`. These flags will override (or merged with) the configuration from `package.json`:

```json
{
    "dizmo": {
        "build": {
            "lint": true
        }
    }
}
```

Above it's specifies, that the linting step should be executed by default for the given project. Hence, the following will lint and build the dizmo:

```
npm run build
```

To stop the build engine from linting, either the `lint` entry in `package.json` can be set to `false`, or it can directly be overridden on the CLI:

```
npm run build -- --no-lint
```

The double hyphen after `npm run build` is necessary, since it tells NPM to forward the `--no-lint` argument to each build step, which together will build (i.e. `build`) the dizmo. If you don't like the four consecutive hyphens, you can provide the script name also after the initial double hyphen:

```
npm run -- build --no-lint
```

Or more verbosely below you see in its clearest form, how the `build` script is run with the additional argument `--no-lint`:

```
npm run-script -- build --no-lint
```

Conversely, if you explicitly want to enforce linting then you can execute:

```
npm run -- build --lint
```

As mentioned, this is in general not required since `package.json` should by default have linting enabled. However, if you are not sure if this is the case -- for example when your putting together a build environment, and want enforce linting -- then providing the `--lint` flag explicitly makes sense.

The specific configuration objects for controlling [eslint], [coffeelint] and [tslint] can be looked up via their respective documentation. Below some very simple examples have been provided, to demonstrate the corresponding capability, to override the defaults (and/or the configuration object in `package.json` -- if any).

* Enforce for a JavaScript based dizmo project linting, but ignore unused variable names:

```
npm run build -- --lint='{"rules":{"no-unused-vars":0}}'
```

* Enforce linting, but provide a warning w.r.t. unused variable names:

```
npm run build -- --lint='{"rules":{"no-unused-vars":1}}'
```

* Enforce linting, but provide an error w.r.t. unused variable names:

```
npm run build -- --lint='{"rules":{"no-unused-vars":1}}'
```

Above, in case of an error the build process will *not* fail, effectively making it equivalent to a warning. If such behaviour is not desired, then the `000-lint.js` Gulp task should be modified to stop the build process upon a linting error.

* Enforce for a CoffeeScript based dizmo project linting, and ensure that indentation is based on four consecutive spaces:

```
npm run build -- --lint='{"indentation":{"value":4,"level":"error"}}'
```

* And finally, enforce for a TypeScript based dizmo project linting, and ensure that quote-marks use double apostrophes:

```
npm run build -- --lint='{"configuration":{"rules":{"quotemark":[true, "single"]}}}'
```

As you see, each linter expects a different configuration object, since each is based on a different code base: [eslint], [coffeelint] and [tslint].

### Minification: `--minify` or `--no-minify`

Providing the `--minify` option on the CLI will ensure that the scripts, styles and markup are automatically minified and obfuscated, where obfuscation operates only on the scripts:

```
npm run build -- --minify
```

Please notice, that by default source maps are *not* created, to avoid accidental leaks of potential intellectual property. However by appending the `--sourcemaps` flag they can be enabled:

```
npm run build -- --minify --sourcemaps
```

It's also possible to suppress a minification (e.g. in case it should be enabled via `package.json`):

```
npm run build -- --no-minify
```

Further, since minification consists of five sub-steps, namely (a) markup minification, (b) styles minification, (c1) scripts obfuscation plus (c2) minification and also (d) source maps generation -- where the latter however needs to be explicitly enabled -- it's possible to control them independently of the *general* `--minify` flag:

```
npm run build -- --htmlmin --sass --obfuscate --uglify --no-sourcemap
```

The above set of arguments is (given default `package.json` build settings) equivalent to the `--minify` flag. Further, each of them can be negated as well:

```
npm run build -- --no-htmlmin --no-sass --no-obfuscate --no-uglify
```

Further, each flag can accept an optional configuration object to control in detail the corresponding minification, obfuscation and/or source map generation step:

* Minimize the markup; see [gulp-htmlmin] for further information w.r.t. to the configuration:

```
npm run build -- --minify --htmlmin='{"collapseWhitespace":true}'
```

* Minimize the styles; see [gulp-sass] for further information w.r.t. to the configuration:

```
npm run build -- --minify --sass='{"outputStyle":"compressed"}'
```

* Obfuscate the scripts; see [javascript-obfuscator] for further information w.r.t. to the configuration:

```
npm run build -- --minify --obfuscate='{"compact":true}'
```

* Minify the scripts; see [gulp-uglify] for further information w.r.t. to the configuration:

```
npm run build -- --minify --uglify='{"mangle":true}'
```

* Create source maps for the scripts *and* the styles (in `package.json` each source map generation can be configured separately, however on the CLI there is only a single flag to control both); see [gulp-sourcemaps] for further information w.r.t. to the configuration:

```
npm run build -- --minify --sourcemaps='{"loadMaps":true}
```

In general, using `--minify` (or `--no-minify`) combined with the `--sourcemaps` (or `--no-sourcemaps`) CLI options should be enough. Only if explicit control is required, using the `--htmlmin`, `--sass`, `--obfuscate` or `--uglify` flags is be necessary. Further, providing configuration objects to these flags should only be done, when you know what you are doing (or are not happy with the provided defaults).

### Upload

Dizmo offers a *dizmoStore* where dizmos can be uploaded to: Besides `package.json` (or `.generator-dizmo/config.json`) or environment variables, upload arguments like the *host* and *user* name plus *password* can also be provided via the CLI:
```
npm run upload -- --host=https://store-api.dizmo.com --user='..' --pass='..'
```

By default `npm run upload` tries to upload *and* publish an uploaded dizmo. However, it is possible to skip the publication step by running:
```
npm run upload -- --no-publish
```

And then only in a subsequent step to publish it:
```
npm run upload -- --publish
```

However the command above assume, that the actual upload has already been performed! Hence, executing it without having previous uploaded a dizmo will fail, since there would be no uploaded dizmo to publish.

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

Once you have accommodated yourself with some dizmo development, you can go further and try out the `dizmo:sub-coffeescript` and `dizmo:sub-type-script` sub-generators.

### dizmo:sub-coffeescript &ndash; CoffeeScript integration

Invoke the `dizmo:sub-coffeescript` sub-generator with:

    yo @dizmo/dizmo my-dizmo --coffeescript

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

* **CoffeeScript:** Using the `index.coffee` file, you can start developing your dizmo in [CoffeeScript](http://coffeescript.org/).

### dizmo:ext-type-script &ndash; TypeScript integration

Invoke the `dizmo:ext-type-script` sub-generator with:

    yo @dizmo/dizmo my-dizmo --typescript

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

* **TypeScript:** Using the `src/app/app.ts` file you can start developing your dizmo in [TypeScript](http://www.typescriptlang.org/).

## Miscellanea

### GIT initialization

Invoke a generator (or a sub-generator) combined with the `--git` option:

    yo @dizmo/dizmo my-dizmo --git

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

### The `generator-dizmo` package seems to be deprecated?

Yes! It has been migrated to `@dizmo/generator-dizmo`, which means to continue to receive updates for the generator a re-installation is required:
```
(sudo) npm uninstall -g generator-dizmo
(sudo) npm install -g @dizmo/generator-dizmo
```

Further, any `yo dizmo` invocation needs to be changed to `yo @dizmo/dizmo`, e.g. to upgrade older projects run the command below (with the `@dizmo` scope):
```
yo @dizmo/dizmo --upgrade
```

### Did I forget to run `npm install`?

If `npm install` is *not* run before attempting to build a dizmo, then a message similar to the one below might be produced:
```bash
error argv "/usr/local/bin/node" "/usr/local/bin/npm" "run" "build"
error code ELIFECYCLE
error MyDizmo@0.0.0 build: `node ./node_modules/gulp/bin/gulp.js`
error Exit status 1
error Failed at the MyDizmo@0.0.0 build script 'node ./node_modules/gulp/bin/gulp.js'.
```

In such a case, just run `npm install` to ensure that all the required dependencies get installed locally.

### Can I run `yo @dizmo/dizmo` as root?

The [Yeoman] toolkit very strongly discourages the usage of any generator based on it to be run as *root*. Hence, you will get the following error:
```bash
$ sudo yo @dizmo/dizmo --help
/usr/lib/node_modules/yo/node_modules/configstore/index.js:53
				throw err;
				^

Error: EACCES: permission denied, open '/root/.config/configstore/insight-yo.json'.
You don't have access to this file.
```

The same error is thrown, when you run `sudo yo -h` as well. Also, the behaviour is independent of the usage of `sudo` or directly being logged in as *root*.

The recommended approach is to create a *non-root* user account and then run the generator under that account: If you are manually generating a dizmo project, this should be the case anyway, since you would most probably be logged in under your own user name. However, when running in the context of e.g. an automated build environment, this might not be the case: Hence, the need for a special purpose user account.

### Does dizmoGen support ES6?

Browsers and the libraries, which the former are built upon (like Webkit), usually lag behind the latest standard, and hence fail to provide up-to-date language support. The [Babel] transpiler however, can take a script written in a modern standard and translate it into backwards compatible JavaScript. DizmoGen includes Babel and thus supports ES6.

**Note:** If you have older projects and update dizmoGen, ensure that you add ES6 support to `.eslintrc.json` as following:
```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  }
}
```

### How to create a `.generator-dizmo` folder on Windows?

The graphical user interface of Windows does not allow to create a folder named `.generator-dizmo`: However it is possible to create one via the command line interface. For example using the Windows PowerShell one can run:

```bash
PS C:\Users\user> mkdir .generator-dizmo
```

### How to ignore .DS_Store files on Mac OS X?

Such files are device dependent and hence should be ignored *globally* on the developer's device, instead on a per project basis. See [How to Remove .DS_Store File from a Git Repo on Mac OS X](https://hints.binaryage.com/how-to-remove-ds-store-files-from-a-git-repo/) for an excellent discussion of the issue. Also at GitHub Help, see [ignoring files](https://help.github.com/articles/ignoring-files/#create-a-global-gitignore) to learn about setting up a global ignore list.

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland

[Node.js]: https://nodejs.org

[babel]: http://babeljs.io/
[coffeelint]: http://www.coffeelint.org/
[eslint]: http://eslint.org/
[tslint]: http://palantir.github.io/tslint/
[yeoman]: http://yeoman.io/

[gulp]: https://gulpjs.com/
[gulp-eslint]: http://www.npmjs.com/package/gulp-eslint
[gulp-htmlmin]: http://www.npmjs.com/package/gulp-htmlmin
[gulp-sass]: http://www.npmjs.com/package/gulp-sass
[gulp-sourcemaps]: http://www.npmjs.com/package/gulp-sourcemaps
[gulp-uglify]: http://www.npmjs.com/package/gulp-uglify

[node-module]: http://nodejs.org/api/modules.html
[npm]: http://www.npmjs.com

[javascript-obfuscator]: http://github.com/javascript-obfuscator/javascript-obfuscator
