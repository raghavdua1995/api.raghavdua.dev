'use strict';

import express from 'express';
import Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// '../../src/routes.js' file contain routes of the API's most recent version
// Older version's routes can be kept and imported seperately
import routes from '../../src/routes.js';

// Initialise Sentry with an environment name and a DSN value
// See https://docs.sentry.io/platforms/node/express/ for more information
Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: JSON.parse(
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.readFileSync(path.resolve(process.env.SENTRY_DSN_PATH), 'utf8')
  ).dsn,
});

export default () => {
  const app = express();
  app.use(Sentry.Handlers.requestHandler());
  app.use(bodyParser.json());

  // When no version number is mentioned in the URI
  // Serve the Latest version of this API
  // For example: api.raghavdua.dev/data
  app.use(routes);

  // It's also OK, if the URI contains the version numebr
  // For example: api.raghavdua.dev/v1/data
  app.use(`/v${process.env.API_VERSION}`, routes);

  // Handle 404
  app.use((request, response, next) => {
    response.status(404).send('The requested resource does not exist');
  });

  app.use(Sentry.Handlers.errorHandler());
  return app;
};
