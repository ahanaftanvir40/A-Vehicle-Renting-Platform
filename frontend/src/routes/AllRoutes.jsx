import { Route, Routes } from "react-router-dom"
import { AddVehicles, AllVehicles, EditProfile, Home, Login, SignUp, UserDashboard, UserProfile, Vehicle } from "../pages"
import PrivateRoutes from "../utils/PrivateRoutes"





function AllRoutes() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/vehicles" element={<AllVehicles />}></Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/profile" element={<UserProfile />}></Route>
                    <Route path="/editprofile" element={<EditProfile />}></Route>
                    <Route path="/addvehicles" element={<AddVehicles />}></Route>
                    <Route path="/vehicles/:vehicleId" element={<Vehicle />}></Route>
                    <Route path="/userdashboard" element={<UserDashboard />}></Route>

                </Route>










            </Routes>


        </div>
    )
}

export default AllRoutes
