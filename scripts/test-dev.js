const concurrently = require('concurrently');

concurrently([
    { command: 'node scripts/pug-watch.js', name: 'PUG_WATCH', prefixColor: 'bgGreen.bold' },
    { 
        command: `npm run ng -- test --code-coverage --browsers=Chrome_with_debugging`,
        name: 'NG_SERVE', 
        prefixColor: 'bgBlue.bold',
    }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
}).then(success, failure);

function success() {
    console.log('Success');    
}

function failure() {
    console.log('Failure');
}
