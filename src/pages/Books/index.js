import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

export default function Books() {
    const [books, setBooks] = useState([]);

    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        api.get("/api/book", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            setBooks(response.data._embedded.bookVOList);
        });
    }, []);

    return (
        <div className="book-container">
            <header>
                <img src={logoImg} alt="erudio" />
                <span>
                    Welcome <strong> {username.toUpperCase}</strong>!
                </span>
                <Link className="button" to="/books/new">
                    Add New Book
                </Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map((book) => (
                    <li>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(book.price)}
                        </p>
                        <strong>Release date:</strong>
                        <p>
                            {Intl.DateTimeFormat("pt-BR").format(
                                new Date(book.launchDate)
                            )}
                        </p>

                        <button type="button">
                            <FiEdit size={20} color="#251fc5" />
                        </button>

                        <button type="button">
                            <FiTrash2 size={20} color="#251fc5" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
