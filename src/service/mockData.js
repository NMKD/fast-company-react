import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import profession from "../2. mockData/professions.json";
import qualities from "../2. mockData/qualities.json";
import users from "../2. mockData/users.json";
import httpServer from "./http.service";

const useMockData = () => {
    const stateStatus = {
        idl: "Not started",
        pending: "In process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(stateStatus.idl);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = profession.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === stateStatus.idl) {
            setStatus(stateStatus.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(stateStatus.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const key of profession) {
                await httpServer.put(`profession/${key._id}`, key);
                incrementCount();
            }
            for (const key of users) {
                await httpServer.put(`user/${key._id}`, key);
                incrementCount();
            }
            for (const key of qualities) {
                await httpServer.put(`quality/${key._id}`, key);
                incrementCount();
            }
            toast.success("Данные успешно загруженны");
        } catch (e) {
            setStatus(stateStatus.error);
            toast.error(status);
            setError(e);
        }
    }

    return { error, status, initialize, progress };
};

export default useMockData;
