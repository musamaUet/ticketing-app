import express from 'express';

import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@mu_tickets/common';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.JWT_KEY === 'test',
	})
);

app.all('/*', async (req, res) => {
	console.log('request.url', req.url);
	console.log('request.baseUrl', req.baseUrl);

	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
