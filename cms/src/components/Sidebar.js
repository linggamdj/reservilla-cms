import React from "react";
import { Link } from "react-router-dom";
import { GoDashboard } from "react-icons/go";
import { MdOutlineVilla, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import logo from "../assets/side-logo.png";

const Sidebar = (props) => {
    return (
        <>
            <div className="sidebar text-white shadow">
                <div className="header text-center">
                    <div className="list-item inline-block">
                        <Link className="navbar-brand h1" to="/">
                            {/* <h4 className="mb-1">Villa CMS</h4> */}
                            <img
                                src={logo}
                                className="custom-image-side mb-1"
                                alt="#"
                            />
                        </Link>
                    </div>
                </div>

                <hr className="border border-white" />

                <div className="main text-white">
                    <div className="list-item">
                        <Link className="nav-link active" to="/">
                            <GoDashboard
                                className="me-2 pb-1"
                                size={25}
                            ></GoDashboard>
                            Dashboard
                        </Link>
                    </div>
                    <div className="list-item">
                        <Link className="nav-link active" to="/villas">
                            <MdOutlineVilla
                                className="me-2 pb-1"
                                size={25}
                            ></MdOutlineVilla>
                            Villas
                        </Link>
                    </div>
                    <div className="list-item">
                        <Link className="nav-link active" to="/locations">
                            <MdOutlineLocationOn
                                className="me-2 pb-1"
                                size={25}
                            ></MdOutlineLocationOn>
                            Locations
                        </Link>
                    </div>
                    <div className="list-item">
                        <Link className="nav-link active" to="/transactions">
                            <AiOutlineTransaction
                                className="me-2 pb-1"
                                size={25}
                            ></AiOutlineTransaction>
                            Transactions
                        </Link>
                    </div>
                    <div className="list-item">
                        <Link className="nav-link active" to="/users">
                            <FiUsers className="me-2 pb-1" size={25}></FiUsers>
                            Users
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
