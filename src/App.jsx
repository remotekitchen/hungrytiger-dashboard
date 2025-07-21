import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import useAuthCheck from './Pages/hooks/useAuthCheck';
import router from './router';

function App() {
	const authChecked = useAuthCheck();

	// State to store the value
	const [store, setStore] = useState('chatchef');
	// const fullUrl = window.location.href;
	const fullUrl = window.location.href;
	// // console.log("🚀 ~ useEffect ~ fullUrl:", fullUrl);

	useEffect(() => {
		if (fullUrl.includes('techchef')) {
			setStore('techchef');
		} else if (fullUrl.includes('chatchef')) {
			setStore('chatchef');
		} else if (fullUrl.includes('remokitchen')) {
			setStore('remokitchen');
		}
	}, [fullUrl, store]);

	return !authChecked ? (
		<span className='loading loading-spinner loading-lg'></span>
	) : (
		<>
			<Helmet>
				<title>
					{{
						techchef: 'TechChef',
						remokitchen: 'remokitchen',
					}[store] || 'ChatChef'}
				</title>
				{/* <link rel="icon" type="image/svg+xml" href="/favicon.ico" /> */}
				<link
					rel='icon'
					type='image/svg+xml'
					// href="/favicon.ico"
					href={
						store === 'techchef' ? '/favicon2.ico' : '/favicon.ico'
					}
				/>
			</Helmet>
			<RouterProvider router={router} />
			<Toaster position='top-center' />
		</>
	);
}

export default App;
