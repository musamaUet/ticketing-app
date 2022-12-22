import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on a successful signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);
});

it('it returns a 400 with an invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'testtest', password: 'password' })
		.expect(400);
});

it('it returns a 400 with an invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'pas' })
		.expect(400);
});

it('it returns a 400 with missing email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com' })
		.expect(400);

	return request(app)
		.post('/api/users/signup')
		.send({ password: 'password' })
		.expect(400);
});

it('disallows duplicate email and password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);

	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400);
});

it('sets a cookie after a successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
