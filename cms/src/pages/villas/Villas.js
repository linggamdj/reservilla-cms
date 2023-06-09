import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcGallery } from "react-icons/fc";
import { getVillas, searchVilla, deleteVilla } from "../../axios/villaAxios";
import EmptyRow from "../../helpers/EmptyRow";
import Pagination from "../../components/Pagination";
import MoneyFormat from "../../helpers/MoneyFormat";

const Villas = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        query.length !== 0
            ? searchVilla(query, (result) => {
                  setItems(result);
                  setLoading(false);
              })
            : getVillas((result) => {
                  setItems(result);
                  setLoading(false);
              });
    }, [query]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = items.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = (id) => {
        deleteVilla(id);
    };

    return (
        <>
            <section className="container">
                <h3
                    className="my-4 text-center"
                    style={{
                        color: "#E06F3E",
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    Villas
                </h3>
                <div className="d-flex justify-content-between">
                    <Link
                        className="btn btn-dark bg-main border-0 shadow-lg"
                        to={`/villas/create`}
                    >
                        Add
                    </Link>

                    <div className="md-form mt-0">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search by Name"
                            aria-label="Search"
                            onChange={(e) => {
                                e.target.value.length !== 0
                                    ? setQuery(e.target.value)
                                    : setQuery("");
                            }}
                        />
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <table
                        className="table table-bordered text-center mt-2 shadow"
                        style={{ borderColor: "#E06F3E" }}
                    >
                        <thead className="align-middle">
                            <tr className="bg-main text-white">
                                <th>No</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Total Galleries</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {!isLoading ? (
                                currentPosts.map((item, index) => {
                                    const {
                                        id,
                                        name,
                                        price,
                                        Location,
                                        VillaGalleries,
                                        averageRating,
                                    } = item;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{name}</td>
                                            <td>{Location.name}</td>
                                            <td>
                                                <MoneyFormat
                                                    price={price}
                                                ></MoneyFormat>
                                            </td>
                                            <td>{VillaGalleries.length}</td>
                                            <td>
                                                {averageRating
                                                    ? averageRating
                                                    : "No Review Yet"}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/villas/${id}/galleries`}
                                                    state={{ name }}
                                                >
                                                    <FcGallery className="green-color me-2"></FcGallery>
                                                </Link>
                                                <Link to={`/villas/edit/${id}`}>
                                                    <AiFillEdit className="dark-color me-2"></AiFillEdit>
                                                </Link>
                                                <button
                                                    className="btn p-0 mb-1"
                                                    onClick={() =>
                                                        deleteHandler(+id)
                                                    }
                                                >
                                                    <AiFillDelete className="red-color"></AiFillDelete>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow name={"Villas"} col={"11"}></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>

                <Pagination
                    totalPosts={items.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </section>
        </>
    );
};

export default Villas;
