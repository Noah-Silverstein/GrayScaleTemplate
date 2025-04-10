
'use strict';

const { execSync } = require('child_process');

module.exports = function renderScripts() {
    console.log('### INFO: Bundling JavaScript with Webpack...');
    execSync('npx webpack', { stdio: 'inherit' });
};