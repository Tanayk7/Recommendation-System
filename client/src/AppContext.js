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

    signupUser = async (email, password) => {
        let { user, token } = await apis.signup({ email, password });

        console.log(user, token);

        if (user) {
            this.setState({
                ...this.state,
                auth_token: token,
                current_user: user
            });
        }
    }

    loginUser = async (email, password) => {
        let { token, user } = await apis.signin({ email, password });

        console.log("Token: ", token);
        console.log("User: ", user);

        if (user) {
            this.setState({
                ...this.state,
                auth_token: token,
                current_user: user
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