import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import gt86 from "../assets/gt86.jpg"; //dummy
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../store/auth";
import ChatComponent from "../components/ChatComponent";
import OwnerChatComponent from "../components/OwnerChatComponent";


import {
  MapIcon,
  CalendarIcon,
  FuelIcon,
  UsersIcon,
  CarIcon,
  StarIcon,
  CogIcon,
  MapPinnedIcon,
  UserRoundIcon,
} from "lucide-react";

function Vehicle() {
  const { user } = useAuth();
  const authUser = user && user._id;
  const authUserName = user && user.name;
  console.log("User auth : ", user._id);
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [drivers, setDrivers] = useState({});
  console.log("vehicle id from params:", vehicleId);
  const [booked, setBooked] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [rating, setRating] = useState({
    rating: 0,
    review: ''
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vehicles/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setVehicle(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("Vehicle fetch failed:", error);
      }
    };
    fetchVehicle();
  }, [vehicleId, booked]); // Dependency array includes `vehicleId` and `booked`

  //fetch unavailable dates
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/unavailable-dates/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUnavailableDates(response.data.unavailableDates);

      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, []); // Dependency array includes `vehicleId`


  //fetch drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/drivers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setDrivers(response.data.drivers);
        console.log(response.data.drivers);
      } catch (error) {
        console.log("Driver fetch failed:", error);
      }
    };
    fetchDrivers();
  }, []);
  console.log("Drivers:", drivers);

  //BOOKING
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const unavailableDateObjects = unavailableDates.flatMap((dateRange) => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);


    const dates = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  });
  console.log("unavailableDateObjects:", unavailableDateObjects);


  const onSubmit = async (data) => {
    try {
      const { driverId } = data;

      // Parse dates and calculate duration
      const bookingStart = startDate
      const bookingEnd = endDate
      const diffDays = Math.ceil((bookingEnd - bookingStart) / (1000 * 60 * 60 * 24)); // Inclusive of both days
      const totalAmount = diffDays * vehicle.pricePerDay;

      // Prepare booking data
      const newBooking = {
        vehicleId: vehicle._id,
        ownerId: vehicle.ownerId,
        driverId,
        bookingStart,
        bookingEnd,
        totalAmount,
      };

      console.log("New Booking:", newBooking);

      if (!bookingStart || !bookingEnd) {
        console.error("Start Date and End Date are required");
        return;
      }


      const response = await axios.post(`http://localhost:3000/api/bookings`, newBooking, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      console.log("Booking Successful:", response.data);
      setBooked(true);
      toast.success("Booking Successful!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating booking:", error.response?.data || error.message);
    }
  };

  //Ratings
  const onSubmitRating = async (e) => {
    e.preventDefault()
    console.log("Rating:", rating);

    try {
      const response = await axios.post(`http://localhost:3000/api/vehicles/${vehicleId}/rate`, rating, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      setVehicle(response.data.vehicle)
      toast.success("Rating Successful!")
      setRating({ review: '', rating: 0 })

    } catch (error) {
      toast.error("You have already rated this vehicle")
    }
  }



  // console.log('Vehicle ID from fetch:' , vehicle._id);
  const ownerID = vehicle.ownerId && vehicle.ownerId._id;
  // console.log("unavailable dates:", unavailableDates);
  // console.log('vehicle latitude and longitude:', vehicle.latitude, vehicle.longitude);
  // console.log("vehicle data:", vehicle);



  return (
    <div>
      <div className="mx-auto max-w-sm sm:max-w-full py-8 min-h-screen w-full sm:px-52 ">
        <div className="max-w-sm sm:max-w-2xl items-center m-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {/* <SwiperSlide>
                    <img src={gt86} alt="Vehicle 2" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/docs/images/carousel/carousel-3.svg" alt="Vehicle 3" className="w-full h-full object-cover rounded-sm" />
                </SwiperSlide>
            </Swiper> */}

            {vehicle.images &&
              vehicle.images.length > 0 &&
              vehicle.images.map((imageArray, index) => (
                <div key={index}>
                  {[...imageArray].reverse().map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`http://localhost:3000/public/images/vehicle-images/${image}`}
                        alt="Vehicle 2"
                        className=" object-contain object-center rounded-sm"
                      />
                    </SwiperSlide>
                  ))}
                </div>
              ))}
          </Swiper>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-3 sm:mt-5">
          <div>
            <h1 className="flex items-center mb-2 sm:mb-1 text-4xl sm:text-5xl font-extrabold text-gray-200 dark:text-white mt-3">
              {vehicle.brand}
              <span className="bg-blue-100 text-blue-800 text-xl sm:text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                {vehicle.model}
              </span>
            </h1>
          </div>
          <h1
            className={`py-4 px-4 rounded-lg text-center text-xl font-semibold  sm:mt-0 ${vehicle.availability
              ? "bg-gradient-to-r from-teal-200 to-lime-200 text-black/80"
              : "bg-red-500 text-white"
              }`}
          >
            {vehicle.availability ? "Available" : "Not Available"}
          </h1>
        </div>

        <div className={`${vehicle.latitude !== 0 ? 'flex flex-col sm:flex-row gap-4' : 'border flex justify-center'} mt-4`}>
          <div className={`${vehicle.latitude ? 'sm:w-3/4 w-full' : 'sm:min-w-full'} bg-[#9389bd]  sm:min-h-[600px]  dark:shadow-zinc-600 p-4 rounded-lg dark:bg-zinc-900 flex-col justify-between`}>

            <div className="grid grid-cols-2 gap-5 text-gray-200">
              <div className="flex items-center dark:text-white/80">
                <CarIcon className="mr-2 h-5 w-5" />
                <span>{vehicle.category}</span>
              </div>
              <div className="flex items-center dark:text-white/80">
                <UsersIcon className="mr-2 h-5 w-5" />
                <span>5 Seats</span>
              </div>
              <div className="flex items-center dark:text-white/80">
                <CogIcon className="mr-2 h-5 w-5" />
                <span>Automatic</span>
              </div>
              <div className="flex items-center dark:text-white/80">
                <CalendarIcon className="mr-2 h-5 w-5" />
                <span>{vehicle.year} Model</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 text-gray-200 dark:text-white/90">
                Description
              </h3>
              <div className="dark:text-white/80 text-gray-200 min-h-32 max-h-32 overflow-y-auto ">
                {vehicle.description}
              </div>
            </div>

            <div className="mt-8 text-gray-200 ">
              <h1 className="text-lg sm:text-3xl font-semibold mb-2 dark:text-white/90">
                Booking Information
              </h1>
              <div className="mt-4">

                <div className="flex items-center mb-1 dark:text-white/80">
                  <UserRoundIcon className="mr-2 h-5 w-5" />
                  <span>{vehicle.ownerId && vehicle.ownerId.name}</span>
                </div>
                <div className="flex items-center dark:text-white/80">
                  <MapPinnedIcon className="mr-2 h-5 w-5" />
                  <span>{vehicle.location}</span>
                </div>
                <div className="bg-[#6768ab] rounded-lg w-fit px-2 py-1 my-2">
                  <h1 className="font-semibold sm:text-2xl text-md text-gray-100 dark:text-white/80">
                    {vehicle.pricePerDay}Tk / day
                  </h1>
                </div>
                <div className="flex items-center mb-4 mt-2">
                  <StarIcon className="text-yellow-400 mr-1" />
                  <StarIcon className="text-yellow-400 mr-1" />
                  <StarIcon className="text-yellow-400 mr-1" />
                  <StarIcon className="text-yellow-400 mr-1" />
                  <StarIcon className="text-yellow-400 mr-1" />
                  <span className="ml-2 text-sm text-muted-foreground dark:text-white/60">
                    (48 reviews)
                  </span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg sm:text-2xl font-semibold mb-2 dark:text-white/90">
                    Submit Your Rating
                  </h2>
                  <form onSubmit={onSubmitRating} className="space-y-4">
                    <label className="block">
                      <select
                        value={rating.rating}
                        onChange={(e) => setRating({ ...rating, rating: e.target.value })}
                        className="mt-2 block w-2/12 rounded-md border-gray-300 shadow-sm outline-none  bg-gray-100 text-black/80"
                      >
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
                    </label>
                    <div className="flex items-center gap-4  ">
                      <label className="block">

                        <textarea
                          value={rating.review}
                          onChange={(e) => setRating({ ...rating, review: e.target.value })}
                          className=" block w-64 rounded-md border-gray-300 shadow-sm bg-gray-100 text-black/80 outline-none resize-none"
                        />
                      </label>
                      <button
                        type="submit"
                        className=" py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row  gap-4">
                  <div>
                    {!booked && ownerID !== authUser && (
                      <button
                        onClick={() => setIsOpen(true)}
                        className="btn border-none bg-blue-700 text-white hover:bg-blue-500"
                      >
                        Book Now
                      </button>
                    )}
                    {booked && (
                      <button
                        className="btn bg-slate-500 dark:text-white/60"
                        disabled
                      >
                        Already Booked
                      </button>
                    )}

                    {isOpen && (
                      <dialog className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="modal-box bg-white p-6 sm:p-20 rounded-lg shadow-xl w-full max-w-lg">
                          <h3 className="font-bold text-center text-lg mb-4">BOOKING INFO</h3>
                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 sm:px-20">
                            {/* Start Date */}
                            <label className="block">
                              <span className="text-gray-700">Start Date:</span>
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                excludeDates={unavailableDateObjects}
                                placeholderText="Select a start date"
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                            </label>

                            {/* End Date */}
                            <label className="block">
                              <span className="text-gray-700">End Date:</span>
                              <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                minDate={startDate ? new Date(startDate.getTime() + 86400000) : new Date()} // One day after start date
                                excludeDates={unavailableDateObjects}
                                placeholderText="Select an end date"
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                            </label>
                            <label className="block">
                              <span className="text-gray-700">Driver:</span>
                              <select
                                {...register("driverId", { required: "Driver selection is required" })}
                                defaultValue={drivers[0]._id}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              >
                                {drivers.map((driver) => (
                                  <option key={driver._id} value={driver._id}>
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            </label>

                            {/* Submit and Close Buttons */}
                            <div className="flex justify-between">
                              <input
                                type="submit"
                                value="Submit"
                                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="py-2 px-4 border border-gray-300 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                              >
                                Close
                              </button>
                            </div>

                          </form>
                        </div>
                      </dialog>
                    )}
                  </div>

                  <div className="">
                    {authUser !== ownerID && (
                      <ChatComponent
                        vehicleId={vehicleId}
                        ownerId={vehicle.ownerId && vehicle.ownerId._id}
                        userId={authUser}
                        username={authUserName}
                        ownerName={vehicle.ownerId && vehicle.ownerId.name}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {vehicle.latitude && vehicle.latitude !== 0 && (
            <div className={`w-full sm:w-2/5 h-full`}>
              <div className="max-w-full">
                <div className="flex justify-center">
                  {vehicle.latitude && vehicle.latitude !== 0 && (
                    <MapContainer
                      center={[vehicle.latitude, vehicle.longitude]}
                      zoom={13}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[vehicle.latitude, vehicle.longitude]} />
                    </MapContainer>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* {authUser !== ownerID && (
                <ChatComponent vehicleId={vehicleId} ownerId={vehicle.ownerId && vehicle.ownerId._id} userId={authUser} username={authUserName} ownerName={vehicle.ownerId && vehicle.ownerId.name} />

            )} */}
        {authUser === ownerID && (
          <OwnerChatComponent
            vehicleId={vehicleId}
            ownerId={vehicle.ownerId && vehicle.ownerId._id}
          />
        )}
      </div>
      <div className="flex flex-col  items-start justify-start sm:px-52 px-6">
        <div className=" text-gray-200 "></div>
        <h1 className="text-lg sm:text-3xl font-semibold mb-2 dark:text-white/90  text-gray-50">
          Reviews
        </h1>
        <div className="space-y-4  w-3/4  mb-10">
          {vehicle.ratings && vehicle.ratings.length > 0 ? (
            vehicle.ratings.map((review, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <StarIcon key={index} className="text-yellow-400 mr-1" />
                  ))}
                  <span className="text-sm text-gray-400">{review.rating} / 5</span>
                </div>
                <p className="text-gray-200">{review.review}</p>
                {review.userId && (
                  <div className="mt-2 text-sm text-gray-300">
                    - {review.userId.name}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
