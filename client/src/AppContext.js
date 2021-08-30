import React from 'react';
import apis from './apis';

export const AppContext = React.createContext({});
const { Provider } = AppContext;

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth_token: null,
            current_user: {},
            recommendations: [],
            movies: [],
            loginUser: this.loginUser,
            signupUser: this.signupUser,
            addMovie: this.addMovie,
            removeMovie: this.removeMovie,
            getMovies: this.getMovies,
            searchMovies: this.searchMovies,
            isAuthenticated: this.isAuthenticated,
            currentRoute: this.currentRoute,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        console.log("ContextProvider updated!!");
    }

    isAuthenticated = async () => {
        let response = await apis.current_user(this.auth_token);

        if (response.currentUser) {
            return true;
        }

        return false;
    }

    signupUser = async (email, password, callback) => {
        let { user, token } = await apis.signup({ email, password });

        if (user) {
            this.setState({
                ...this.state,
                auth_token: token,
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
                auth_token: token,
                current_user: user
            }, () => {
                callback();
            });
        }
    }

    logoutUser = () => {
        window.localStorage.removeItem('auth');
    }

    getMovies = async (range) => {
        let response = await apis.getMovies(range);

        this.setState({ ...this.state, movies: response.movies });
    }

    addMovie = async (movie) => {
        let response = await apis.addMovies({
            userId: this.current_user.id,
            token: this.auth_token,
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

    removeMovie = async (movie) => {
        let response = await apis.deleteMovies({
            userId: this.current_user.id,
            token: this.auth_token,
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

    searchMovies = async (query) => {

    }

    currentRoute = async () => {

    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }
};