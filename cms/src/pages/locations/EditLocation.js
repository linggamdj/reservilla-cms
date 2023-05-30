import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById, editLocation } from "../../axios/locationAxios";

const EditLocation = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const navigation = useNavigate();
    const params = useParams();
    const { id } = params;

    const getBrand = () => {
        getLocationById(+id, (result) => {
            setForm({
                name: result.location,
            });
        });
    };

    useEffect(() => {
        getBrand();
    }, []);

    const submitHandler = () => {
        editLocation(+id, form);
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
                    Edit Location
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

export default EditLocation;
