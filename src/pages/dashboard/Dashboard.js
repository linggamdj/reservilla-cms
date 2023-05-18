import React, { useState, useEffect } from "react";
import { getVillas } from "../../axios/villaAxios";
import { getTransactions } from "../../axios/transactionAxios";
import { MdOutlineVilla, MdDownloadDone } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getVillas((result) => setItems(result));
        getTransactions((result) => setTransactions(result));
    }, []);

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between my-4">
                <h1
                    className="h3 mb-0"
                    style={{
                        color: "#5CCBBD",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Dashboard
                </h1>
            </div>

            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="fw-bold green-color text-uppercase mb-1">
                                        <MdOutlineVilla
                                            size={20}
                                            className="mb-1 me-2"
                                        ></MdOutlineVilla>
                                        Villas
                                    </div>
                                    <div className="h5 mb-0 text-secondary">
                                        {items.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="fw-bold text-success text-uppercase mb-1">
                                        <AiOutlineTransaction
                                            size={20}
                                            className="mb-1 me-2"
                                        ></AiOutlineTransaction>
                                        Transactions
                                    </div>
                                    <div className="h5 mb-0 text-secondary">
                                        {transactions.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="fw-bold text-warning text-uppercase mb-1">
                                        <GiProgression
                                            size={20}
                                            className="mb-1 me-2"
                                        ></GiProgression>
                                        On Progress
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 text-secondary">
                                                {
                                                    transactions.filter(
                                                        (transaction) =>
                                                            transaction.status ===
                                                            "pending"
                                                    ).length
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="fw-bold text-info text-uppercase mb-1">
                                        <MdDownloadDone
                                            size={20}
                                            className="mb-1 me-2"
                                        ></MdDownloadDone>
                                        Success
                                    </div>
                                    <div className="h5 mb-0 text-secondary">
                                        {
                                            transactions.filter(
                                                (transaction) =>
                                                    transaction.status !==
                                                    "pending"
                                            ).length
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
