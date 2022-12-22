import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

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
