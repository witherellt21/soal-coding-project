import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [errorMsg, setErrorMsg] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    function handleSignup(event) {
        event.preventDefault();
        const inputs = event.target.elements;

        axios.post('/signup',
            {
                email: inputs.email.value,
                password: inputs.password.value,
                password2: inputs.password2.value
            })
            .then(function (response, req) {
                localStorage.setItem("access-token", response.data.AccessToken)
                setUser(inputs.email.value);
                setErrorMsg(null);
                navigate('/');
            })
            .catch(function (error) {
                setErrorMsg(error.response.data.errors);
            })

        return;
    }

    return (
        <div className='flex flex-col items-center relative'>
            <div className='w-full flex justify-center py-4 border-b-2 bg-gradient-to-r from-white via-green-100 to-white'>
                <h1 className='w-2/3 text-lg font-semibold'>
                    Welcome to Todos. Create account below or login if you already have one.
                </h1>
            </div>
            <form className='flex flex-col items-end py-8 space-y-6' onSubmit={handleSignup}>
                <div>
                    <label className='pr-2'>Email:</label>
                    <input name="email" className='px-2 border-2 border-gray-500' />
                </div>
                <div>
                    <label className='pr-2'>Password:</label>
                    <input name="password" className='px-2 border-2 border-gray-500' />
                </div>
                <div>
                    <label className='pr-2'>Password Again:</label>
                    <input name="password2" className='px-2 border-2 border-gray-500' />
                </div>
                <button
                    className='w-full bg-gray-300 border border-gray-600 rounded-lg'
                    type='submit'
                >
                    Sign up
                </button>
            </form>
            {errorMsg && (
                <h1 className='w-full absolute bottom-1 text-center text-red-500'>{errorMsg}</h1>
            )}
        </div>
    )
}

export default Signup;