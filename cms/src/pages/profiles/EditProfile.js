import React, { useState, useEffect } from "react";
import { getUserById, editUser } from "../../axios/userAxios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const [form, setForm] = useState({
        email: "",
        phone: "",
        name: "",
        "profile-picture": "",
    });

    const params = useParams();
    const { id } = params;

    const navigation = useNavigate();

    useEffect(() => {
        getUserById(+id, (result) => {
            setForm({
                email: result.email,
                phone: result.phone,
                name: result.name,
                password: result.password,
                "profile-picture": result.profile_picture,
            });
        });
    }, [id]);

    const submitHandler = () => {
        editUser(+id, form);
        navigation(`/users/${id}`);
    };

    return (
        <>
            <section className="text-center">
                <h3
                    className="my-4 fw-semibold"
                    style={{
                        color: "#4C9FC1",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Edit Profile
                </h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            value={form.name}
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value });
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Insert Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>E-mail</label>
                        <input
                            value={form.email}
                            onChange={(e) => {
                                setForm({ ...form, email: e.target.value });
                            }}
                            type="email"
                            className="form-control"
                            placeholder="Insert E-mail"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        <input
                            value={form.phone}
                            onChange={(e) => {
                                setForm({ ...form, phone: e.target.value });
                            }}
                            type="email"
                            className="form-control"
                            placeholder="Insert Phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Profile Image</label>
                        <input
                            placeholder={form.profile_picture}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    "profile-picture": e.target.files[0],
                                });
                            }}
                            type="file"
                            className="form-control"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="btn btn-dark bg-main border-0 shadow-sm"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditProfile;
