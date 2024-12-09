import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      <section className="relative bg-center bg-cover bg-[url('./assets/hero2.png')] rounded-md w-full h-[350px] sm:h-[500px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <div className="relative h-full flex flex-col justify-between">
          <div className="text-center pt-3 sm:pt-8 md:pt-8 lg:pt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold">
              Welcome to{" "}
              <span className=" bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 dark:text-transparent dark:bg-gradient-to-b dark:from-amber-300 dark:to-amber-700">
                WheelZOnRent
              </span>
            </h1>
            <p className="mb-2 mt-3 sm:mt-4 md:mt-5 lg:mt-5 text-sm sm:text-sm md:text-xl lg:text-xl font-normal text-[#cfcad1] dark:text-slate-200 drop-shadow-lg">
              Discover the perfect ride for your journey with comfort.
            </p>
          </div>
          <div className="flex flex-col items-center px-4 mx-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl text-center mb-5 md:mb-10 lg:mb-10">
            <Link
              to="/vehicles"
              className="mb-1 inline-flex justify-center items-center py-3 px-6 text-base sm:text-lg md:text-lg lg:text-lg font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition ease-in-out duration-300"
            >
              Explore Vehicles
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
      </section>
    </div>
  );
}

export default Hero;
