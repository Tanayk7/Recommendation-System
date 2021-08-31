import React from 'react';
import apis from './apis';

export const AppContext = React.createContext({});
const { Provider } = AppContext;

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            auth_token: null,
            current_user: {},
            recommendations: [],
            search_query: "",
            search_results: [],
            movies: [],

            loginUser: this.loginUser,
            signupUser: this.signupUser,
            logoutUser: this.logoutUser,
            addMovie: this.addMovie,
            removeMovie: this.removeMovie,
            getMovies: this.getMovies,
            searchMovies: this.searchMovies,
            isAuthenticated: this.isAuthenticated,
        }
    }

    setQuery = (query) => {
        this.setState({ ...this.state, search_query: query });
    }

    async componentDidMount() {
        let current_user = await this.isAuthenticated();

        if (current_user) {
            let token = JSON.parse(localStorage.getItem('auth'));
            let user_movies = await apis.getUserMovies(token);
            let user_recommendations = await apis.getUserRecommendations(token);

            console.log("User movies: ", user_movies);
            console.log("User recommendations: ", user_recommendations);

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

    signupUser = async (email, password, callback) => {
        let { user, token } = await apis.signup({ email, password });

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

    getMovies = async (range) => {
        let response = await apis.getMovies(range);

        this.setState({ ...this.state, movies: response.movies });
    }

    addMovie = async (movie) => {
        if (this.isAuthenticated()) {
            let token = JSON.parse(localStorage.getItem('auth'));

            let response = await apis.addMovies({
                token,
                userId: this.current_user.id,
                movies: [movie]
            });

            if ('movies' in response) {
                this.setState({
                    ...this.state,
                    current_user: {
                        ...this.current_user,
                        movies: [
                            ...response.movies
                        ]
                    }
                })
            }
        }
    }

    removeMovie = async (movie) => {
        if (this.isAuthenticated()) {
            let token = JSON.parse(localStorage.getItem('auth'));

            let response = await apis.deleteMovies({
                token,
                userId: this.current_user.id,
                movies: [movie]
            });

            if ('movies' in response) {
                this.setState({
                    ...this.state,
                    current_user: {
                        ...this.current_user,
                        movies: [
                            ...response.movies
                        ]
                    }
                })
            }
        }
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