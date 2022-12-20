import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	console.log('/api/users/currentuser');
	res.send('Hi there!');
});

export { router as currentUserRouter };
