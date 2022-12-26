import React from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed In</h1>
	) : (
		<h1>You are not signed In</h1>
	);
};

LandingPage.getInitialProps = async (context) => {
	const { data } = await buildClient.get(context).get('/api/users/currentuser');
	return {
		props: data,
	};
};

export default LandingPage;
