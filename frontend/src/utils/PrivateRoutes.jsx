import { Outlet, Navigate } from 'react-router-dom'


function PrivateRoutes() {



    return (
        localStorage.getItem('authToken') ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes
