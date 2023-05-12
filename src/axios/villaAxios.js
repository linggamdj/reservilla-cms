import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/villas`;

const getVillas = async (cb) => {
    try {
        let villas = await axios({
            method: "GET",
            url: `${URL}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(villas.data.data);
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

const getVillaById = async (id, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/${id}`,
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

const searchVilla = async (query, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/search/${query}`,
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

const addVilla = async (villa) => {
    try {
        await axios({
            method: "POST",
            url: `${URL}/add`,
            data: villa,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        }).then(Swal.fire("Add Villa", "Villa has been added", "success"));
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

const editVilla = async (id, villa) => {
    try {
        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: villa,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        }).then(Swal.fire("Edit Villa ", "Villa has been updated", "success"));
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

const deleteVilla = async (id) => {
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
                    "Villa has been deleted.",
                    "success"
                ).then((result) => {
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
    getVillas,
    getVillaById,
    searchVilla,
    addVilla,
    editVilla,
    deleteVilla,
};
