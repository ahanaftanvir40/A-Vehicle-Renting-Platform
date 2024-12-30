import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { VehicleTypes, VehicleCategories } from "../utils/enum";

//ui
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
        <div className="container mx-auto p-4 min-h-screen flex items-start py-20 justify-center ">
            <Card className="w-full max-w-4xl bg-white text-black border-none outline-none shadow-xl">
                <CardHeader>
                    <CardTitle>Vehicle Registration</CardTitle>
                    <CardDescription>Enter your vehicle details below</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        {step === 1 && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Select name="type" value={vehicle.type} onValueChange={handleChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select vehicle type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(VehicleTypes).map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="brand">Brand</Label>
                                        <Input type="text" name="brand" value={vehicle.brand} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="model">Model</Label>
                                        <Input type="text" name="model" value={vehicle.model} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Input type="number" name="year" value={vehicle.year} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea name="description" value={vehicle.description} onChange={handleChange} className="resize-none" />
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="pricePerDay">Price per day</Label>
                                        <Input type="number" name="pricePerDay" value={vehicle.pricePerDay} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input type="text" autoComplete="off" name="location" value={vehicle.location} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="currentLocation" checked={currentLocation} onCheckedChange={handleCheckboxChange} />
                                    <Label htmlFor="currentLocation">Set your current location</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="availability" checked={vehicle.availability} onCheckedChange={(checked) => setVehicle(prev => ({ ...prev, availability: checked }))} />
                                    <Label htmlFor="availability">Available for rent</Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="images">Images</Label>
                                    <Input type="file" name="images" onChange={handleImageChange} multiple />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select name="category" value={vehicle.category} onValueChange={handleChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(VehicleCategories).map((category) => (
                                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="condition">Condition</Label>
                                        <Input type="text" name="condition" value={vehicle.condition} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="no_plate">Number Plate</Label>
                                        <Input type="text" name="no_plate" value={vehicle.no_plate} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="chassis_no">Chassis Number</Label>
                                        <Input type="text" name="chassis_no" value={vehicle.chassis_no} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="registration_no">Registration Number</Label>
                                    <Input type="text" name="registration_no" value={vehicle.registration_no} onChange={handleChange} required />
                                </div>
                            </>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step === 2 && (
                            <Button type="button" variant="outline" className='text-white bg-black/90' onClick={prevStep}>
                                Previous
                            </Button>
                        )}
                        {step === 1 ? (
                            <Button type="button" variant='outline' className='text-white bg-black/90' onClick={nextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" variant='secondary' className='text-white bg-black/90'>
                                Add Vehicle
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>

    );
}

export default AddVehicles;
