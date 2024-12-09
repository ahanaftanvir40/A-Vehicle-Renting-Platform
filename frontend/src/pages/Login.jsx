import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors on submit

        try {
            const response = await axios.post('http://localhost:3000/api/loginuser', userData);
            const { data } = response;
            
            if (!data.success) {
                setError('Login failed. Please check your credentials.');
                return;
            }

            localStorage.setItem('authToken', data.authToken);
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error('Login Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-20 min-h-screen">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-md">
                <h1 className="text-center mb-8 text-3xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                        <input
                            onChange={onChange}
                            value={userData.email}
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@flowbite.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">Your password</label>
                        <input
                            onChange={onChange}
                            value={userData.password}
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-slate-400">Don't have an account? </span>
                        <Link className="text-sm text-blue-600" to="/signup">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

