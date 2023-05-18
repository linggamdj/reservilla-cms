import React, { useState, useEffect } from "react";
import EmptyRow from "../../helpers/EmptyRow";
import { getTransactions } from "../../axios/transactionAxios";
import Pagination from "../../components/Pagination";
import { TransactionModal } from "../../components";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        getTransactions((result) => setTransactions(result));
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = transactions.slice(firstPostIndex, lastPostIndex);

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
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((transaction, index) => {
                                    const {
                                        id,
                                        User,
                                        status,
                                        booking_start_date,
                                        booking_end_date,
                                        payment,
                                        payment_via,
                                        Villa,
                                    } = transaction;

                                    const modalProps = {
                                        id: id,
                                        user: User,
                                        bookStart: booking_start_date,
                                        bookEnd: booking_end_date,
                                        payment: payment,
                                        via: payment_via,
                                        villa: Villa,
                                    };

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{id}</td>
                                            <td>{User.name}</td>
                                            <td>
                                                {status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    status.slice(1)}
                                            </td>
                                            <td>
                                                <TransactionModal
                                                    {...modalProps}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow
                                    name={"Transactions"}
                                    col={"10"}
                                ></EmptyRow>
                            )}
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
