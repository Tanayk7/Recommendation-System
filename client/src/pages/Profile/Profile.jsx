import React from 'react';

const Movie = (props) => {
    return (
        <div className="">
            {props.name}
            {props.imageUrl}
            {props.description}
        </div>
    )
}

const MovieList = (props) => {
    return (
        <div>
            {
                props.movies.map((movie,index) => (
                    <Movie
                        name={movie.name} 
                        imageUrl={movie.imageUrl} 
                        description={movie.description}
                    />
                ))
            }
        </div>
    )
}

const Profile = (props) => {
    return (
        <div>
            <div>
                <div className="input-group">
                    <input onChange={} value={props.name} type="file" />
                    <button onClick={updateImage}> update image </button>
                </div>
                <div className="input-group">
                    <input onChange={} value={props.email} type="text" />
                    <button onClick={updateName}> update name </button>
                </div>
                <div className="input-group">
                    <input onChange={}  value={props.password} type="text" />
                    <button onClick={updateEmail}> update email </button>
                </div>
                <div className="input-group">
                    <input onChange={}  value={props.imageUrl} type="password" />
                    <button onClick={updatePassword}> update password </button>
                </div>
            </div>
            <MovieList movies={props.movies}/>
        </div>
    );
}


export default Profile;
