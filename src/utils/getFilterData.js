export function includesToString(data, value) {
    return data.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
    );
}

export function toFilterProfession(data, value) {
    return data.filter((item) => item.profession === value._id);
}

export function toFilterQualities(data, values) {
    const arr = [];
    values.forEach((id) =>
        data.forEach((item) => item.value === id && arr.push(item))
    );
    return arr;
}
