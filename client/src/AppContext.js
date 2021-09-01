import React from 'react';
import apis from './apis';

export const AppContext = React.createContext({});
const { Provider } = AppContext;

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            modal_open: false,
            auth_token: null,
            current_user: {},
            recommendations: [],
            search_query: "",
            search_results: [],
            movies: [],
            current_movie: {},
            loginUser: this.loginUser,
            signupUser: this.signupUser,
            logoutUser: this.logoutUser,
            addMovie: this.addMovie,
            removeMovie: this.removeMovie,
            getMovies: this.getMovies,
            searchMovies: this.searchMovies,
            isAuthenticated: this.isAuthenticated,
            setCurrentMovie: this.setCurrentMovie,
            modalClose: this.modalClose,
            isFavourite: this.isFavourite
        }
    }

    modalClose = () => {
        this.setState({ ...this.state, modal_open: false });
    }

    setCurrentMovie = (movie) => {
        this.setState({ ...this.state, current_movie: { ...movie }, modal_open: true })
    }

    async componentDidMount() {
        let current_user = await this.isAuthenticated();

        if (current_user) {
            let token = JSON.parse(localStorage.getItem('auth'));
            let user_movies = await apis.getUserMovies(token);
            let user_recommendations = await apis.getUserRecommendations(token);

            this.setState({
                ...this.state,
                authenticated: true,
                current_user: {
                    ...current_user,
                    movies: user_movies,
                    recommendations: user_recommendations
                }
            });
        }
    }

    // checks if the token in localstorage is valid 
    isAuthenticated = async () => {
        let token = JSON.parse(localStorage.getItem('auth'));
        let response = await apis.currentUser(token);

        if (response.currentUser) {
            return response.currentUser;
        }

        return null;
    }

    signupUser = async (email, password, name, callback) => {
        let { user, token } = await apis.signup({ email, password, name });

        if (user) {
            this.setState({
                ...this.state,
                authenticated: true,
                current_user: user
            }, () => {
                callback();
            });

            window.localStorage.setItem("auth", JSON.stringify(token));
        }
    }

    loginUser = async (email, password, callback) => {
        let { token, user } = await apis.signin({ email, password });

        if (user) {
            this.setState({
                ...this.state,
                authenticated: true,
                current_user: user
            }, () => {
                callback();
            });

            window.localStorage.setItem("auth", JSON.stringify(token));
        }
    }

    logoutUser = () => {
        window.localStorage.removeItem("auth");
        this.setState({ ...this.state, authenticated: false });
    }

    isFavourite = (movie) => {
        let user_movies = [...this.state.current_user.movies];

        if (user_movies.length === 0) {
            return false;
        }

        for (let i = 0; i < user_movies.length; i++) {
            user_movies[i] = JSON.stringify(user_movies[i]);
        }

        if (user_movies.includes(JSON.stringify(movie))) {
            return true
        }
        else {
            return false;
        }
    }

    getMovies = async (range) => {
        let response = await apis.getMovies(range);

        this.setState({ ...this.state, movies: response.movies });
    }

    addMovie = async (movie) => {
        let token = JSON.parse(localStorage.getItem('auth'));

        let response = await apis.addMovies({
            token,
            userId: this.state.current_user.id,
            movies: [movie]
        });

        this.setState({
            ...this.state,
            current_user: {
                ...this.state.current_user,
                movies: [
                    ...response
                ]
            }
        });
    }

    removeMovie = async (movie) => {
        let token = JSON.parse(localStorage.getItem('auth'));

        let response = await apis.deleteMovies({
            token,
            userId: this.state.current_user.id,
            movies: [movie]
        });

        this.setState({
            ...this.state,
            current_user: {
                ...this.state.current_user,
                movies: [
                    ...response
                ]
            }
        });
    }

    searchMovies = async (query) => {
        let search_results = await apis.searchMovies(query);

        this.setState({ ...this.state, search_results });
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }
};