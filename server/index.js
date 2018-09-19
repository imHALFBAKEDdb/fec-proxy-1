const app = require('./app.js');
const PORT = 5000;

app.listen(PORT, () => {
  console.log('Proxy server listening on ', PORT);
});