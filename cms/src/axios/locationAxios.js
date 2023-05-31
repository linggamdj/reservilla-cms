import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/locations`;
let isLoading = false;

const getLocations = async (cb) => {
    try {
        const result = await axios({
            method: "GET",
            url: URL,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(result.data.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const getLocationById = async (id, cb) => {
    try {
        const result = await axios({
            method: "GET",
            url: `${URL}/${id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(result.data.data[0]);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const addLocation = async (location) => {
    try {
        await axios({
            method: "POST",
            url: `${URL}/add`,
            data: location,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        Swal.fire("Add Location", "Location has been added.", "success");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const editLocation = async (id, location) => {
    try {
        isLoading = true;
        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: location,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        }).then(() => {
            isLoading = false;
            if (!isLoading) {
                Swal.fire(
                    "Edit Location ",
                    "Location has been updated",
                    "success"
                );
            }
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const deleteLocation = async (id) => {
    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "DELETE",
                    url: `${URL}/delete/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                });

                Swal.fire(
                    "Deleted!",
                    "Location has been deleted.",
                    "success"
                ).then(async (result) => {
                    if (result.isConfirmed) window.location.reload();
                });
            }
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

export {
    getLocations,
    getLocationById,
    addLocation,
    editLocation,
    deleteLocation,
};
