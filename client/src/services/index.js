const baseURL = 'http://localhost:8080';

export const apiService = {
    getUser: async() => {
        try {
            const response = await fetch(`${baseURL}/user`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    },

    logOut: async() => {
        try {
            const response = await fetch(`${baseURL}/auth/logout`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    },

    getMessages: async() => {
        try {
            const response = await fetch(`${baseURL}/messages`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }
}