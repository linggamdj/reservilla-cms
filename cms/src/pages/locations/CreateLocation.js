import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLocation } from "../../axios/locationAxios";

const CreateLocation = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const navigation = useNavigate();

    const submitHandler = () => {
        addLocation(form);
        navigation("/locations");
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
                    Add Locations
                </h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value });
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Insert Name"
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="btn btn-dark bg-main border-0 shadow-sm"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateLocation;
