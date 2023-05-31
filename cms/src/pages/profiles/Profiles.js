import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { getUserById } from "../../axios/userAxios";
import { APP_URL } from "../../helpers/Constants";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profiles = () => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        setLoading(true);

        getUserById(+id, (result) => {
            setUser({ ...result });
            setLoading(false);
        });

        localStorage.setItem("email", user.email);
        localStorage.setItem("picture", user.profile_picture);
    }, [id, user.email, user.profile_picture]);

    return (
        <>
            <div className="container mt-5 mb-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card border-left-primary p-3 py-4 shadow">
                            <div className="text-center">
                                {isLoading ? (
                                    <ReactLoading
                                        type="bars"
                                        width={50}
                                        color="orange"
                                        className="mx-auto my-auto"
                                    ></ReactLoading>
                                ) : (
                                    <img
                                        src={
                                            user.profile_picture
                                                ? `${APP_URL}${user.profile_picture}`
                                                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                        }
                                        width="100"
                                        className="profile-image rounded-circle"
                                        alt="img"
                                    />
                                )}
                            </div>

                            <div className="text-center mt-3">
                                {isLoading ? (
                                    <Skeleton height={20} width={100} />
                                ) : (
                                    <span
                                        className={`${
                                            user.role === "user"
                                                ? "bg-secondary"
                                                : "main-color"
                                        } p-1 px-4 rounded text-white`}
                                    >
                                        {user.role}
                                    </span>
                                )}

                                <h5 className="mt-2 mb-0">
                                    {isLoading ? (
                                        <Skeleton height={20} width={150} />
                                    ) : (
                                        user.name
                                    )}
                                </h5>
                                <div className="d-flex justify-content-center px-2 mt-2">
                                    {isLoading ? (
                                        <Skeleton height={21} width={40} />
                                    ) : (
                                        <>
                                            <Link to={`/users/${id}/edit`}>
                                                <BsFillGearFill
                                                    className="me-2 text-dark"
                                                    size={20}
                                                ></BsFillGearFill>
                                            </Link>
                                            <Link to={`/users/${id}/password`}>
                                                <RiLockPasswordFill
                                                    className="text-danger"
                                                    size={22}
                                                ></RiLockPasswordFill>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profiles;
