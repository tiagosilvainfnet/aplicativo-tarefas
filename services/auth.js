import { clearStorage } from "./storage";

const isLoggedIn = () => {
    return true;
}

const login = (email, password) => {
    console.log(email);
    console.log(password);
}

const register = (username, email, password, confirmPassword, setErrors) => {
    if(password === ""){
        setErrors((_v) => ({
            ..._v,
            password: {
                status: true,
                msg: "Campo password deve ser preenchido"
            }
        }))
        return;
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
        return;
    }else{
        setErrors((_v) => ({
            ..._v,
            confirmPassword: {
                status: false,
                msg: ""
            }
        }))
    }

    if(password === confirmPassword){
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
        return;
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
}

const logout = async () =>{
    await clearStorage();
}

export {
    isLoggedIn,
    login,
    register,
    logout
}