export function includesToString(data, value) {
    return data.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
    );
}

export function toFilterProfession(data, value) {
    return data.filter((user) => user.profession === value._id);
}
