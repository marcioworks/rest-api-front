import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewBook() {
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");

    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");
    const { bookId } = useParams();

    const navigate = useNavigate();

    async function loadBook() {
        try {
            const response = await api.get(`/api/book/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const splittedDate = response.data.launchDate.split("T", 10)[0];
            setId(response.data.id);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setTitle(response.data.title);
            setLaunchDate(splittedDate);
        } catch (error) {
            alert("error recovering book!");
            navigate("/books");
        }
    }
    useEffect(() => {
        if (bookId === "0") return;
        else loadBook();
    }, [bookId]);

    async function saveOrUpdate(e) {
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
            if (bookId === "0") {
                await api.post("/api/book", data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            } else {
                data.id = bookId;
                await api.post("/api/book", data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }
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
                    <h1>{bookId === "0" ? "Add new Book" : "Update Book"}</h1>
                    <p>
                        Enter the book information and click on{" "}
                        {bookId === "0" ? "'Add'" : "'Update'"}!'
                    </p>
                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251fc5" />
                        Return to Books
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
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
                        {bookId === "0" ? "Add" : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
}
