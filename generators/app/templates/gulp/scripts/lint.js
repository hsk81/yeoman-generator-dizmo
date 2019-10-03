const cli = require('../miscellanea/cli');
const fs = require('fs').promises;

const run_script = () => {
    const args = ['./node_modules/gulp/bin/gulp.js', 'lint'];
    args.push(...process.argv.slice(2));
    const run = cli.run('node', ...args)();
    run.catch(process.exit)
};

fs.access('./node_modules').then(run_script).catch(() => {
    const Spinner = require('../miscellanea/cli-spinner');
    const spinner = new Spinner('%s installing dependencies: .. ');
    cli.npm('install', '--no-optional').then(() => {
        spinner.stop(true);
        run_script();
    });
    spinner.start();
});
