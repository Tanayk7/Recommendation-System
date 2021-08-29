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
            loginUser: this.loginUser,
            signupUser: this.signupUser,
            addMovie: this.addMovie
        }
    }

    componentDidMount() {

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

    addMovie = async () => {

    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }
};