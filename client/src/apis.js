export default {
    signup: async ({ email, password, name }) => {
        let url = 'http://localhost:3000/api/users/signup';

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, name })
            });
            let data = await response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    },

    signin: async ({ email, password }) => {
        let url = 'https://recommender-backend.herokuapp.com/api/users/signin';

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            let data = await response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    },

    currentUser: async () => {
        let url = 'https://recommender-backend.herokuapp.com/api/users/currentuser';

        try {
            let response = await fetch(url);
            let data = await response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    }

}
