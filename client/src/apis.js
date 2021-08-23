export default {
    signup: async ({ email, password }) => {
        let url = 'http://localhost:3000/api/users/signup';

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            let data = await response.json();

            console.log(data);
            return data;
        }
        catch (err) {
            return err;
        }
    }
}
