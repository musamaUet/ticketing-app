import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '@mu_tickets/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import { validateRequest } from '@mu_tickets/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().notEmpty().withMessage('Password must be supply'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError('Invalid Credentials');
		}

		const passwordMatch = Password.compare(existingUser.password, password);
		if (!passwordMatch) {
			throw new BadRequestError('Invalid Credentials');
		}
		const userJwt = jwt.sign(
			{ id: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY!
		);
		req.session = { jwt: userJwt };

		res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
