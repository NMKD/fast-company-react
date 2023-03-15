import httpServer from "./http.service";

const urlUsers = `user/`;

const userService = {
    create: async (payload) => {
        try {
            return await httpServer.put(`${urlUsers}${payload._id}`, payload);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    get: async (id) => {
        try {
            return await httpServer.get(`${urlUsers}${id}`);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    post: async (content) => {
        try {
            return await httpServer.post(`${urlUsers}`, content);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    delete: async (id) => {
        try {
            return await httpServer.delete(`${urlUsers}${id}`);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    fetchAll: async () => {
        try {
            return await httpServer.get(urlUsers);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default userService;
