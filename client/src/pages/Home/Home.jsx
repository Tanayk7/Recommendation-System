import React, {useEffect, useContext} from 'react';
import Layout from '../../Common/Layout/Layout';
import { AppContext } from '../../AppContext';
import Modal from '../../Common/Modal/Modal';
import "./Home.css";

// const image_path = 'https://image.tmdb.org/t/p/w1280';

const Movie = ({ title, image, genre, rating, year,onClick }) => {
    return(
        <div className="movie-card" onClick={onClick}>
            <div className="thumbnail-container">
                <img className="thumbnail" src={image} alt={title} />
                <div className="thumbnail-middle">
                    <div className="thumbnail-middle-text">{title}</div>
                </div>
            </div>
            
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
    const { setCurrentMovie } = useContext(AppContext);

    return(
        <div className="movie-list-wrapper">
            <h1 className="app-title">{title}</h1>
            <div className="movie-list">
            {
                movies.map((movie,index) => (
                    <Movie
                        onClick={() => setCurrentMovie(movie)}
                        key={index}
                        title={movie.title}
                        image={movie.avatar}
                        genre={movie.genre}
                        rating={movie.rating}
                        year={movie.release_date && movie.release_date.substring(0,4)} 
                    />
                ))
            }
            </div>
        </div>
    )
}

const Home = () => {
    const { modal_open, current_movie, getMovies, movies, search_results, authenticated, current_user } = useContext(AppContext);
    
    useEffect(() => {
        //getMovies({ min:0, max:16 });
    }, []);

    return(
        <Layout>
            { modal_open && <Modal movie={current_movie}/> }
            <div className="movie-container">
                {
                    search_results.length > 0 ?
                    <div style={{marginBottom:"25px"}}>
                        <MovieList title="Search results" movies={search_results}/>
                    </div>
                    :
                    <div>No search results</div>
                }

                {
                    authenticated === true ? 
                    <div style={{marginBottom:"25px"}}>
                        <MovieList title="Recommended" movies={current_user.recommendations}/>
                    </div>
                    :
                    <div>
                        User is not authenticated
                    </div>
                }
            </div>
        </Layout>   
    );
}

export default Home;