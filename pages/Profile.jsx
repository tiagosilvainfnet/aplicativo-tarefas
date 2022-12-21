import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { FAB, Button, TextInput, Avatar, Card, Snackbar } from 'react-native-paper';
import { getUser, _updateProfile, getFile } from '../services/user';
import { useTheme } from 'react-native-paper';
import { logout } from '../services/auth';
import { pickImage } from '../services/image';

const Profile = ({ route }) => {
    const theme = useTheme();

    const [snackBarShow, setSnackBarShow] = useState(false);
    const [messageSnack, setMessageSnack] = useState("");
    
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [photoURLShow, setPhotoURLShow] = useState("");

    const loadUser = async () => {
        const user = await getUser();
        setEmail(user.email)
        setDisplayName(user.displayName)
        if(user.photoURL){
            try{
                setPhotoURLShow(await getFile(route.params.firebaseApp, user.photoURL))
            }catch(err){

            }
        }
    }

    const uploadPhoto = async () => {
        const image = await pickImage();
        setPhotoURL(image);
        setPhotoURLShow(image);
    }

    useEffect(() => {
        loadUser();
    }, []);


    return <View style={{
                    ...style.box,
                    backgroundColor: theme.colors.bodyBackground
                }}>

                <Card style={style.card}>
                    <Avatar.Image 
                        style={style.avatar}
                        size={150} source={{ uri: photoURLShow ? photoURLShow : require('../assets/user.png')}} />
                    {/* <FAB
                        icon="camera"
                        style={{
                            ...style.fab,
                            left: '-12.5%'
                        }}
                        onPress={openCamera}
                    /> */}
                    <FAB
                        icon="folder-image"
                        style={{
                            ...style.fab,
                            right: '-12.5%'
                        }}
                        onPress={uploadPhoto}
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
                    label="Nome"
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                />
                <Button style={style.button} mode="contained" color="primary" onPress={async () => {
                    try{
                        await _updateProfile(route.params.firebaseApp, {
                            email,
                            displayName,
                            photoURL
                        })
                        setMessageSnack("Perfil atualizado com sucesso!")
                    }catch(err){
                        setMessageSnack("Erro ao atualizar perfil!")
                    }
                    setSnackBarShow(true)
                }}>Atualizar perfil</Button>
                <Button style={{
                    ...style.button,
                    backgroundColor: theme.colors.error
                }} mode="contained" color="error" onPress={async () => {
                    await logout()
                    route.params.setUserLoggedIn(false);
                }}>Sair</Button>

                <Snackbar
                    visible={snackBarShow}
                    duration={3000}>
                    {messageSnack}
                </Snackbar>
            </View>
}

const style = StyleSheet.create({
    camera: {
        position: 'absolute',
        backgroundColor: "#333"
    },
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