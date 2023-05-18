import React, { useState } from "react";
import ReactModal from "react-modal";
import DateFormat from "../helpers/DateFormat";

const TransactionModal = (props) => {
    const { id, user, bookStart, bookEnd, payment, via, villa } = props;
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
                    <h2 className="text-center mb-4">{id}'s Detail</h2>
                    <div className="d-flex row px-4">
                        <div className="card me-auto" style={{ width: "49%" }}>
                            <div className="card-body">
                                <h5 className="card-title">User</h5>
                                <div className="card-text">{user.name}</div>
                                <div className="card-text">{user.phone}</div>
                                <div className="card-text">{user.email}</div>
                            </div>
                        </div>

                        <div className="card ms-auto" style={{ width: "49%" }}>
                            <div className="card-body">
                                <h5 className="card-title">Payment</h5>
                                <div className="card-text">
                                    {via.toUpperCase()}
                                </div>
                                <div className="card-text">
                                    {payment.va_numbers[0].va_number}
                                </div>
                                <div className="card-text">
                                    <DateFormat
                                        date={payment.transaction_time}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mx-auto mt-3" style={{ width: "97%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Villa</h5>
                            <div className="card-text">{villa.name}</div>
                            <div className="card-text">+6{villa.phone}</div>
                            <div className="card-text">
                                {bookStart} - {bookEnd}
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        </>
    );
};

export default TransactionModal;
