import React, { useState } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewBook() {
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    async function createNewBook(e) {
        e.preventDefault();

        const data = {
            author,
            launchDate,
            price,
            title,
        };
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            await api.post("/api/book", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            navigate("/books");
        } catch (err) {
            alert("error while registering book, try again!");
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logoImg} alt="logo" />
                    <h1>add new Book</h1>
                    <p>Enter the book information and click on 'add!'</p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251fc5" />
                        Home
                    </Link>
                </section>
                <form onSubmit={createNewBook}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                    />
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        placeholder="Author"
                    />
                    <input
                        value={launchDate}
                        onChange={(e) => setLaunchDate(e.target.value)}
                        type="date"
                    />
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                    />

                    <button className="button" type="submit">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}
