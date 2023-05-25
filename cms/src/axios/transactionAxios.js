import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/bookings`;

const getTransactions = async (cb) => {
    try {
        const result = await axios({
            method: "GET",
            url: `${URL}`,
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

export { getTransactions };
