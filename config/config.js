var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var templatePath = path.normalize(__dirname + '/../server/mailer/templates');
var notifier = {
        service: 'postmark',
        APN: false,
        email: false, // true
        actions: ['comment'],
        tplPath: templatePath,
        key: 'POSTMARK_KEY',
        parseAppId: 'PARSE_APP_ID',
        parseApiKey: 'PARSE_MASTER_KEY'
    };

module.exports = {
    development: {
        db:  'mongodb://admin:password@ds035603.mongolab.com:35603/heroku_j9hdq1z0',
        root: rootPath,
        notifier: notifier,
        app: {
            name: 'heroku_j9hdq1z0'
        }
    },
    test: {
        db: 'mongodb://admin:password@ds035603.mongolab.com:35603/heroku_j9hdq1z0',
        root: rootPath,
        notifier: notifier,
        app: {
            name: 'heroku_j9hdq1z0'
        }
    },
    production: {}
}