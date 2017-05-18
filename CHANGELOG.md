# CHANGELOG

## v7.2.z

* Integration of the [pump] library for improved error reporting: The [Gulp] build system lacks proper support to identify and report the source of a particular error. However by integrating [pump] this issue has been easily remedied.

* Integration of ES6 via [Babel] to support latest JavaScript standard: Browsers and the libraries, which the former are built upon (like Webkit), usually lag behind the latest standard, and hence fail to provide up-to-date language support. The [Babel] *transpiler* however, can take a script written in a modern standard and translate it into backwards compatible JavaScript.

## v7.1.z

* Upgrade support via `yo dizmo --upgrade` to enable seamless developer experience: Thanks to [Yeoman]'s built in conflict resolution mechanism, it was already possible to upgrade an older project by running `yo dizmo` within the corresponding folder.

  However, the conflict resolution was requiring to sign-off each change by the developer. While this was not an issue for experience developers, it was difficult for novice ones to decide which parts of a project to override and which parts to keep. This decision process has now been automated, by using heuristics, where any change w.r.t. to the [Gulp] build system is applied automatically and no change is performed on the non-build system related parts. 

## v7.0.z (2017-05-10)

* Don't show the output of `npm install`, and instead display a CLI based spinner: This ensure a nice developer experience while building a dizmo with `npm run make`. However, in case something goes wrong while fetching the dependencies, `npm install` can still be run and the corresponding output will be shown.

## v6.4.z

* Don't require `npm install` to be run: Before running scripts like `npm run make` it was mandatory to install the dependencies by explicitly installing them. This requirement has now been dropped, since the scripts check beforehand if the dependency folder `node_modules` exist and otherwise install the dependencies correspondingly.
 
## v6.3.z

* Publish a dizmo upon an upload: So far it was only possible to upload a dizmo to dizmoStore. Now upon a successful upload (with `npm run upload`) it is automatically published, but which can be suppressed by providing `--no-publish` flag.

## v6.2.z

* Allow `npm run upload` to be configured via (i) CLI options, (ii) environment variable and (iii-a) `package.json` or (iii-b) `.generator-dizmo/config.json`. 

## v6.1.z

* Enable dizmo to be uploaded to the dizmoStore by running `npm run upload`: Upon uploading a dizmo to the store, the developer is required to provide the correct store host and login credentials (user name and password).

## v6.0.z (2017-05-01)

* CLI options to suppress question upon generating a dizmo project: If a value is provided via the CLI arguments, options, *or* via environment variables then the corresponding question is now skipped.

## v5.{2..9}.z

* CLI options upon building a dizmo to (i) minify and (ii) lint a dizmo build, overriding any configuration via `package.json` or via environment variables.

## v5.1.z

* Minification with obfuscation support: Upon major request JavaScript obfuscation has been integrated. When the dizmo is built with minification on, then by default the script code is also obfuscated (which can be suppressed by providing a `--no-obfuscate` flag).

## v5.0.z (2017-04-12)

* Renamed `npm run install` to `npm run deploy`: It was for many (novice) developers confusing to distinguish `npm install` from `npm run install`. Hence the latter has been renamed to `npm run deploy`.

## v4.2.z

* Semi-automatic skeleton upgrade: [Yeoman] has a built in conflict resolution mechanism which enabled a generator to be run over an existing project. Any conflict needs then to be manually signed-off by the developer.

  This mechanism was only working, when the `yo dizmo` command was invoked from *outside* a project. Now, it's possible to upgrade by executing it from *within* the project, where any configuration in `package.json` will automatically be considered.

## v4.1.z

* Fixed drag-and-drop message upon installing (i.e. deploying) a dizmo to the folder of installed dizmos.

* Fixed watcher such that they can be invoked on `Windows` systems as well.

## v4.0.z (2017-02-15)

* Merged the extended skeleton into the base one: It was for many (novice) developers confusing to start working with the extended skeleton (supporting SCSS et. al.) after having worked with the base one.

## v3.0.z (2017-02-09)

* Check for `.info.plist`: Some developers where manually copying all visible files from one project to another one, forgetting the invisible ones. Hence, now at least for `.info.plist` a corresponding check upon building a dizmo is performed. 

* Branding of `generator-dizmo` as *dizmoGen*: The [Yeoman] toolkit requires to project's name to start with `generator`. Otherwise the generator is not index on their website: Hence the name was kept as is, but the README.md document has been updated correspondingly to reflect the *dizmoGen* branding.

## v2.5.z

* Internationalization support using the [i18next] framework, where translation look-ups can be found under the `assets/` folder.

## v2.4.z

* Watcher support: Introduced the possibility to watch the file system to source code changes, and automatically re-build a dizmo. Since the re-build is *incremental* - even when requiring relatively large libraries in a project - it's fast!

* Linting support for *TypeScript* and *CoffeeScript* sug-generators.

## v2.3.z

* Dependency management thanks to [Browserify]: It's possible now to `require('..')` an external NPM module or a project specific JavaScript file.

## v2.2.z

* Introduced a README.md: Extensively documented the feature set of generator.

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

[pump]: http://www.npmjs.com/package/pump
[Babel]: http://babeljs.io
[Gulp]: http://gulpjs.com/
[Yeoman]: http://yeoman.io/
[Browserify]: http://browserify.org/
[TypeScript]: http://www.typescriptlang.org/
[CoffeeScript]: http://coffeescript.org/
[ESLint]: http://eslint.org/
[SASS]: http://sass-lang.com/
[UglifyJS]: http://github.com/mishoo/UglifyJS
