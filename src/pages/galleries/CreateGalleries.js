import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addGalleries } from "../../axios/galleryAxios";

const CreateGalleries = () => {
    const location = useLocation();

    const params = useParams();
    const { VillaId } = params;

    const [form, setForm] = useState({
        VillaId: +VillaId,
        "villa-pictures": {},
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigate();

    const submitHandler = () => {
        addGalleries(form);
        setIsLoading(true);
    };

    useEffect(() => {
        if (isLoading) {
            navigation(`/villas/${VillaId}/galleries`, {
                state: { name: location.state.name },
            });
        }
    }, [VillaId, isLoading, location.state.name, navigation]);

    return (
        <>
            <section className="text-center">
                <h3
                    className="my-4 fw-semibold"
                    style={{
                        color: "#5CCBBD",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Add Galleries
                </h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Pictures</label>
                        <input
                            placeholder="Select Pictures"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    "villa-pictures": e.target.files,
                                });
                            }}
                            type="file"
                            className="form-control"
                            multiple
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

export default CreateGalleries;
