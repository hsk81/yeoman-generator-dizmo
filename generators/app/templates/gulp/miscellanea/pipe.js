module.exports = function (streams, callback) {
    let argv = require('yargs')
        .default('pump', false)
        .argv;
    if (!argv.pump) {
        let stream = streams[0];
        for (let i = 1; i < streams.length; i++) {
            stream = stream.pipe(streams[i]);
        }
        return stream;
    } else {
        require('pump')(streams, callback);
    }
};
