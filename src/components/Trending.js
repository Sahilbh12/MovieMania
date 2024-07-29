import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const Trending = (props) => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total_results, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://api.themoviedb.org/3/movie/${props.category}?language=en-US&page=${page}&api_key=${props.apiKey}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setResults(parsedData.results)
        setTotalResults(parsedData.total_results)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line

    }, [])

    const fetchMoreData = async () => {
        const url = `https://api.themoviedb.org/3/movie/${props.category}?language=en-US&page=${page}&api_key=${props.apiKey}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setResults(results.concat(parsedData.results))
        setTotalResults(parsedData.total_results)
    };


    return (
        <>
            <h1 className='text-center mt-5' style={{ padding: '35px 0px' }}> {props.category === 'now_playing' ? "Trending" : capitalizeFirstLetter(props.category)} Movies</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={results.length !== total_results}
                loader={<Spinner />}
                style={{ height: '100%', margin: '0', overflow: 'hidden' }}
            >
                <div className="container" style={{ height: '100%', overflowY: 'scroll' }}>
                    <div className="row">
                        {results.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <MovieItem
                                    title={element.title ? element.title : ""} description={element.overview ? element.overview : ""} imageUrl={`https://image.tmdb.org/t/p/w500${element.poster_path}`} date={element.release_date} />
                            </div>
                        })
                        }
                    </div>
                </div>
            </InfiniteScroll>


            {/* <div className="container d-flex justify-content-between fixed-bottom">
                    <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}

        </ >
    )

}

Trending.defaultProps = {
    pageSize: 10,
    category: 'now_playing'
}
Trending.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default Trending
