import axios from "axios";
import Swal from "sweetalert2";
import FormData from "form-data";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/villaGaleries`;

const getGalleriesById = async (id, cb) => {
    try {
        const result = await axios({
            method: "GET",
            url: `${URL}/villas/${id}`,
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

const addGalleries = async (galleries) => {
    let data = new FormData();

    data.append("VillaId", galleries.VillaId);

    for (let i = 0; i < galleries["villa-pictures"].length; i++) {
        data.append(`villa-pictures`, galleries["villa-pictures"][i]);
    }

    console.log(data);

    try {
        await axios({
            method: "POST",
            url: `${URL}/add`,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem("access_token"),
            },
        });

        Swal.fire("Add Galleries", "Galleries has been added.", "success");
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

const deleteGallery = async (id) => {
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
                    "Galleries has been deleted.",
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

export { getGalleriesById, addGalleries, deleteGallery };
