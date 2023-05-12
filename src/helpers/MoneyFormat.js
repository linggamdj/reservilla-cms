import React from "react";

const MoneyFormat = (props) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(props.price);
};

export default MoneyFormat;
