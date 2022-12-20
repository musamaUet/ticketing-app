import express from 'express';

import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.all('/*', async (req, res) => {
	console.log('request.url', req.url);
	console.log('request.baseUrl', req.baseUrl);

	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
		console.log('Connected to MongoDb');
	} catch (err) {
		console.error(err);
	}
};
app.listen(3000, () => {
	console.log('App is listening on port 3000');
});

start();
