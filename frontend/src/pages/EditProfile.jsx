import { useNavigate, } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function EditProfile() {
    let navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        userType: 'Normal',
        password: '',
        phoneNumber: '',
        drivingLicense: '',
        nationalId: ''
    })
    const [avatar, setAvatar] = useState(null)
    const [licenseFile, setLicenseFile] = useState(null)

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
            formData.append('userType', userData.userType)
            if (userData.userType === 'Driver') {
                formData.append('phoneNumber', userData.phoneNumber)
                formData.append('drivingLicense', userData.drivingLicense);
                formData.append('nationalId', userData.nationalId);
            }
            if (licenseFile) {
                formData.append('licenseFile', licenseFile)
            }
            if (avatar) {
                formData.append('avatar', avatar);
            }




            const response = await axios.post(`http://localhost:3000/api/updateuser`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data); //remove console log
            const json = await response.data
            console.log(json); //remove log
            if (!json.success) {
                alert('Enter Valid Credentials')
            }
            if (json.success) {
                alert('Profile Updated')
                navigate('/profile')
            }
        } catch (error) {
            console.log(error);
        }

    }





    return (
        <div className="flex flex-col items-center p-20">
            <div className="w-full max-w-md">
                <h1 className="text-center mb-10 text-3xl font-medium bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Update Your Profile</h1>
                <form onSubmit={handleSubmit} className="text-black">
                    <div className="mb-5">
                        <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-slate-300">Change Avatar</label>
                        <input onChange={onFileChange} type="file" id="avatar" name="avatar" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-300">Change name</label>
                        <input onChange={onChange} value={userData.name} type="text" id="name" name="name" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="userType" className="block mb-2 text-sm font-medium text-slate-300">Change User Type:</label>
                        <select name="userType" value={userData.userType} onChange={onChange}>
                            <option value="Normal">Normal</option>
                            <option value="Driver">Driver</option>
                        </select>
                    </div>
                    {userData.userType === 'Driver' && (
                        <>
                            <div className="mb-5">
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-slate-300">Edit Contact Number:</label>
                                <input onChange={onChange} value={userData.phoneNumber} type="number" name="phoneNumber" placeholder="Contact Number" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="drivingLicense" className="block mb-2 text-sm font-medium text-slate-300">Edit Driving License</label>
                                <input onChange={onChange} value={userData.drivingLicense} type="number" id="license" name="drivingLicense" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Driving License" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="licenseFile" className="block mb-2 text-sm font-medium text-slate-300">Update Driving License Photo</label>
                                <input onChange={onFileChange} type="file" id="licenseFile" name="licenseFile" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="nationalId" className="block mb-2 text-sm font-medium text-slate-300">Edit National ID</label>
                                <input onChange={onChange} value={userData.nationalId} type="number" id="nid" name="nationalId" className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter NID" required />
                            </div>
                        </>
                    )}

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
