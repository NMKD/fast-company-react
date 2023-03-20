import httpServer from "./http.service";

const urlUsers = `user/`;

const userService = {
    create: async (payload) =>
        await httpServer.put(`${urlUsers}${payload._id}`, payload),
    update: async (payload) =>
        await httpServer.put(`${urlUsers}${payload._id}`, payload),
    getAuth: async (id) => await httpServer.get(`${urlUsers}${id}`),
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
