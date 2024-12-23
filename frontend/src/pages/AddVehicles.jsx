import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { VehicleTypes, VehicleCategories } from "../utils/enum";

function AddVehicles() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        description: '',
        type: VehicleTypes.CAR,
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        location: '',
        latitude: 0,
        longitude: 0,
        availability: true,
        category: VehicleCategories.SEDAN,
        condition: '',
        no_plate: '',
        chassis_no: '',
        registration_no: '',
    });

    const [currentLocation, setCurrentLocation] = useState(false);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleCheckboxChange = async () => {
        setCurrentLocation(!currentLocation);

        if (!currentLocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setVehicle(prevVehicle => ({ ...prevVehicle, latitude, longitude }));

                const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
                const json = response.data;
                console.log(json);
                console.log(json.results[0].formatted);
                setVehicle(prevVehicle => ({ ...prevVehicle, location: json.results[0].formatted }));
            },
                (error) => {
                    console.log(error);
                },
                {
                    enableHighAccuracy: true
                }

            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in vehicle) {
                formData.append(key, vehicle[key]);
            }
            images.forEach(image => {
                formData.append('vehicleImages', image);
            });

            const response = await axios.post(`http://localhost:3000/api/vehicles`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const json = response.data;
            if (json.success) {
                navigate(`/vehicles/${json.vehicleId}`);
                alert('Vehicle Added Successfully');
            } else {
                alert('Failed To add Vehicle. Please Login');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert('Failed To add vehicle');
        }
    };

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="mx-auto  p-4 h-screen flex items-center justify-center ">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl w-full bg-[#2f2d3b] shadow-lg rounded-lg p-6">
                {step === 1 && (
                    <>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                                Type:
                            </label>
                            <select
                                name="type"
                                value={vehicle.type}
                                onChange={handleChange}
                                className="mt-1 block w-full text-black/70 bg-[#cfcad1] rounded-md border-gray-300 shadow-sm outline-none"
                            >
                                {Object.values(VehicleTypes).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                Brand:
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={vehicle.brand}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-[#cfcad1] border-gray-300 shadow-sm outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                                Model:
                            </label>
                            <input
                                type="text"
                                name="model"
                                value={vehicle.model}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-[#cfcad1] border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                Year:
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={vehicle.year}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-[#cfcad1] border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Write your thoughts here..."
                                value={vehicle.description}
                                onChange={handleChange}
                                className="mt-1 block w-full resize-none bg-[#cfcad1] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div>
                            <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">
                                Price per day:
                            </label>
                            <input
                                type="number"
                                name="pricePerDay"
                                value={vehicle.pricePerDay}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-[#cfcad1] border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location:
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={vehicle.location}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 bg-[#cfcad1] shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="currentLocation"
                                checked={currentLocation}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="currentLocation" className="ml-2 text-sm text-gray-700">
                                Set your current location as your location?
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="availability"
                                checked={vehicle.availability}
                                onChange={(e) => setVehicle({ ...vehicle, availability: e.target.checked })}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="availability" className="ml-2 text-sm text-gray-700">
                                Available for rent
                            </label>
                        </div>

                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                Images:
                            </label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                onChange={handleImageChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category:
                            </label>
                            <select
                                name="category"
                                value={vehicle.category}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-[#cfcad1] outline-none"
                            >
                                {Object.values(VehicleCategories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                                Condition:
                            </label>
                            <input
                                type="text"
                                name="condition"
                                value={vehicle.condition}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-[#cfcad1] outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="no_plate" className="block text-sm font-medium text-gray-700">
                                Number Plate:
                            </label>
                            <input
                                type="text"
                                name="no_plate"
                                value={vehicle.no_plate}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="chassis_no" className="block text-sm font-medium text-gray-700">
                                Chassis Number:
                            </label>
                            <input
                                type="text"
                                name="chassis_no"
                                value={vehicle.chassis_no}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="registration_no" className="block text-sm font-medium text-gray-700">
                                Registration Number:
                            </label>
                            <input
                                type="text"
                                name="registration_no"
                                value={vehicle.registration_no}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                Add Vehicle
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>

    );
}

export default AddVehicles;
