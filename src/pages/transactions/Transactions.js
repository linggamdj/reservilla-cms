import React, { useState, useEffect } from "react";
import EmptyRow from "../../helpers/EmptyRow";
import { getUsers } from "../../axios/userAxios";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination";
import Select from "react-select";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    let userOptions = [];

    useEffect(() => {
        // getTransactions((result) => setTransactions(result));
        getUsers((result) => setUsers(result));
    }, []);

    users?.map((user) => {
        userOptions.push({
            value: user.id,
            label: user.username,
        });

        return user;
    });

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = transactions.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = () => {};

    return (
        <>
            <section className="container">
                <h3
                    className="my-4 text-center"
                    style={{
                        color: "#5CCBBD",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Transactions
                </h3>
                <div className="d-flex justify-content-between">
                    <div className="md-form mt-0 w-25">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search by Name"
                            aria-label="Search"
                        />
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <table
                        className="table table-bordered text-center mt-2 shadow"
                        style={{ borderColor: "#5CCBBD" }}
                    >
                        <thead>
                            <tr className="bg-main text-white">
                                <th>No</th>
                                <th>Transaction Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            <EmptyRow
                                name={"Transactions"}
                                col={"5"}
                            ></EmptyRow>
                        </tbody>
                    </table>
                </section>

                <Pagination
                    totalPosts={transactions.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </section>
        </>
    );
};

export default Transactions;
