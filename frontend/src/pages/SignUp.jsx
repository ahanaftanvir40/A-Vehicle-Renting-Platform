
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'


function SignUp() {
    let navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        userType: 'Normal',
        password: '',
        drivingLicense: '',
        phoneNumber: '',
        nationalId: '',


    })

    const [avatar, setAvatar] = useState(null)
    const [licenseFile, setLicenseFile] = useState(null)
    const [error, setError] = useState([])

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const onFileChange = (e) => {
        if (e.target.name === 'avatar') {
            setAvatar(e.target.files[0])
        } else if (e.target.name === 'licenseFile') {
            setLicenseFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData()

            formData.append('name', userData.name)
            formData.append('email', userData.email)
            formData.append('password', userData.password)
            formData.append('userType', userData.userType)
            formData.append('phoneNumber', userData.phoneNumber)

            if (userData.userType === 'Driver') {
                formData.append('drivingLicense', userData.drivingLicense);
                formData.append('nationalId', userData.nationalId);

                if (licenseFile) {
                    formData.append('licenseFile', licenseFile);
                }
            }
            if (avatar) {
                formData.append('avatar', avatar);
            }





            const response = await axios.post(`http://localhost:3000/api/createuser`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data); //remove console log
            const json = await response.data
            console.log(json); //remove log

            if (json.error) {
                toast.error('Please Check Your Inputs' , {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                })
                setError(json.error)
            }
            if (json.success) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }

    }





    return (
        <div className="flex flex-col items-center p-20 min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-center mb-10 text-3xl font-medium bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Sign Up as a New User</h1>
                <form onSubmit={handleSubmit} className="text-black">
                    <div className="mb-5">
                        <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-slate-300">Upload Avatar</label>
                        <input onChange={onFileChange} type="file" id="avatar" name="avatar" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-300">Your name</label>
                        <input onChange={onChange} value={userData.name} type="text" id="name" name="name" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                        <input onChange={onChange} value={userData.email} type="email" id="email" name="email" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">Your password</label>
                        <input onChange={onChange} value={userData.password} type="password" name="password" id="password" placeholder="password" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-slate-300">Your Contact Number:</label>
                        <input onChange={onChange} value={userData.phoneNumber} type="number" name="phoneNumber" placeholder="Contact Number" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="userType" className="block mb-2 text-sm font-medium text-slate-300">Select User Type:</label>
                        <select name="userType" value={userData.userType} onChange={onChange}>
                            <option value='Normal'>Normal</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>
                    {userData.userType === 'Driver' && (
                        <>

                            <div className="mb-5">
                                <label htmlFor="drivingLicense" className="block mb-2 text-sm font-medium text-slate-300">Your Driving License</label>
                                <input onChange={onChange} value={userData.drivingLicense} type="number" id="license" name="drivingLicense" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Driving License" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="licenseFile" className="block mb-2 text-sm font-medium text-slate-300">Upload Driving License</label>
                                <input onChange={onFileChange} type="file" id="licenseFile" name="licenseFile" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="nationalId" className="block mb-2 text-sm font-medium text-slate-300">Your National ID</label>
                                <input onChange={onChange} value={userData.nationalId} type="number" id="nid" name="nationalId" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter NID" required />
                            </div>
                        </>
                    )}
                    {error.map((item) => (
                        <div key={item.message}>
                            <p className='text-red-600 text-sm mt-1'>{item.message}</p>
                        </div>
                    ))}
                    <div className='mt-2'>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <span>
                        <Link className='text-sm text-blue-600 ml-4' to='/login'>Already a user?</Link>
                    </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp

