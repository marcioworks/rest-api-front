import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");

    async function fetchMoreBooks() {
        const response = await api.get("/api/book", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page: page,
                limit: 4,
                direction: "asc",
            },
        });

        setBooks([...books, ...response.data._embedded.bookVOList]);
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreBooks();
    }, []);
    async function editBook(id) {
        try {
            navigate(`/books/new/${id}`);
        } catch (error) {
            alert("edit failed, try again.");
        }
    }
    async function deleteBook(id) {
        try {
            await api.delete(`/api/book/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setBooks(books.filter((book) => book.id !== id));
        } catch (err) {
            alert("delete failed, try again.");
        }
    }

    function logout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="book-container">
            <header>
                <img src={logoImg} alt="erudio" />
                <span>
                    Welcome <strong> {username.toUpperCase}</strong>!
                </span>
                <Link className="button" to="/books/new/0">
                    Add New Book
                </Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
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

                        <button onClick={() => editBook(book.id)} type="button">
                            <FiEdit size={20} color="#251fc5" />
                        </button>

                        <button
                            onClick={() => deleteBook(book.id)}
                            type="button"
                        >
                            <FiTrash2 size={20} color="#251fc5" />
                        </button>
                    </li>
                ))}
            </ul>
            <button className="button" onClick={fetchMoreBooks} type="button">
                Load More
            </button>
        </div>
    );
}
