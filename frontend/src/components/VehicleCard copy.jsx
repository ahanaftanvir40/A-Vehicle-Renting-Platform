import { Link } from "react-router-dom"
import gt86 from '../assets/gt86.jpg' //dummy img


function VehicleCard({ vehicle }) {
    return (
        <div className="max-w-sm bg-gray-200 rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg dark:bg-black/70 dark:border-gray-700 dark:shadow-zinc-900">
            <Link to={`/vehicles/${vehicle._id}`}>
                {vehicle.images && vehicle.images.length > 0 ? (
                    <img className="rounded-t-lg w-full h-56 sm:h-60 object-cover" src={`http://localhost:3000/public/images/vehicle-images/${vehicle.images[0][0]}`} alt={`${vehicle.brand} ${vehicle.model}`} />
                ) : (
                    <img className="rounded-t-lg w-full h-56 sm:h-60 object-cover" src={gt86} alt="Default vehicle" />
                )}
            </Link>
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to={`/vehicles/${vehicle._id}`}>
                            <h5 className=" font-roboto text-2xl font-semibold tracking-tight text-slate-800 dark:text-white hover:text-slate-600">
                                {vehicle.brand} {vehicle.model}
                            </h5>


                        </Link>
                    </div>
                    <div>
                        <span className="bg-[#2f2d3b] dark:bg-transparent dark:border-2 text-white font-semibold px-2 py-1.5 pointer-events-none rounded-full">
                            {vehicle.pricePerDay}Tk<span className="text-slate-200 dark:text-white/60 font-medium">/day</span>
                        </span>
                    </div>
                </div>



                <p className="ml-1 text-gray-500 font-roboto dark:text-gray-400">
                    {vehicle.category}
                </p>

                <div className="mt-3 mb-2 flex items-center justify-center space-x-1">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        width="256"
                        height="256"
                        viewBox="0 0 256 256"
                    >
                        <g fill="#808080" strokeMiterlimit="10" strokeWidth="0">
                            <path
                                d="M45 90a3 3 0 01-2.583-1.475l-4.471-7.563c-9.222-15.591-17.933-30.317-20.893-36.258a30.788 30.788 0 01-3.138-13.62C13.916 13.944 27.86 0 45 0c17.141 0 31.085 13.944 31.085 31.084a30.8 30.8 0 01-3.124 13.596l-.063.124c-3.007 6.005-11.672 20.654-20.843 36.159l-4.472 7.563A3 3 0 0145 90zm0-84C31.168 6 19.916 17.253 19.916 31.084c0 3.848.847 7.539 2.518 10.969 2.852 5.721 11.909 21.033 20.667 35.839L45 81.104l1.89-3.196c8.763-14.813 17.823-30.131 20.687-35.879l.035-.067a24.843 24.843 0 002.474-10.877C70.085 17.253 58.832 6 45 6z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                            <path
                                d="M45 44.597c-8.076 0-14.646-6.57-14.646-14.646S36.924 15.306 45 15.306c8.075 0 14.646 6.57 14.646 14.646S53.075 44.597 45 44.597zm0-23.291c-4.767 0-8.646 3.878-8.646 8.646s3.878 8.646 8.646 8.646c4.768 0 8.646-3.878 8.646-8.646S49.768 21.306 45 21.306z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            ></path>
                        </g>
                    </svg>
                    <p className="text-gray-700 dark:text-gray-400">
                        <span className="font-roboto font-medium "></span> {vehicle.location}
                    </p>
                </div>



                <div className="flex justify-center">
                    <Link
                        to={`/vehicles/${vehicle._id}`}
                        className="mt-2 flex items-center text-center w-full px-4 py-3 text-sm font-medium text-white bg-[#2f2d3b] rounded-lg hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition justify-center"
                    >
                        Read More
                        <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default VehicleCard
