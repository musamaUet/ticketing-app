import React, { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

export default () => {
	const { doRequest } = useRequest({
		url: '/api/users/signin',
		method: 'POST',
		body: {},
		onSuccess: Router.push('/'),
	});
	useEffect(() => {
		doRequest();
	}, []);
	return <div></div>;
};
