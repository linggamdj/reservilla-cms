import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    Dashboard,
    Transactions,
    Villas,
    CreateVilla,
    EditVilla,
    Locations,
    CreateLocation,
    EditLocation,
    Users,
    Profiles,
    EditProfile,
    ChangePassword,
    NotFound,
} from "../pages";

const MainContent = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="" element={<Dashboard></Dashboard>}></Route>
                <Route path="villas/" element={<Villas></Villas>}></Route>
                <Route
                    path="villas/create"
                    element={<CreateVilla></CreateVilla>}
                ></Route>
                <Route path="villas/edit">
                    <Route path=":id" element={<EditVilla></EditVilla>}></Route>
                </Route>
                <Route
                    path="locations"
                    element={<Locations></Locations>}
                ></Route>
                <Route
                    path="locations/create"
                    element={<CreateLocation></CreateLocation>}
                ></Route>
                <Route path="locations/edit">
                    <Route
                        path=":id"
                        element={<EditLocation></EditLocation>}
                    ></Route>
                </Route>
                <Route path="users/" element={<Users></Users>}></Route>
                <Route path="users/">
                    <Route path=":id" element={<Profiles></Profiles>}></Route>
                    <Route
                        path=":id/edit"
                        element={<EditProfile></EditProfile>}
                    ></Route>
                    <Route
                        path=":id/password"
                        element={<ChangePassword></ChangePassword>}
                    ></Route>
                </Route>
                <Route
                    path="transactions/"
                    element={<Transactions></Transactions>}
                >
                    <Route
                        path=":id"
                        element={<Transactions></Transactions>}
                    ></Route>
                </Route>

                <Route path="*" element={<NotFound></NotFound>} />
            </Routes>
        </div>
    );
};

export default MainContent;
