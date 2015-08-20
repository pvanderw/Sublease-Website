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
        db:  'mongodb://patrick.vanderwall:van78756@ds040948.mongolab.com:40948/sublease-website',
        root: rootPath,
        notifier: notifier,
        app: {
            name: 'LoginRegistration'
        }
    },
    test: {
        db: ' mongodb://patrick.vanderwall:van78756@ds040948.mongolab.com:40948/sublease-website',
        root: rootPath,
        notifier: notifier,
        app: {
            name: 'LoginRegistration'
        }
    },
    production: {}
}