/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({

        email: '',
        password: ''

    })

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/api/loginuser`, userData)
            console.log(response.data); //remove console log
            const json = await response.data
            if (!json.success) {
                alert('Login with valid Credentials')
            }
            if (json.success) {
                localStorage.setItem('authToken', json.authToken)


                console.log(localStorage.getItem('authToken'));
                navigate('/')
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }

    }





    return (
        <div className="flex flex-col items-center p-20 min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-center mb-10 text-3xl font-medium bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Login</h1>
                <form onSubmit={handleSubmit} className="text-black">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                        <input onChange={onChange} value={userData.email} type="email" id="email" name="email" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">Your password</label>
                        <input onChange={onChange} value={userData.password} type="password" name="password" id="password" placeholder="password" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <span>
                        <Link className='text-sm text-blue-600 ml-4' to='/signup'>Don't have an account?</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
