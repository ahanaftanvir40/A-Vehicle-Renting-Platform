import { Route, Routes } from "react-router-dom"
import { AddVehicles, AdminDashboard, AllVehicles, EditProfile, Home, Login, SignUp, UserDashboard, UserProfile, Vehicle, WheelHub } from "../pages"
import PrivateRoutes from "../utils/PrivateRoutes"
import ChatAI from "../pages/ChatAI"




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
                    <Route path="/chatai" element={<ChatAI />}></Route>
                    <Route path="/WheelHub" element={<WheelHub />}></Route>

                </Route>

                <Route path="/admin" element={<AdminDashboard />}></Route>









            </Routes>


        </div>
    )
}

export default AllRoutes
