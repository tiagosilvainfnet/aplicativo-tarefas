import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Avatar, useTheme  } from 'react-native-paper';
import { login } from '../services/auth';

const Login = ({ navigation, route}) => {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={style.input}
                    mode="outlined"
                    label="Senha"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <Button style={style.button} mode="contained" onPress={() => login(email, password)}>Entrar</Button>
                <Button style={style.button} onPress={() => navigation.navigate('Register')}>Registrar</Button>
            </View>
}

const style = StyleSheet.create({
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

export default Login;