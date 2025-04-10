'use strict';

const { execSync } = require('child_process');

// Define the renderScripts function locally
function renderScripts() {
    console.log('### INFO: Bundling JavaScript with Webpack...');
    execSync('npx webpack', { stdio: 'inherit' });
}

// Call the renderScripts function
renderScripts();