import './App.css';

import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import Trending from './components/Trending';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Search from './components/Search';

const App = (props) => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_MOVIES_API
  const [progress, setProgress] = useState(0);
  // const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([]);


  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<Trending setProgress={setProgress} apiKey={apiKey} key="now_playing" pageSize={pageSize} category="now_playing" />}></Route>
          <Route exact path="/upcoming" element={<Trending setProgress={setProgress} apiKey={apiKey} key="upcoming" pageSize={pageSize} category="upcoming" />}></Route>
          <Route exact path="/popular" element={<Trending setProgress={setProgress} apiKey={apiKey} key="popular" pageSize={pageSize} category="popular" />}></Route>
          <Route exact path="/top-rated" element={<Trending setProgress={setProgress} apiKey={apiKey} key="top_rated" pageSize={pageSize} category="top_rated" />}></Route>
          <Route exact path="/result" element={<Search setProgress={setProgress} />}></Route>
          {/* <Route exact path="/buisness" element={<News setProgress={setProgress} apiKey={apiKey} key="buisness" pageSize={pageSize} category="buisness" />}></Route> */}
          {/* {results.map((movie) => {
            <Route exact path="/fetchMovie" element={<Search title={movie.Title ? movie.Tilte : ""} description={movie.Plot ? movie.Plot : ""} imageUrl={`https://image.tmdb.org/t/p/w500${movie.Poster}`} date={movie.Released} apiKey={`https://www.omdbapi.com/?t=barbie&apikey=46de3dd8`} imdbRating={movie.imdbRating} />}></Route>
          })
          } */}
        </Routes>
      </Router>
    </div>
  )
}
export default App