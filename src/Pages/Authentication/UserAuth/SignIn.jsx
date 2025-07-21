import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../redux/features/authentication/authenticationApi';

const SignIn = () => {
	const location = useLocation();
	const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

	// State to store the value
	const [store, setStore] = useState('chatchef');

	useEffect(() => {
		if (fullUrl.includes('techchef')) {
			setStore('techchef');
		} else if (fullUrl.includes('chatchef')) {
			setStore('chatchef');
		} else if (fullUrl.includes('remokitchen')) {
			setStore('remokitchen');
		}
	}, [fullUrl]);

	const [login, { data, isLoading, isError, error, isSuccess }] =
		useLoginMutation();
	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		login(formData);
	};
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			toast.success('Successfully Logged in');
			navigate('/dashboard');
			window.location.reload();
		}
		if (isError) toast.error('Something went wrong. Please try again');
	}, [isError, isSuccess, navigate]);

	return (
		<div className='flex justify-center items-center bg-gray-100 mt-20'>
			<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
				<h1 className='text-4xl text-center mb-8 text-sky-400 font-bold'>
					{store === 'chatchef'
						? 'Chatchef'
						: store === 'techchef'
							? 'Techchef'
							: 'remokitchen'}{' '}
					Sign In
				</h1>
				<form onSubmit={handleLogin} className='space-y-6'>
					<div>
						<label
							htmlFor='email'
							className='block text-lg text-gray-700'
						>
							Email: <span className='text-red-500'>*</span>
						</label>
						<input
							type='email'
							id='email'
							name='email'
							//   required
							className='w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-lg text-gray-700'
						>
							Password: <span className='text-red-500'>*</span>
						</label>
						<input
							type='password'
							id='password'
							name='password'
							//   required
							className='w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>

					<div className='flex flex-row justify-between items-center'>
						<button
							name='signin'
							type='submit'
							disabled={isLoading}
							className={`bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md cursor-pointer btn ${
								isLoading ? 'loading' : ''
							}`}
						>
							{isLoading ? 'Signing in' : 'Sign in'}
						</button>

						<Link
							to='/register'
							className='bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md cursor-pointer btn'
						>
							Register
						</Link>
					</div>
				</form>

				{/* <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </p>
        </div> */}
			</div>
		</div>
	);
};

export default SignIn;
