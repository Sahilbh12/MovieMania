import React from 'react';

const MovieItem = (props) => {
    let { title, description, imageUrl, date } = props;
    return (
        <div className='my-3'>
            <div className="card" style={{ cursor: "pointer" }} >
                <img src={!imageUrl ? "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><b>Plot: </b>{description}</p>
                    <p classNme="card-text"><b>Released at: </b> {date}</p>
                </div>
            </div>

        </div >
    )
}

export default MovieItem
