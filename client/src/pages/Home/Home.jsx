import React from 'react';

const movie_list = [
    {
        name: "movie 1",
        genre: "action",
        image: "https://media.istockphoto.com/photos/movie-projector-on-dark-background-picture-id1007557230?k=20&m=1007557230&s=612x612&w=0&h=hWEw8rA6ASt-Z18pNvUKk2GtQZVLj1GHv3HFlNB4p6U=",
        year: "2021",
        rating: 5
    },
    {
        name: "movie 1",
        genre: "action",
        image: "https://media.istockphoto.com/photos/movie-projector-on-dark-background-picture-id1007557230?k=20&m=1007557230&s=612x612&w=0&h=hWEw8rA6ASt-Z18pNvUKk2GtQZVLj1GHv3HFlNB4p6U=",
        year: "2021",
        rating: 5
    },
    {
        name: "movie 1",
        genre: "action",
        image: "https://media.istockphoto.com/photos/movie-projector-on-dark-background-picture-id1007557230?k=20&m=1007557230&s=612x612&w=0&h=hWEw8rA6ASt-Z18pNvUKk2GtQZVLj1GHv3HFlNB4p6U=",
        year: "2021",
        rating: 5
    }
]

const Movie = ({ name, image, genre, rating, year}) => {
    return (
        <div>
            <img src={image} alt="" className="movie-image" />
            <div className="movie-name">{name}</div>
            <div className="movie-genre">{genre}</div>
            <div className="movie-rating">{rating}</div>
            <div className="movie-year">{year}</div>
        </div>
    )
}

const MovieList = ({ movies, title }) => {
    return (
        <div>
            <h1>{title}</h1>
            {
                movies.map(movie => (
                    <Movie 
                        name={movie.name}
                        image={movie.image}
                        genre={movie.genre}
                        rating={movie.rating}
                        year={movie.year}
                    />
                ))
            }
        </div>
    )
}


const Home = () => {
    return (
        <div>
            <MovieList movies={movie_list} title="Recommended"/>
        </div>
    );
}

export default Home;
