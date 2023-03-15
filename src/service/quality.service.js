import httpServer from "./http.service";

const urlQuality = `quality/`;

const qualityService = {
    fetchAll: async () => {
        try {
            return await httpServer.get(urlQuality);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default qualityService;
