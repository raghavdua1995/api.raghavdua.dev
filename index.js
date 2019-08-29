'use strict';

import expressConfig from './config/express/express.js';
const app = expressConfig();

app.listen(process.env.PORT, function() {
  const host = process.env.HOST;
  const port = process.env.PORT;
  console.info('App listening at http://%s:%s', host, port);
});

export default app;

