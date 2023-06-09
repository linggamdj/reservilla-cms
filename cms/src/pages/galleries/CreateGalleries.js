import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addGalleries } from "../../axios/galleryAxios";
import ReactLoading from "react-loading";

const CreateGalleries = () => {
    const location = useLocation();

    const params = useParams();
    const { VillaId } = params;

    const [form, setForm] = useState({
        VillaId: +VillaId,
        "villa-pictures": {},
    });
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigate();

    const submitHandler = () => {
        setLoading(true);
        addGalleries(form).then(() => {
            setLoading(false);

            if (!isLoading) {
                navigation(`/villas/${VillaId}/galleries`, {
                    state: { name: location.state.name },
                });
            }
        });
    };

    useEffect(() => {}, [VillaId, isLoading, location.state.name, navigation]);

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
                            className="add-btn btn btn-dark bg-main border-0 shadow-sm"
                        >
                            {isLoading ? (
                                <ReactLoading
                                    type="bars"
                                    width={30}
                                    className="mx-auto"
                                ></ReactLoading>
                            ) : (
                                "Add"
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateGalleries;
