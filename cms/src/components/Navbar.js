import React from "react";
import { logout } from "../axios/userAxios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = (props) => {
    const { loginStatus, loginCbHandler } = props;

    const navigation = useNavigate();

    const logoutHandler = () => {
        logout(loginCbHandler);
        navigation("/users");
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm py-3">
            <div className="container-fluid">
                <ul className="navbar-nav ms-auto">
                    {loginStatus ? (
                        <li className="dropdown">
                            <Link
                                className="nav-link active p-0"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-hover="dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={
                                        localStorage.getItem("picture") !==
                                        "null"
                                            ? `http://localhost:3000/${localStorage.getItem(
                                                  "picture"
                                              )}`
                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                    }
                                    width="42"
                                    className="profile-image rounded-circle"
                                    alt="img"
                                />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end bg-custom">
                                <li className="dropdown-item">
                                    {localStorage.getItem("email")}
                                </li>
                                <hr className="m-1" />
                                <li>
                                    <Link
                                        className="dropdown-item dropdown-custom"
                                        to={`/users/${localStorage.getItem(
                                            "user_id"
                                        )}`}
                                    >
                                        <FaUserAlt
                                            className="me-2 mb-1"
                                            size={15}
                                        ></FaUserAlt>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="red-color dropdown-item dropdown-custom"
                                        onClick={() => logoutHandler()}
                                        to="/"
                                    >
                                        <FiLogOut
                                            className="me-1 mb-1 ms-0"
                                            size={20}
                                        ></FiLogOut>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <Link className="nav-link active" to="/users/login">
                            Login
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
