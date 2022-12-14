import AsyncStorage from "@react-native-async-storage/async-storage";


const saveStorage = async (key, value) => {
    const jsonToString = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonToString);
}

const getStorage = async (key) => {
    const data = await AsyncStorage.getItem(key);
    return data !== null ? JSON.parse(data) : null;
}

const clearStorage = async () => {
    await AsyncStorage.clear();
}

export {
    saveStorage,
    getStorage,
    clearStorage
}