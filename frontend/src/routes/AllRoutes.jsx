import { Route, Routes } from "react-router-dom"
import { EditProfile, Home, Login, SignUp, UserProfile, } from "../pages"
import PrivateRoutes from "../utils/PrivateRoutes"





function AllRoutes() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/profile" element={<UserProfile />}></Route>
                    <Route path="/editprofile" element={<EditProfile />}></Route>
                </Route>
            </Routes>
        </div>
    )
}

export default AllRoutes
