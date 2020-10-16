const app = require('./app');
const { __port__ } = require('./config');

app.listen(__port__, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on PORT ${__port__}`);
});
