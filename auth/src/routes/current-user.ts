import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '@mu_tickets/common';

const router = express.Router();

// interface RequestUserAuth extends Request {
// 	currentUser?: string;
// }

declare global {
	namespace Express {
		interface Request {
			currentUser?: string;
		}
	}
}

router.get(
	'/api/users/currentuser',
	currentUser,
	requireAuth,
	(req: Request, res: Response) => {
		res.send({ currentUser: req.currentUser || null });
	}
);

export { router as currentUserRouter };
