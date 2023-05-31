import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../axios/userAxios";
import ReactLoading from "react-loading";

const ChangePassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setLoading] = useState(false);

    const params = useParams();
    const { id } = params;

    const navigation = useNavigate();

    const submitHandler = () => {
        setLoading(true);
        if (!(form.password && form.confirmPassword)) {
            setLoading(false);
            return;
        } else {
            editUser(+id, form).then(() => {
                setLoading(false);

                if (!isLoading) {
                    navigation(`/users/${id}`);
                }
            });
        }
    };

    return (
        <>
            <section className="text-center">
                <h3
                    className="my-4 fw-semibold"
                    style={{
                        color: "#E06F3E",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Change Password
                </h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            onChange={(e) => {
                                setForm({ ...form, password: e.target.value });
                            }}
                            type="password"
                            className="form-control"
                            placeholder="Insert Password"
                            required
                        />
                    </div>{" "}
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                });
                            }}
                            type="password"
                            className="form-control"
                            placeholder="Insert Confirm Password"
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="update-btn btn btn-dark bg-main border-0 shadow-sm"
                        >
                            {isLoading ? (
                                <ReactLoading
                                    type="bars"
                                    width={30}
                                    className="mx-auto"
                                ></ReactLoading>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;
