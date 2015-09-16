var path = require('path');
var fs = require('fs');
var util = require('modulex-util');

module.exports = function (dir, option) {
    dir = dir || process.cwd();
    option = option || {};
    return function* (next) {
        var fileType = (this.url.match(/\.(js)$/) || []).shift();
        if (fileType) {
            var file, content = this.body;
            if (!content) {
                var json = 0;
                file = path.join(dir, this.url);
                if (!fs.existsSync(file)) {
                    if (util.endsWith(file, '.json.js')) {
                        file = file.slice(0, -3);
                        json = 1;
                    }
                }
                if (!fs.existsSync(file)) {
                    return yield *next;
                }

                content = fs.readFileSync(file, 'utf-8');

                if (json) {
                    content = 'module.exports = ' + content + ';';
                }
            }
            if (!option.nowrap || !option.nowrap.call(this)) {
                content = 'define(function (require, exports, module) {' + content + '\n});';
            }
            this.set('Content-Type', 'application/javascript;charset=utf-8');
            this.set('Content-Length', Buffer.byteLength(content));
            this.body = content;
            if (option.next && option.next.call(this)) {
                yield * next;
            }
        } else {
            yield *next;
        }
    };
};