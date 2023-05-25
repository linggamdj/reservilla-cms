import React, { useState, useEffect } from "react";
import Select from "react-select";
import EmptyRow from "../../helpers/EmptyRow";
import { searchUser, getUsers } from "../../axios/userAxios";
import Pagination from "../../components/Pagination";

const Users = () => {
    const userId = localStorage.getItem("user_id");
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        query.length !== 0
            ? searchUser(query, (result) => setUsers(result))
            : getUsers((result) => setUsers(result));
    }, [query]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

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
                    Users
                </h3>
                <div className="d-flex justify-content-between">
                    <div className="md-form mt-0 w-25">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search by Name or E-mail"
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
                        <thead>
                            <tr className="bg-main text-white">
                                <th>No</th>
                                <th>E-Mail</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((user, index) => {
                                    const { id, email, name, phone, role } =
                                        user;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{email}</td>
                                            <td>{name}</td>
                                            <td>0{phone}</td>
                                            <td>{role}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow name={"Users"} col={"5"}></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>
            </section>

            <Pagination
                totalPosts={users.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};

export default Users;
