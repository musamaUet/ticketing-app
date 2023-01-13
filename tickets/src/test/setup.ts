import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

let mongo: any;

declare global {
	namespace NodeJS {
		interface Global {
			signin(): Promise<string[]>;
		}
	}
}

beforeAll(async () => {
	process.env.JWT_KEY = 'asdfasdf';

	mongo = new MongoMemoryServer();
	await mongo.start();
	const mongoUri = await mongo.getUri();

	mongoose.set('strictQuery', false);
	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let colleciton of collections) {
		await colleciton.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('/api/users/signup')
		.send({ email, password })
		.expect(201);

	const cookie = response.get('Set-Cookie');
	return cookie;
};
