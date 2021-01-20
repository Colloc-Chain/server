const https = require('https');
const app = require('./app');
const { __port__ } = require('./config');
const { sslOptions } = require('./ssl');

const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(__port__, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on PORT ${__port__}`);
});
