import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getVillaById, editVilla } from "../../axios/villaAxios";
import { getLocations } from "../../axios/locationAxios";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditVilla = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        map_url: "",
        phone: "",
        bedroom: 0,
        bathroom: 0,
        swimming_pool: false,
        LocationId: "",
    });
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigate();
    const params = useParams();
    const { id } = params;

    let [locations, setLocations] = useState();

    let locationOptions = [];

    let swimmingOptions = [
        { value: true, label: "Available" },
        { value: false, label: "Unavailable" },
    ];

    useEffect(() => {
        setLoading(true);
        getLocations((result) => setLocations(result));
        getVillaById(+id, (result) => {
            setForm({
                name: result.name,
                description: result.description,
                price: result.price,
                map_url: result.map_url,
                phone: result.phone,
                bedroom: result.bedroom,
                bathroom: result.bathroom,
                swimming_pool: result.swimming_pool,
                LocationId: result.LocationId,
            });
            setLoading(false);
        });
    }, []);

    locations?.map((location) => {
        locationOptions.push({
            value: location.id,
            label: location.name,
        });

        return location;
    });

    const submitHandler = () => {
        setLoading(true);
        editVilla(+id, form).then(() => {
            setLoading(false);
            if (!isLoading) {
                navigation("/villas");
            }
        });
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
                    Edit Villa
                </h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Name</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
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
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        {isLoading ? (
                            <Skeleton height={58}></Skeleton>
                        ) : (
                            <textarea
                                value={form.description}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    });
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Insert Description"
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Location</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <Select
                                placeholder={"Don't Re-select"}
                                options={locationOptions}
                                onChange={(e) => {
                                    setForm({ ...form, LocationId: +e.value });
                                }}
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Price</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <input
                                value={form.price}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        price: +e.target.value,
                                    });
                                }}
                                type="number"
                                className="form-control"
                                placeholder="Insert Price"
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Map URL</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <input
                                value={form.map_url}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        map_url: e.target.value,
                                    });
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Insert Map URL"
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <input
                                value={+form.phone}
                                onChange={(e) => {
                                    setForm({ ...form, phone: e.target.value });
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Insert Phone"
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Swimming Pool</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <Select
                                placeholder={"Don't Re-select"}
                                options={swimmingOptions}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        swimming_pool: +e.value,
                                    });
                                }}
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Bedroom</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <input
                                value={form.bedroom}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        bedroom: +e.target.value,
                                    });
                                }}
                                type="number"
                                className="form-control"
                                placeholder="Insert Bedroom"
                                required
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label>Bathroom</label>
                        {isLoading ? (
                            <Skeleton height={34}></Skeleton>
                        ) : (
                            <input
                                value={form.bathroom}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        bathroom: +e.target.value,
                                    });
                                }}
                                type="number"
                                className="form-control"
                                placeholder="Insert Bathroom"
                                required
                            />
                        )}
                    </div>
                    <div className="my-4 text-center">
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

export default EditVilla;
