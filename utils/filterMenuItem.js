function findFirstUniqueByName(objects) {
    const nameMap = new Map();
    for (const obj of objects) {
        const name = obj.name;
        if (!nameMap.has(name)) {
            nameMap.set(name, obj);
        }
    }
    return Array.from(nameMap.values());
}

export default findFirstUniqueByName;