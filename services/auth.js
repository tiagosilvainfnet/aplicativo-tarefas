import { clearStorage, getStorage, saveStorage } from "./storage";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth
} from 'firebase/auth'

const isLoggedIn = async () => {
    const user = await getStorage('user');
    return user !== null;
}

const login = async (_email, _password, firebaseApp) => {
    try{
        const auth = getAuth(firebaseApp)
        const result = await signInWithEmailAndPassword(auth, _email, _password)
        const { displayName, email, photoURL, uid } =  result.user;
        saveStorage('user', { displayName, email, photoURL, uid, password: _password })
    }catch(err){
        console.log(err)
        throw(err.toString())
    }
}

const reautenticate = async (firebaseApp) => {
    const user = await getStorage('user');
    if(user !== null){
        await login(user.email, user.password, firebaseApp)
    }
}

const register = async (_email, _password, confirmPassword, setErrors, firebaseApp) => {
    if(_password === ""){
        setErrors((_v) => ({
            ..._v,
            password: {
                status: true,
                msg: "Campo password deve ser preenchido"
            }
        }))
    }else{
        setErrors((_v) => ({
            ..._v,
            password: {
                status: false,
                msg: ""
            }
        }))
    }

    if(confirmPassword === ""){
        setErrors((_v) => ({
            ..._v,
            confirmPassword: {
                status: true,
                msg: "Campo confirm password deve ser preenchido"
            }
        }))
    }else{
        setErrors((_v) => ({
            ..._v,
            confirmPassword: {
                status: false,
                msg: ""
            }
        }))
    }

    if(_password === confirmPassword){
        setErrors((_v) => ({
            ..._v,
            password: {
                status: false,
                msg: ""
            },
            confirmPassword: {
                status: false,
                msg: ""
            }
        }))
    }else{
        setErrors((_v) => ({
            ..._v,
            password: {
                status: true,
                msg: "As senhas não coincidem"
            },
            confirmPassword: {
                status: true,
                msg: ""
            }
        }))
    }

    try{
        const auth = getAuth(firebaseApp)
        const result = await createUserWithEmailAndPassword(auth, _email, _password)
        console.log(result)
        const { displayName, email, photoURL, uid } =  result.user;
        saveStorage('user', { displayName, email, photoURL, uid, password: _password })
    }catch(err){
        console.log(err)
        throw(err.toString())
    }
}

const logout = async () =>{
    await clearStorage();
}

export {
    isLoggedIn,
    login,
    register,
    logout,
    reautenticate
}