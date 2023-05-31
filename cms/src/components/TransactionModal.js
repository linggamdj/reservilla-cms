import React, { useState } from "react";
import ReactModal from "react-modal";
import DateFormat from "../helpers/DateFormat";
import MoneyFormat from "../helpers/MoneyFormat";

const TransactionModal = (props) => {
    const { id, user, price, bookStart, bookEnd, payment, via, villa } = props;
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            position: "absolute",
            top: "45%",
            left: "56%",
            transform: "translate(-50%, -50%)",
        },
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div>
                <button
                    className="btn text-white main-color"
                    onClick={openModal}
                >
                    Detail
                </button>
                <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <h2 className="text-center mb-4 green-color">
                        {id}'s Detail
                    </h2>
                    <div className="d-flex row mx-auto px-4 text-secondary">
                        <div className="card me-auto" style={{ width: "49%" }}>
                            <div className="card-body">
                                <h5 className="card-title">User</h5>
                                <div className="card-text">{user.name}</div>
                                <div className="card-text">+62{user.phone}</div>
                                <div className="card-text">{user.email}</div>
                            </div>
                        </div>

                        <div className="card ms-auto" style={{ width: "49%" }}>
                            <div className="card-body">
                                <h5 className="card-title">Villa</h5>
                                <div className="card-text">{villa.name}</div>
                                <div className="card-text">+6{villa.phone}</div>
                                <div className="card-text">
                                    From {bookStart.split("-").join("/")} to{" "}
                                    {bookEnd.split("-").join("/")}
                                </div>
                            </div>
                        </div>

                        <div
                            className="card me-auto mt-3"
                            style={{ width: "49%" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Payment</h5>
                                <div className="card-text">
                                    {via.toUpperCase()}
                                </div>
                                <div className="card-text">
                                    {via === "permata"
                                        ? payment.permata_va_number
                                        : payment.va_numbers[0].va_number}
                                </div>
                                <div className="card-text">
                                    <MoneyFormat price={price} />
                                </div>
                            </div>
                        </div>

                        <div
                            className="card ms-auto mt-3"
                            style={{ width: "49%" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Status</h5>
                                <div className="card-text">
                                    {payment.transaction_status
                                        .charAt(0)
                                        .toUpperCase() +
                                        payment.transaction_status.slice(1)}
                                </div>
                                <div className="card-text">
                                    Transaction on
                                    <span> </span>
                                    <DateFormat
                                        date={`${payment.transaction_time
                                            .substring(0, 10)
                                            .split("-")
                                            .join(
                                                "/"
                                            )} at ${payment.transaction_time.substring(
                                            11,
                                            payment.transaction_time.length - 3
                                        )}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        </>
    );
};

export default TransactionModal;
