function Login() {

    function handleLogin(event) {
        event.preventDefault();
        const inputs = event.currentTarget.elements;

        console.log(inputs);
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='w-full flex justify-center py-4 border-b-2 bg-gradient-to-r from-white via-green-100 to-white'>
                <h1 className='w-2/3 text-lg font-semibold'>
                    Welcome to Todos. Login to your account to manage your to-do lists.
                </h1>
            </div>
            <form className='flex flex-col items-end py-8 space-y-6' onSubmit={handleLogin}>
                <div>
                    <label className='pr-2'>Email:</label>
                    <input name="email" className='px-2 border-2 border-gray-500' />
                </div>
                <div>
                    <label className='pr-2'>Password:</label>
                    <input name="password" className='px-2 border-2 border-gray-500' />
                </div>
                <button className='w-full bg-gray-300 border border-gray-600 rounded-lg'>
                    Log in
                </button>
            </form>
        </div>
    )
}

export default Login;