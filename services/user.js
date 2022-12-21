import { getStorage, saveStorage } from "./storage"
import {
    updateProfile,
    getAuth
} from 'firebase/auth';

import {
    getStorage as firebaseGetStorage,
    ref,
    uploadString,
    getDownloadURL
} from 'firebase/storage'

const _updateProfile = async (firebaseApp, data) => {
    const auth = getAuth(firebaseApp)
    let filename;

    try{
        if(data.photoURL && data.photoURL !== ""){
            filename = await saveImageToBase64ToUrl(
                firebaseApp,
                data.email.replace(/[^a-zA-Z0-9]/g, ""),
                data.photoURL
            );
            data.photoURL = filename;
        }
    }catch(err){
        console.log(err);
        throw(err)
    }

    try{
        updateProfile(auth.currentUser, data);
        saveStorage('user', data);
    }catch(err){
        console.log("Err", err)
        throw(err)
    }
}

const saveImageToBase64ToUrl = async (fiebaseApp, prefix, imageB64) => {
    const filename = `${prefix}_profile.png`
    const storage = firebaseGetStorage(fiebaseApp);
    const storageRef = ref(storage, filename);

    try{
        await uploadString(storageRef, imageB64, "data_url");
        return filename;
    }catch(err){
        console.log(err)
        throw err;
    }
}   

const getFile = async  (fiebaseApp, filename) => {
    const storage = firebaseGetStorage(fiebaseApp);
    const storageRef = ref(storage, filename);

    return await getDownloadURL(storageRef);
}

const getUser = async () => {
    return await getStorage('user');
}

export {
    _updateProfile,
    getUser,
    getFile
}