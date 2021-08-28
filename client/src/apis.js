const base_url = 'http://localhost:3000';

export default {
    currentUser: async (token) => {
        let url = base_url + '/api/users/currentuser';

        try {
            let response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await response.json();

            return data;
        }
        catch (err) {
            return err;
        }
    },

    signup: async ({ email, password }) => {
        let url = base_url + '/api/users/signup';

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

    signin: async ({ email, password }) => {
        let url = base_url + '/api/users/signin';
        console.log(url);
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

    getMovies: async ({ min, max }) => {
        let url = base_url + '/api/users/get-movies';

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ min, max })
            });
            let data = await response.json();

            return data;
        }
        catch (err) {
            return err;
        }
    },

    addMovies: async ({ userId, movies, token }) => {
        let url = base_url + '/api/users/add-movies';

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userId, movies })
            });
            let data = await response.json();

            return data;
        }
        catch (err) {
            return err;
        }
    },

    deleteMovies: async ({ userId, movies, token }) => {
        let url = base_url + '/api/users/delete-movies';

        try {
            let response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userId, movies })
            });
            let data = await response.json();

            return data;
        }
        catch (err) {
            return err;
        }
    }
}
