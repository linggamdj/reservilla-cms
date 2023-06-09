import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams, useLocation } from "react-router-dom";
import EmptyRow from "../../helpers/EmptyRow";
import { getGalleriesById, deleteGallery } from "../../axios/galleryAxios";
import { APP_URL } from "../../helpers/Constants";
import Pagination from "../../components/Pagination";

const Galleries = () => {
    const [galleries, setGalleries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const params = useParams();
    const { VillaId } = params;

    const location = useLocation();

    useEffect(() => {
        getGalleriesById(VillaId, (result) => setGalleries(result));
    }, [VillaId]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = galleries.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = (id) => {
        deleteGallery(id);
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
                    {location.state.name}'s Galleries
                </h3>
                <Link
                    className="btn btn-dark bg-main border-0 shadow-lg"
                    to={`/villas/${VillaId}/galleries/create`}
                    state={{ name: location.state.name }}
                >
                    Add
                </Link>

                <section className="d-flex justify-content-center">
                    <table
                        className="table table-bordered text-center mt-2 shadow"
                        style={{ borderColor: "#E06F3E" }}
                    >
                        <thead>
                            <tr className="bg-main text-white">
                                <th>No</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((gallery, index) => {
                                    const { id, image_name } = gallery;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {" "}
                                                <img
                                                    src={`${APP_URL}${image_name}`}
                                                    width="300px"
                                                    className="img-thumbnail rounded"
                                                    alt="img"
                                                />
                                            </td>
                                            <td>
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
                                <EmptyRow
                                    name={"Galleries"}
                                    col={"3"}
                                ></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>
            </section>

            <Pagination
                totalPosts={galleries.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};

export default Galleries;
