import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Button, TextInput, Avatar, Card  } from 'react-native-paper';
import { updateProfile } from '../services/user';
import { useTheme } from 'react-native-paper';

const Profile = ({ route }) => {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");


    return <View style={{
                    ...style.box,
                    backgroundColor: theme.colors.bodyBackground
                }}>
                <Card style={style.card}>
                    <Avatar.Image 
                        style={style.avatar}
                        size={150} source={{ uri: 'https://avatars.githubusercontent.com/u/8451789?v=4'}} />
                    <FAB
                        icon="camera"
                        style={{
                            ...style.fab,
                            left: '-12.5%'
                        }}
                        onPress={() => console.log('Pressed')}
                    />
                    <FAB
                        icon="folder-image"
                        style={{
                            ...style.fab,
                            right: '-12.5%'
                        }}
                        onPress={() => console.log('Pressed')}
                    />
                </Card>
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
                    label="Usuário"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={style.input}
                    mode="outlined"
                    label="Nome"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Button style={style.button} mode="contained" color="primary" onPress={() => updateProfile({})}>Atualizar perfil</Button>
                <Button style={{
                    ...style.button,
                    backgroundColor: theme.colors.error
                }} mode="contained" color="error" onPress={() => console.log('Sair')}>Sair</Button>
            </View>
}

const style = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 30,    
    },
    card: {
        elevation: 0,
        boxShadow: 'null',
        shadowColor: 'transparent',
        backgroundColor: 'tranparent',
        marginBottom: 16
    },
    avatar: {
        marginBottom: 10,
        borderRadius: 30, 
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


export default Profile;