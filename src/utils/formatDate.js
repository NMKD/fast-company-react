export function formstDate(data) {
    const now = new Date();
    const date = new Date(parseInt(data));
    const yearDif = now.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = now.getDay() - date.getDay();
        if (dayDif === 0) {
            const hoursDif = now.getHours() - date.getHours();
            if (hoursDif === 0) {
                const minutesDif = now.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 0 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 0 && minutesDif < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return `${date.getHours()} : ${date.getMinutes()}`;
        }
        return `${date.getDate()} ${date.toLocaleString("default", {
            month: "long",
            day: "numeric"
        })}`;
    }
    return `${date.toLocaleDateString()}`;
}
