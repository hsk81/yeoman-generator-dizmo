# RELEASE NOTES

## v9.y.z

### MAJOR CHANGES

* Extracted `dcontrol` sub-generator:

    Now, running `yo @dizmo/dizmo-dcontrol [--git]` will produce a dizmo project with support for `dcontrol`. For this to work, the `@dizmo/generator-dizmo-dcontrol` sub-generator is required to be installed separately.

### NOTABLE CHANGES

* ECMAScript module loader support:

    Now, for the JavaScript and CoffeeScript projects it's possible to directly consume ES6 modules thanks to the [esmify] plugin of `browserify`. Also enabled [esm] support for the `gulp` scripts.

[esm]: https://www.npmjs.com/package/esm
[esmify]: https://www.npmjs.com/package/esmify

## v8.y.z

### MAJOR CHANGES

* Optional `--typescript` and `--coffeescript` flags on `--upgrade`:

    When upgrading a TypeScript or CoffeeScript project a simple `yo @dizmo/dizmo --upgrade` is enough. The auto-detection is achieved by checking in `package.json:devDependencies` the `typescript` or `coffeescript` entries.

* `@dizmo/functions` integration:

    Removed in the [TypeScript] generator the "hardcoded" helper functions, which have been put into the `@dizmo/functions` package.

* `@dizmo/types` integration:

    Removed the type definitions created by the [TypeScript] generator, which have been put in the `@dizmo/types` package.

* `dcontrol` sub-generator:

    Running `yo @dizmo/dizmo --dcontrol [--git]` will produce a dizmo project with support for `dcontrol` and a [Vue.js](https://vuejs.org/) component based user interface.

* `ES2015` integration:

    By targeting in the [TypeScript] sub-generator `ES2015` instead of `ES5` features like a `Promise` become available. Backwards compatiblity is ensured by using `@babel/polyfill`.

### NOTABLE CHANGES

* Upgraded to `gulp@4.0.0`:

    In [gulp] the task declaration syntax has changed. Further, the handy `gulp.series` and `gulp.parallel` functions have been introduced, allowing the removal of the `gulp-sync` plugin.

* Extracted submodules for the [TypeScript] and [CoffeeScript] sub-generators:

    In anticipation of further sub-generators, these two sub-generators (which still create minimal and - almost - non-opinionated projects) have been extracted into their own repositories and re-integrated as submodules.

## v7.y.z

### MAJOR CHANGES

* Integration of ES6 via [Babel] to support latest JavaScript standard:

    Browsers and the libraries, which the former are built upon (like Webkit), usually lag behind the latest standard, and hence fail to provide up-to-date language support. The [Babel] *transpiler* however, can take a script written in a modern standard and translate it into backwards compatible JavaScript.

* Upgrade support via `yo dizmo --upgrade` to enable seamless developer experience:

    Thanks to [Yeoman]'s built in conflict resolution mechanism, it was already possible to upgrade an older project by running `yo dizmo` within the corresponding folder.

    However, the conflict resolution was requiring to sign-off each change by the developer. While this was not an issue for experience developers, it was difficult for novice ones to decide which parts of a project to override and which parts to keep. This decision process has now been automated, by using heuristics, where any change w.r.t. to the [Gulp] build system is applied automatically and no change is performed on the non-build system related parts.

* Support for `babel-polyfill`:

    Introduced polyfills using `babel` which allows now newer JavaScript to be mapped to older ECMAScript standards (using the `env` preset).

### NOTABLE CHANGES

* Integration of the [pump] library for improved error reporting:

    The [Gulp] build system lacks proper support to identify and report the source of a particular error. However by integrating [pump] this issue has been easily remedied.

* Don't show the output of `npm install`, and instead display a CLI based spinner:

    This ensure a nice developer experience while building a dizmo with `npm run build`. However, in case something goes wrong while fetching the dependencies, `npm install` can still be run and the corresponding output will be shown.

* Renamed `make` script to `build` due to support of latter by other tools:

    Many third party tools seem to use the `npm run-script -- build` script, instead of `make`: Hence the renaming to support seamless integration.

* Migration to `@dizmo/generator-dizmo`:

    A `@dizmo` organization has been generated on NPM, allowing a corresponding scope for the `generator-dizmo` package. The older package has been deprecated accordingly.

## v6.y.z

### MAJOR CHANGES

* Enable dizmo to be uploaded to the dizmoStore by running `npm run upload`:

    Upon uploading a dizmo to the store, the developer is required to provide the correct store host and login credentials (user name and password).

* Publish a dizmo upon an upload:

    So far it was only possible to upload a dizmo to dizmoStore. Now upon a successful upload (with `npm run upload`) it is automatically published, but which can be suppressed by providing `--no-publish` flag.

### NOTABLE CHANGES

* Allow `npm run upload` to be configured via (i) CLI options, (ii) environment variable and (iii-a) `package.json` or (iii-b) `.generator-dizmo/config.json`.

* Don't require `npm install` to be run:

    Before running scripts like `npm run make` it was mandatory to install the dependencies by explicitly installing them. This requirement has now been dropped, since the scripts check beforehand if the dependency folder `node_modules` exist and otherwise install the dependencies correspondingly.

## v5.y.z

### MAJOR CHANGES

* Minification with obfuscation support:

    Upon major request JavaScript obfuscation has been integrated. When the dizmo is built with minification on, then by default the script code is also obfuscated (which can be suppressed by providing a `--no-obfuscate` flag).

* Renamed `npm run install` to `npm run deploy`:

    It was for many (novice) developers confusing to distinguish `npm install` from `npm run install`. Hence the latter has been renamed to `npm run deploy`.

### NOTABLE CHANGES

* CLI options upon building a dizmo to (i) minify and (ii) lint a dizmo build, overriding any configuration via `package.json` or via environment variables.

## v4.y.z

### MAJOR CHANGES

* Semi-automatic skeleton upgrade:

    [Yeoman] has a built in conflict resolution mechanism which enabled a generator to be run over an existing project. Any conflict needs then to be manually signed-off by the developer.

    This mechanism was only working, when the `yo dizmo` command was invoked from *outside* a project. Now, it's possible to upgrade by executing it from *within* the project, where any configuration in `package.json` will automatically be considered.

* Merged the extended skeleton into the base one:

    It was for many (novice) developers confusing to start working with the extended skeleton (supporting SCSS et. al.) after having worked with the base one.

### NOTABLE CHANGES

* Fixed drag-and-drop message upon installing (i.e. deploying) a dizmo to the folder of installed dizmos.

* Fixed watcher such that they can be invoked on `Windows` systems as well.

## v3.y.z

### MAJOR CHANGES

* Branding of `generator-dizmo` as *dizmoGen*:

    The [Yeoman] toolkit requires to project's name to start with `generator`. Otherwise the generator is not index on their website: Hence the name was kept as is, but the README.md document has been updated correspondingly to reflect the *dizmoGen* branding.

### NOTABLE CHANGES

* Check for `.info.plist`:

    Some developers where manually copying all visible files from one project to another one, forgetting the invisible ones. Hence, now at least for `.info.plist` a corresponding check upon building a dizmo is performed.

## v2.y.z

### MAJOR CHANGES

* Dependency management thanks to [Browserify]:

    It's possible now to `require('..')` an external NPM module or a project specific JavaScript file.

* Watcher support:

    Introduced the possibility to watch the file system to source code changes, and automatically re-build a dizmo. Since the re-build is *incremental* - even when requiring relatively large libraries in a project - it's fast!

* Sub-generator for [TypeScript], which is a super-set of JavaScript with integrated (optional) static typing support.

* Internationalization support using the [i18next] framework, where translation look-ups can be found under the `assets/` folder.

### NOTABLE CHANGES

* Linting support for *TypeScript* and *CoffeeScript* sug-generators.

* SASS with minification support for the [CoffeeScript] sub-generator.

* Introduced a README.md:

    Extensively documented the feature set of generator.

## v1.y.z

### MAJOR CHANGES

* Initial generator based on [Yeoman].

* Support for an extended sub-generator with support for [SASS], [ESLint], and minification via [UglifyJS].

* Sub-generator for [CoffeeScript], which is a alternative to JavaScript transpiling down to it.

* Introduced support for GIT by initializing a new project as a repository (with the `--git` flag).

### NOTABLE CHANGES

* Support for linting via a `.eslintrc.json` configuration for the [ESlint] linting utility for JavaScript.

* Enabled hierarchical configuration support for `package.json` via `.generator-dizmo/config.json`.

* Smartly remembering previously provided domain name (like e.g. `com.dizmo`) via the prompt.

* Enabled Windows compatibility by ensuring that the NPM script are run in with a proper `node` invocation.

* Increased NPM's built in caching to a week, to ensure fast(er) initial fetching of dependencies.

[babel]: http://babeljs.io
[browserify]: http://browserify.org/
[coffeescript]: http://coffeescript.org/
[eslint]: http://eslint.org/
[gulp]: http://gulpjs.com/
[i18next]: http://www.npmjs.com/package/i18next
[pump]: http://www.npmjs.com/package/pump
[sass]: http://sass-lang.com/
[typescript]: http://www.typescriptlang.org/
[uglifyjs]: http://github.com/mishoo/UglifyJS
[yeoman]: http://yeoman.io/
