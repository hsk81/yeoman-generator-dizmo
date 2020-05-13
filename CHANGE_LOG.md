# CHANGE LOG

## v10.4.z

* Support for `jsdoc` for JavaScript:

    By running `npm run docs` in source comments are parsed by `jsdoc` and the corresponding documentation is generated in the `docs` folder. The `jsdoc` tool can be configured via the `jsdoc.json` file.

* Support for `typedoc` for TypeScript:

    By running `npm run docs` in source comments are parsed by `typdoc` and the corresponding documentation is generated in the `docs` folder. The `typedoc` tool can be configured via the `typedoc.json` file.

## v10.3.z

* Support for dizmoWeb:

    The dizmoWeb project is a viewer running *natively* within a browser, because of which two script tags and one link tag were required to be included within the `head` section of each dizmo's `index.html` (to fetch `dizmojs-1.3.js`, `dizmoelements-1.0.js` and `dizmoelements-1.0.css`).

## v10.2.z

* Support for `webpack.config.js` for TypeScript:

    The TypeScript project generator produces now a skeleton with support for [webpack]. Further, the `babel.config.js` configuration is not required anymore.

## v10.1.z

* Support for `webpack.config.js` for CoffeeScript:

    The CoffeeScript project generator produces now a skeleton with support for [webpack]. Further, the `babel.config.js` configuration is not required anymore.

## v10.0.z

* Support for `webpack.config.js` for JavaScript:

    The JavaScript project generator produces now a skeleton with support for [webpack]. Further, the `babel.config.js` configuration is not required anymore.

## v9.1.z

* Support for `babel.config.js`:

    A dizmo's source code itself can now import ES6 packages directly, thanks to the use of a *project wide* `babel.config.js` configuration.

* Integrated generator tests with CI:

    The JavaScript, CoffeeScript and TypeScript project generators are now automatically verified with `npm test`, which is also run by the https://travis-ci.org continuous integration service. The entire list of generated files is checked, plus the full content of `package.json`.

## v9.0.z

* Extracted `dcontrol` sub-generator:

    Now, running `yo @dizmo/dizmo-dcontrol [--git]` will produce a dizmo project with support for `dcontrol`. For this to work, the `@dizmo/generator-dizmo-dcontrol` sub-generator is required to be installed separately.

## v8.7.z

* Integrated `dcontrol` sub-generator:

    Running `yo @dizmo/dizmo --dcontrol [--git]` will produce a dizmo project with support for `dcontrol` and a [Vue.js](https://vuejs.org/) component based user interface.

* Integrated `ES2015` for [TypeScript] sub-generator:

    By targeting `ES2015` instead of `ES5` features like a `Promise` become available. Backwards compatiblity is ensured by using `@babel/polyfill`.

* Fixed `--uglify` and `--obfuscate` flags:

    These two flags allow more detailed options via handing over via the CLI a (properly escaped) JSON object, like `--uglify='{\"mangle\":true\,\"keep_fnames\":true}'`. However, these flags where *not* forwarded correctly to the corresponding `uglify` and `obfuscate` GLUP plug-ins, which has now been fixed.

## v8.6.z

* Fixed `npm run watch`:

    The `@babel/polyfill` in the [JavaScript] generator was not being used in `npm run watch`, which has been fixed.

* Fixed `npm run watch`:

    Executing `npm run watch` was causing the `*.dzm` artifact from a *previous* build to be packed into the newly build `*.dzm` artifact.

## v8.5.z

* Extracted submodules for the [TypeScript] and [CoffeeScript] sub-generators:

    In anticipation of further sub-generators, these two sub-generators (which still create minimal and - almost - non-opinionated projects) have been extracted into their own repositories and re-integrated as submodules.

* `@dizmo/functions` integration:

    Removed in the [TypeScript] generator the "hardcoded" helper functions, which have been put into the `@dizmo/functions` package.

* `@dizmo/types` integration:

    Removed the type definitions created by the [TypeScript] generator, which have been put in the `@dizmo/types` package.

* Migrated to `@babel` scope:

    Babel packages have all been scoped with `@babel`.

* Once handler for `dizmoready`:

    The callback for `dizmoready` was ensuring via a global variable a single execution: Replaced this check by using the `once: true` option of the `document.addEventListener`.

* Removed `gulp-utils`:

    The `gulp-utils` package has been replaced with `fancy-log` and `ansi-colors` packages.

* Optional `pump` dependency:

    The `pump` package has been declared as an `optionalDependency`, and it is installed during a build automatically on-demand.

* Optional `javascript-obfuscator` dependency:

    The `javascript-obfuscator` package has been declared as an `optionalDependency`, and it is installed during a build automatically on-demand.

## v8.4.z

* Simplified I18N usage:

    Simplifed in the [TypeScript] generator the `app.ts` w.r.t. to the usage of the I18N translation framework.

## v8.3.z

* Introduced usage of `types/i18next`:

    In the [TypeScript] generator the new `@types` scope is used for `i18next`, instead of relying on type definitions provided by `dts`.

## v8.2.z

* Optional `--typescript` and `--coffeescript` flags on `--upgrade`:

    When upgrading a TypeScript or CoffeeScript project a simple `yo @dizmo/dizmo --upgrade` is enough. The auto-detection is achieved by checking in `package.json:devDependencies` the `typescript` or `coffeescript` entries.

## v8.1.z

* Upgraded to `gulp@4.0.0`:

    In [gulp] the task declaration syntax has changed. Further, the handy `gulp.series` and `gulp.parallel` functions have been introduced, allowing the removal of the `gulp-sync` plugin.

* Reorganized JavaScript, CoffeeScript and TypeScript tasks:

    The gulp tasks were containing script where the filenames were prefixed with numbers, which was ugly. Completely removed such numbered prefixing. The migration process (if any required):

    (1a) If *no* manual changes have been applied to the gulp tasks, then a simple `yo @dizmo/dizmo --upgrade` is enough (add `--typescript` or `--coffeescript` for corresponding projects).

    (1b) The old enumerated tasks can be left in place, or *optionally* the old enumerated tasks can simply be removed if desired so.

    (2) If *any* changes have been applied to the old enumerated gulp tasks, then the *equivalent* changes have to be applied to the corresponding new tasks (which are essentially the same, but simply with a new naming scheme).

* Fixed README.md w.r.t. to `yo @dizmo/dizmo`:

    Since the migration to `@dizmo/generator-dizmo` it is required to create projects using `yo @dizmo/dizmo` instead of `yo dizmo`.

## v8.0.z

* Migration to `@dizmo/generator-dizmo`:

    A `@dizmo` organization has been generated on NPM, allowing a corresponding scope for the `generator-dizmo` package. The older package has been deprecated accordingly.

* Fixed false linting errors:

    The `javascript-obfuscator` package was interfering with the linting process due to unknown reasons. Fixed by a deferred inclusion of the aforementioned package.

## v7.5.z

* Support for `babel-polyfill`:

    Introduced polyfills using `babel` which allows now newer JavaScript to be mapped to older ECMAScript standards (using the `env` preset).

* Removed dummy `test` script:

    In `package.json:script` there was a dummy `test` script exiting with `0`. Upon upgrading older project this dummy was overriding the developer defined `test` script (if any): Hence the removal.

## v7.4.z

* Fixed `plist` mapping with hierarchic keys:

    The `Info.plist` was not mapped corrected when it contained nested keys (or when the corresponding fields in `package.json:dizmo` contained such fields).

* Tracing with hierarchic logs:

    The embedded tracing (in the templates) routine provides now hierarchic logging using `console.group` and `console.groupEnd` in the inspector console.

* Reverted [pump] library as much as possible:

    The [pump] library is causing task which process larger scripts (or any assets) to fail: Hence it has been removed from the build process as much as possible.

* Renamed `make` script to `build`:

    Many standard tools (like IDEs) seem to expect a `build` script instead of a `make` one; hence the renaming.

## v7.3.z

* Fixed script invocation on Windows:

    Apparently, the `shell` option was required to ensure cross OS compatibility,when spawning a child process. This ensures that on Windows `cmd.exe` is used to correctly (including argument escaping) invoke other processes; similarly on Unix like systems.

* Improved name validation for dizmos:

    It was possible to provide dizmo names with spaces included. Then upon attempting a build it was failing, since spaces are actually not allowed in `package.json:name`.

* Identified [Node.js] `v6.11.0 LTS` as a prerequisite.

## v7.2.z

* Integration of the [pump] library for improved error reporting:

    The [Gulp] build system lacks proper support to identify and report the source of a particular error. However by integrating [pump] this issue has been easily remedied.

* Integration of ES6 via [Babel] to support latest JavaScript standard:

    Browsers and the libraries, which the former are built upon (like Webkit), usually lag behind the latest standard, and hence fail to provide up-to-date language support. The [Babel] *transpiler* however, can take a script written in a modern standard and translate it into backwards compatible JavaScript.

## v7.1.z

* Upgrade support via `yo dizmo --upgrade` to enable seamless developer experience:

    Thanks to [Yeoman]'s built in conflict resolution mechanism, it was already possible to upgrade an older project by running `yo dizmo` within the corresponding folder.

    However, the conflict resolution was requiring to sign-off each change by the developer. While this was not an issue for experience developers, it was difficult for novice ones to decide which parts of a project to override and which parts to keep. This decision process has now been automated, by using heuristics, where any change w.r.t. to the [Gulp] build system is applied automatically and no change is performed on the non-build system related parts.

## v7.0.z (2017-05-10)

* Don't show the output of `npm install`, and instead display a CLI based spinner:

    This ensure a nice developer experience while building a dizmo with `npm run make`. However, in case something goes wrong while fetching the dependencies, `npm install` can still be run and the corresponding output will be shown.

## v6.4.z

* Don't require `npm install` to be run:

    Before running scripts like `npm run make` it was mandatory to install the dependencies by explicitly installing them. This requirement has now been dropped, since the scripts check beforehand if the dependency folder `node_modules` exist and otherwise install the dependencies correspondingly.

## v6.3.z

* Publish a dizmo upon an upload:

    So far it was only possible to upload a dizmo to dizmoStore. Now upon a successful upload (with `npm run upload`) it is automatically published, but which can be suppressed by providing `--no-publish` flag.

## v6.2.z

* Allow `npm run upload` to be configured via (i) CLI options, (ii) environment variable and (iii-a) `package.json` or (iii-b) `.generator-dizmo/config.json`.

## v6.1.z

* Enable dizmo to be uploaded to the dizmoStore by running `npm run upload`:

    Upon uploading a dizmo to the store, the developer is required to provide the correct store host and login credentials (user name and password).

## v6.0.z (2017-05-01)

* CLI options to suppress question upon generating a dizmo project:

    If a value is provided via the CLI arguments,options, *or* via environment variables then the corresponding question is now skipped.

## v5.{2..9}.z

* CLI options upon building a dizmo to (i) minify and (ii) lint a dizmo build, overriding any configuration via `package.json` or via environment variables.

## v5.1.z

* Minification with obfuscation support:

    Upon major request JavaScript obfuscation has been integrated. When the dizmo is built with minification on, then by default the script code is also obfuscated (which can be suppressed by providing a `--no-obfuscate` flag).

## v5.0.z (2017-04-12)

* Renamed `npm run install` to `npm run deploy`:

    It was for many (novice) developers confusing to distinguish `npm install` from `npm run install`. Hence the latter has been renamed to `npm run deploy`.

## v4.2.z

* Semi-automatic skeleton upgrade:

    [Yeoman] has a built in conflict resolution mechanism which enabled a generator to be run over an existing project. Any conflict needs then to be manually signed-off by the developer.

    This mechanism was only working, when the `yo dizmo` command was invoked from *outside* a project. Now, it's possible to upgrade by executing it from *within* the project, where any configuration in `package.json` will automatically be considered.

## v4.1.z

* Fixed drag-and-drop message upon installing (i.e. deploying) a dizmo to the folder of installed dizmos.

* Fixed watcher such that they can be invoked on `Windows` systems as well.

## v4.0.z (2017-02-15)

* Merged the extended skeleton into the base one:

    It was for many (novice) developers confusing to start working with the extended skeleton (supporting SCSS et. al.) after having worked with the base one.

## v3.0.z (2017-02-09)

* Check for `.info.plist`:

    Some developers where manually copying all visible files from one project to another one, forgetting the invisible ones. Hence, now at least for `.info.plist` a corresponding check upon building a dizmo is performed.

* Branding of `generator-dizmo` as *dizmoGen*:

    The [Yeoman] toolkit requires to project's name to start with `generator`. Otherwise the generator is not index on their website: Hence the name was kept as is, but the README.md document has been updated correspondingly to reflect the *dizmoGen* branding.

## v2.5.z

* Internationalization support using the [i18next] framework, where translation look-ups can be found under the `assets/` folder.

## v2.4.z

* Watcher support:

    Introduced the possibility to watch the file system to source code changes, and automatically re-build a dizmo. Since the re-build is *incremental* - even when requiring relatively large libraries in a project - it's fast!

* Linting support for *TypeScript* and *CoffeeScript* sug-generators.

## v2.3.z

* Dependency management thanks to [Browserify]:

    It's possible now to `require('..')` an external NPM module or a project specific JavaScript file.

## v2.2.z

* Introduced a README.md:

    Extensively documented the feature set of generator.

## v2.1.z

* Sub-generator for [TypeScript], which is a super-set of JavaScript with integrated (optional) static typing support.

## v2.0.z (2016-06-21)

* SASS with minification support for the [CoffeeScript] sub-generator.

## v1.y.z (2015-12-06)

* Sub-generator for [CoffeeScript], which is a alternative to JavaScript transpiling down to it.

* Enabled hierarchical configuration support for `package.json` via `.generator-dizmo/config.json`.

* Support for linting via a `.eslintrc.json` configuration for the [ESlint] linting utility for JavaScript.

* Enabled Windows compatibility by ensuring that the NPM script are run in with a proper `node` invocation.

* Introduced support for GIT by initializing a new project as a repository (with the `--git` flag).

* Smartly remembering previously provided domain name (like e.g. `com.dizmo`) via the prompt.

* Support for an extended sub-generator with support for [SASS], [ESLint], and minification via [UglifyJS].

* Increased NPM's built in caching to a week, to ensure fast(er) initial fetching of dependencies.

* Initial generator based on [Yeoman].

[babel]: http://babeljs.io
[browserify]: http://browserify.org/
[coffeescript]: http://coffeescript.org/
[eslint]: http://eslint.org/
[esm]: https://www.npmjs.com/package/esm
[gulp]: http://gulpjs.com/
[i18next]: http://www.npmjs.com/package/i18next
[Node.js]: https://nodejs.org
[pump]: http://www.npmjs.com/package/pump
[sass]: http://sass-lang.com/
[typescript]: http://www.typescriptlang.org/
[uglifyjs]: http://github.com/mishoo/UglifyJS
[webpack]: https://webpack.js.org/
[yeoman]: http://yeoman.io/
