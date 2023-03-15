import httpServer from "./http.service";

const urlProfession = `profession/`;

const professionService = {
    fetchAll: async () => {
        try {
            return await httpServer.get(urlProfession);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default professionService;
