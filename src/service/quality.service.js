import httpServer from "./http.service";

const urlQuality = `quality/`;

const qualityService = {
    fetchAll: async () => await httpServer.get(urlQuality)
};

export default qualityService;
