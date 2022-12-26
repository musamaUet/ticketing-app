import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'POST',
		body: { email, password },
		onSuccess: () => Router.push('/'),
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
		Router.push('/');
	};

	return (
		<form className='container' onSubmit={onSubmit}>
			<h1>Sign Up</h1>
			<div className='form-group'>
				<label>Email Address</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='text'
					className='form-control'
				/>
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					className='form-control'
				/>
			</div>
			{errors.length > 0 && (
				<div className='alert alert-danger'>
					<h4>Ooops...</h4>
					<ul className='my-0'>
						{errors.map((err) => {
							return <li key={err.message}>{err.message}</li>;
						})}
					</ul>
				</div>
			)}

			<button className='btn btn-primary'>Sign In</button>
		</form>
	);
};
