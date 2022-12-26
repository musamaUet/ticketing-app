import 'bootstrap/dist/css/bootstrap.css';

import Header from '../component/header';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</div>
	);

	return;
};

AppComponent.getInitialProps = async (appContext) => {
	const { ctx, Component } = appContext;
	const { data } = await buildClient(ctx).get('/api/users/currentuser');

	let pageProps = {};

	if (Component) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { props: data, pageProps };
};

export default AppComponent;
