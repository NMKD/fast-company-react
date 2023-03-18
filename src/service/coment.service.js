import httpServer from "./http.service";

const commentEndPoint = `comment/`;

const commentService = {
    create: async (payload) =>
        await httpServer.put(`${commentEndPoint}${payload._id}`, payload),
    delete: async (id) => await httpServer.delete(`${commentEndPoint}${id}`),
    getSorted: async (pageId) =>
        await httpServer.get(commentEndPoint, {
            params: {
                orderBy: JSON.stringify("pageId"),
                equalTo: JSON.stringify(pageId)
            }
        })
};

export default commentService;
