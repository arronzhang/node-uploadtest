rm -rf upload_cache/*
NODE_ENV=test ./node_modules/.bin/mocha test/app.js -r should
