import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';


function Authentication() {

    const [signupFormSelected, setSignupFormSelected] = useState(true);

    return (
        <div className='h-full pt-24 px-4 flex items-start justify-center'>
            <div className='border-2 border-black rounded-lg'>
                <div className='h-8'>
                    <button
                        className={`w-1/2 h-full rounded-tl-lg hover:bg-blue-100 ${signupFormSelected ? "bg-blue-100" : "bg-blue-300"}`}
                        onClick={() => setSignupFormSelected(true)}
                    >
                        Signup
                    </button>
                    <button
                        className={`w-1/2 h-full rounded-tr-lg hover:bg-blue-100 ${signupFormSelected ? "bg-blue-300" : "bg-blue-100"}`}
                        onClick={() => setSignupFormSelected(false)}
                    >Login
                    </button>
                </div>
                {signupFormSelected ? <Signup /> : <Login />}
            </div>

        </div>
    )
}

export default Authentication;