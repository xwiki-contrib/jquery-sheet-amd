/*jshint node:true */
'use strict';
module.exports = function () {
    var OUT_ZIP = '../jquery-sheet-amd.zip';

    var missing = [];
    var req = function (x) {
        try {
            return require(x);
        } catch (e) {
            missing.push(e.message.match(/Cannot find module '(.*)'/)[1]);
        }
    };

    var zip = req('zip-archiver');
    var jshint = req('jshint');
    var fs = req('fs');
    var child = req('child_process');

    if (missing.length > 0) {
        console.log("Failed to load dependency [" + missing + "]");
        console.log("run: npm install -g " + missing.join(' '));
        console.log("and try again.");
        process.exit(1);
    }

    var cmd = child.spawn("jshint", ['./tools']);

    var write = function (data) {
        process.stdout.write(new Buffer(data).toString("utf-8"));
    };

    cmd.stdout.on('data', write);
    cmd.stderr.on('data', write);
    cmd.on('close', function (code) {
        if (code !== 0) { process.exit(code); }

        process.chdir('jqs');
        if (fs.existsSync(OUT_ZIP)) {
            fs.unlinkSync(OUT_ZIP);
        }
        var file = new zip.Zip({ file: OUT_ZIP  });
        file.add('.', function () {
            file.done();
            console.log('done.');
        });

    });
};
