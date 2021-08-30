import React, {useEffect, useContext} from 'react';
import {movieList} from "../../MovieLists/movieList"
import Layout from '../../Common/Layout/Layout';
import { AppContext } from '../../AppContext';
import "./Home.css";

// const image_path = 'https://image.tmdb.org/t/p/w1280';

const Movie = ({ title, image, genre, rating, year }) => {
    return(
        <div className="movie-card">
            <img className="thumbnail" src={image} alt={title} />
            <div className="movie-info">

                <div className="movie-name">
                    <div className="name-content">
                        {title}
                    </div>
                </div>

                <div className="movie-genre">
                    <div className="genre-content">
                        {genre}
                    </div>
                </div>

                <div className="movie-year">
                    <div className="year-content">
                        {year}
                    </div>
                </div>

                <div className="movie-rating">
                    <div className="rating-content">
                        tmdb - {rating}
                    </div>
                </div>

            </div>

        </div>
    )
};

const MovieList = ({title,movies}) => {
    return(
        <div className="movie-list-wrapper">
            <h1 className="app-title">{title}</h1>
            <div className="movie-list">
            {
                movies.map((movie,index) => (
                    <Movie
                        key={index}
                        title={movie.title}
                        image={movie.avatar}
                        genre={title}
                        rating={movie.rating}
                        year={movie.release_date} 
                    />
                ))
            }
            </div>
        </div>
    )
}

const Home = () => {
    const { getMovies, movies } = useContext(AppContext);
    
    useEffect(() => {
        getMovies({ min:0, max:16 });
    }, []);

    return(
        <Layout>
            <div className="movie-container">
                {
                    movies.length > 0 && 
                    movies.map((movie,index) => (
                        <div style={{marginBottom:"25px"}}>
                            <MovieList title={movie.genre} movies={movie.movies} key={index}/>
                        </div>
                    ))
                }
            </div>
        </Layout>   
    );
}

export default Home;