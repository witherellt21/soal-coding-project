import React from 'react'
import {
    Outlet, Link,
    Navigate,
    useLocation
} from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider';

function Layout() {
    const { user, setUser } = useAuth();
    const location = useLocation();

    const handleSignOut = () => {
        setUser("");
    }

    return (
        user
            ? <>
                <nav>
                    <ul className='w-full flex justify-end bg-gray-200'>
                        <h1 className='flex flex-grow justify-center items-center bg-red-50 text-xl'>Todos</h1>
                        <li className='p-4 bg-blue-50'>
                            <Link to="/todos">Home</Link>
                        </li>
                        <li className='p-4 bg-blue-50'>
                            <Link to="/" onClick={handleSignOut}>Sign out</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default Layout