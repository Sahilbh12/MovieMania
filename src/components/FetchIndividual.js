import React from 'react'

const FetchIndividual = (props) => {
    let { title, plot, poster, year, imdbRating, trailer } = props;
    return (
        <div className="container">
            <div className="col-md-4">
                <img src={!poster ? "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg" : poster} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{plot}</p>
                    <p className="card-text"><small className="text-body-secondary">{year}</small></p>
                    <p className="card-text"><small className="text-body-secondary">{imdbRating}</small></p>
                    <div class="embed-responsive embed-responsive-4by3">
                        <iframe class="embed-responsive-item" src={trailer}></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FetchIndividual
