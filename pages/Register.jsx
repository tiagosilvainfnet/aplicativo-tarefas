import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput, Avatar, useTheme  } from 'react-native-paper';
import { register } from '../services/auth';

const Register = ({ navigation, route}) => {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        email: {
            status: false,
            msg: ""
        },
        password: {
            status: false,
            msg: ""
        },
        confirmPassword: {
            status: false,
            msg: ""
        },
    }); 

    return <View style={{
                ...style.box,
                backgroundColor: theme.colors.bodyBackground
            }}>
                <Avatar.Image 
                    style={style.avatar}
                    size={150} source={require('../assets/img/logo.png')} />
                <TextInput
                    style={style.input}
                    mode="outlined"
                    label="E-mail"
                    value={email}
                    error={errors.email.status}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={style.input}
                    mode="outlined"
                    label="Senha"
                    value={password}
                    error={errors.password.status}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                { errors.password.status ? <Text style={style.erro}>{errors.password.msg}</Text> : <Text></Text> }
                <TextInput
                    style={style.input}
                    mode="outlined"
                    label="Confirmar senha"
                    value={confirmPassword}
                    error={errors.confirmPassword.status}
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                />
                { errors.confirmPassword.status ? <Text style={style.erro}>{errors.confirmPassword.msg}</Text> : <Text></Text> }
                
                <Button style={style.button} mode="contained" onPress={async () => {
                    try{
                        await register(email, password, confirmPassword, setErrors, route.params.firebaseApp);
                        route.params.setUserLoggedIn(true);
                    }catch(err){
                        alert(err)
                    }
                }}>Registrar</Button>
                <Button style={style.button} onPress={() => navigation.navigate('Login')}>Entrar</Button>
            </View>
}

const style = StyleSheet.create({
    erro: {
        color: 'red'
    },
    avatar: {
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    button: {
        marginTop: 10,
        width: '100%',
        borderRadius: 5
    },
    box: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    input: {
        width: '100%'
    }
  })

export default Register;