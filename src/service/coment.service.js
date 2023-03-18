import httpServer from "./http.service";

const commentEndPoint = `comment/`;

const commentService = {
    create: async (payload) =>
        await httpServer.put(`${commentEndPoint}${payload._id}`, payload),
    get: async (userId) => {
        try {
            return await httpServer.get(`${commentEndPoint}${userId}`);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default commentService;
