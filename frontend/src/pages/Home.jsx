import Hero from "../components/Hero";
import rent from "../assets/rent.jpg";
import listcar from "../assets/listcar.jpg";
import driver from "../assets/driver.jpg";
import addcar from "../assets/addcar.png";
import rentcar from "../assets/rentcar.png";
import hiredriver from "../assets/hiredriver.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen mx-auto p-4">
      <div className="flex justify-center mt-5 sm:mt-14">
        <Hero />
      </div>
      <div className="flex flex-wrap gap-4 mt-4 sm:mt-0 justify-center text-white px-4">
        <div className="card image-full w-full max-w-xs sm:max-w-sm lg:w-96 shadow-xl">
          <figure>
            <img src={rent} alt="rent" className="object-cover h-full w-full" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Rent A Car!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <Link
                to="/vehicles"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Rent Now
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="card image-full w-full max-w-xs sm:max-w-sm lg:w-96 shadow-xl">
          <figure>
            <img
              src={listcar}
              alt="listcar"
              className="object-cover h-full w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">List Your Vehicle!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <Link
                to="/addvehicles"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                List Now
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="card image-full w-full max-w-xs sm:max-w-sm lg:w-96 shadow-xl">
          <figure>
            <img
              src={driver}
              alt="driver"
              className="object-cover h-full w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Hire A Driver!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Hire Now
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 sm:mt-16 border-cyan-900 max-w-screen-2xl mx-auto items-center">
        <h1 className="text-2xl text-[#cfcad1] dark:text-slate-200 font-extrabold">
          How It <span className="text-cyan-500">Works</span>
        </h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-5 sm:mt-14 ">
        <div className="text-center max-w-sm">
          <img
            className="m-auto max-w-20 max-h-20"
            src={rentcar}
            alt="Rent Car"
          />
          <h1 className="text-xl text-[#cfcad1] dark:text-white/90 font-semibold mt-4">
            Rent A Vehicle
          </h1>
          <p className="text-sm font-medium text-gray-300 mt-2">
            Select a date and wait for the approval.
          </p>
        </div>
        <div className="text-center max-w-sm ">
          <img
            className="m-auto max-w-20 max-h-20"
            src={addcar}
            alt="Add Car"
          />
          <h1 className="text-xl text-[#cfcad1] dark:text-white/90 font-semibold mt-4">
            Add Your Vehicle
          </h1>
          <p className="text-sm font-medium text-gray-300 mt-2">
            Give necessary details and list it for rent.
          </p>
        </div>
        <div className="text-center max-w-sm">
          <img
            className="m-auto max-w-20 max-h-20"
            src={hiredriver}
            alt="Hire Driver"
          />
          <h1 className="text-xl text-[#cfcad1] dark:text-white/90 font-semibold mt-4">
            Hire A Driver
          </h1>
          <p className="text-sm font-medium text-gray-300 mt-2">
            Just need a driver? Select a driver and select the date.
          </p>
        </div>
      </div>
      {/* Fixed Chat Button */}
      <Link
        to="/chatai"
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Chat with AI
        <svg
          className="w-5 h-5 inline ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 17h8m0 0v8m0-8l-8-8m8 8L9 3m0 0v8m0-8H1"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Home;
