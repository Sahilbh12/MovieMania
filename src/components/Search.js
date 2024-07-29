import React, { useState, useEffect } from 'react'
import Spinner from './Spinner';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const apiKeySearch = process.env.REACT_APP_SEARCH_API
    const apiKeyYoutube = process.env.REACT_APP_YOUTUBE_API
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const getQueryParams = (queryString) => {
        return new URLSearchParams(queryString);
    };

    const fetchMovie = async (searchUrl) => {
        // props.setProgress(10);
        const url = searchUrl;
        setLoading(true);
        let data = await fetch(url);
        // props.setProgress(30);
        let parsedData = await data.json();

        document.getElementById("poster").innerHTML = `<img src="${parsedData.Poster}" className="img-fluid rounded-start" alt="..." />`;
        document.getElementById("title").innerHTML = "Name: " + parsedData.Title;
        document.getElementById("plot").innerHTML = "<b>Plot</b>  : " + parsedData.Plot;
        document.getElementById("genre").innerHTML = "<b>Gener</b> : " + parsedData.Genre;
        document.getElementById("released").innerHTML = "<b>Released date</b> : " + parsedData.Released;
        document.getElementById("imdb").innerHTML = "<b>imdbRating</b> : " + parsedData.imdbRating;

        setLoading(false)
        // props.setProgress(100);
    }

    const videoSearch = async (key, search, maxResults) => {
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video&q=${search}trailer&maxResults=${maxResults}`;
        let data = await fetch(ytUrl);
        let parsedData = await data.json();
        // alert(parsedData.items[0].id.videoId);
        document.getElementById("trailer").innerHTML = `<iframe width="420" height="315" class="embed-responsive-item" src="http://www.youtube.com/embed/${parsedData.items[0].id.videoId}" frameborder="0" allowfullscreen></iframe>`
    }

    useEffect(() => {
        // eslint-disable-next-line
        const queryParams = getQueryParams(location.search);
        const query = queryParams.get('query');
        if (query) {
            fetchMovie(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKeySearch}`);
            videoSearch(apiKeyYoutube, encodeURIComponent(query), 1);
        }

    }, [])

    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div>
                <NavBar />
            </div>
            {loading && <Spinner />}
            <div className="container mt-5" style={{ paddingTop: "100px" }}>
                <div className="card mb-3" style={{ maxWidth: "900px" }}>
                    <div className="row g-0">
                        <div className="col-md-4" id='poster'>
                            <img src="..." className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title" id='title'></h3>
                                <p className="card-text" id='plot'></p>
                                <p className="card-text" id='genre'></p>
                                <p className="card-text" id='released'><small className="text-body-secondary"></small></p>
                                <p className="card-text" id='imdb'><small className="text-body-secondary"></small></p>
                                <p className="card-text" ><b className="text-body-secondary">Watch trailer below👇</b></p>
                            </div>
                            <div class="embed-responsive embed-responsive-4by3" id='trailer' style={{ marginLeft: "10px" }}>
                                {/* <iframe class="embed-responsive-item" src=""></iframe> */}
                                <iframe width="300" height="215" class="embed-responsive-item" src="http://www.youtube.com/embed/Tn6-PIqc4UM" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Search