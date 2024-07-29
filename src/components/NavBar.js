import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const NavBar = () => {
    const [progress, setProgress] = useState(0);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedQuery = encodeURIComponent(query).replace(/%20/g, '+');
        navigate(`/result?query=${formattedQuery}`);
        window.location.reload(true);
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MovieMania</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upcoming">Upcoming</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/popular">Popular</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/top-rated">Top rated</Link>
                            </li>
                        </ul>
                    </div>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input className="form-control me-2" type="text" name="name" placeholder="Search for movie/series" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} required />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <LoadingBar
                height={3}
                color='#f11946'
                progress={progress}
            />
        </div>

    )
}
export default NavBar