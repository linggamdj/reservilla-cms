import React from "react";

const EmptyRow = (props) => {
    return (
        <tr>
            <td
                className="text-center fw-semibold green-color"
                colSpan={props.col}
            >
                {props.name} are empty! Insert some data.
            </td>
        </tr>
    );
};

export default EmptyRow;
