import React, { useState } from 'react';
import axios from 'axios';

export default ({ url, method, body = null, onSuccess }) => {
	const [errors, setErrors] = useState([]);

	const doRequest = async () => {
		try {
			const response = await axios[method](url, body);

			if (typeof onSuccess === 'function') {
				onSuccess(response.data);
			}
			return response.data;
		} catch (err) {
			setErrors(err.response.data.errors);
		}
	};

	return { doRequest, errors };
};
