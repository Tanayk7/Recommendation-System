import React from 'react';
import {movieList} from "../../MovieLists/movieList"
import Layout from '../../Common/Layout/Layout';
import "./Home.css";

// const image_path = 'https://image.tmdb.org/t/p/w1280';

const Movie = ({ name, image, genre, rating, year }) => {
    return(
        <div className="movie-card">

            <img className="thumbnail" src={image} alt={name} />
            
            <div className="movie-info">

                <div className="movie-name">
                    <div className="name-content">
                        {name}
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

const MovieList = ({movies}) => {
    return(
        <div className="movie-list">
            {
                movies.map(movie => (
                    <Movie
                        name={movie.name}
                        image={movie.image}
                        genre={movie.genre}
                        rating={movie.rating}
                        year={movie.year.substring(0,4)} 
                    />
                ))
            }
        </div>
    )
}

const Home = () => {
    return(
        <Layout>
            <div className="movie-container">
                <h1 className="app-title">Recommended</h1>
                <MovieList movies = {movieList} />
            </div>
        </Layout>   
    );
}

export default Home;