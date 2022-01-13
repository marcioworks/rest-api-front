import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";

export default function Books() {
    return (
        <div className="book-container">
            <header>
                <img src={logoImg} alt="erudio" />
                <span>
                    Welcome <strong> Marcio</strong>!
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
                <li>
                    <strong>Title:</strong>
                    <p>Docker Dipe Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251fc5" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#251fc5" />
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Dipe Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251fc5" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#251fc5" />
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Dipe Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251fc5" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#251fc5" />
                    </button>
                </li>
                <li>
                    <strong>Title:</strong>
                    <p>Docker Dipe Dive</p>
                    <strong>Author:</strong>
                    <p>Nigel poulton</p>
                    <strong>Price:</strong>
                    <p>R$ 47,90</p>
                    <strong>Release date:</strong>
                    <p>12/07/2017</p>

                    <button type="button">
                        <FiEdit size={20} color="#251fc5" />
                    </button>

                    <button type="button">
                        <FiTrash2 size={20} color="#251fc5" />
                    </button>
                </li>
            </ul>
        </div>
    );
}
