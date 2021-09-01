import React, {useContext, useState, useEffect} from 'react';
import { AppContext } from '../../AppContext';
import './Modal.css';

const MovieModal = ({ movie }) => {
    const { authenticated, current_user, modalClose, addMovie, removeMovie, isFavourite } = useContext(AppContext);
    const [isFavouriteMovie,setFavouriteMovie] = useState(isFavourite(movie));

    useEffect(() => {
        setFavouriteMovie(isFavourite(movie));
    }, [current_user.movies])

    const handleClick = (e) => {
        e.stopPropagation();
    }

    const handleRemoveFavourite = () => {
        removeMovie(movie);
    }

    const handleAddFavourite = () => {
        addMovie(movie);
    }

    return (
        <div className='modal-container' onClick={modalClose}>
            <div className="modal" onClick={handleClick}>
                <div className="modal-title">
                    {movie && movie.title} 
                    {
                        authenticated ?
                            isFavouriteMovie ? 
                            <i className='bx bxs-star favourite-icon favourite-icon-active' onClick={handleRemoveFavourite}/>
                            : 
                            <i className='bx bx-star favourite-icon' onClick={handleAddFavourite}/>
                        : 
                        null
                    }
                </div>
                <div className="modal-body">
                    <img src={movie && movie.avatar } className='modal-image'/>
                    <div className="movie-details">
                        <div className="modal-movie-rating">
                            {movie && movie.rating}
                        </div>
                        <div className="modal-movie-genre">
                            {movie && movie.genre}
                        </div>
                    </div>
                    <div className="movie-description">
                        {movie && movie.overview}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
