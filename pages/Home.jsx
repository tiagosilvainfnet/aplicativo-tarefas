import { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { FAB, Snackbar , useTheme, Modal, Portal, Provider } from 'react-native-paper';
import Task from '../components/task';

const Home = ({ navigation }) => {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeExpiration, setTimeExpiration] = useState("");
    const [dateExpiration, setDateExpiration] = useState("");

    const toggleModal = () => {
        setVisible(!visible);
    }

    const toggleSnack = () => {
        setVisibleSnack(!visibleSnack);
    }

    const saveTask = () => {
        toggleModal();
        toggleSnack();
    }

    return <View style={{
            ...style.box,
            backgroundColor: theme.colors.bodyBackground
        }}>
            {
                !visible ? <FAB
                    icon="plus"
                    style={{
                        ...style.fab,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.textColor
                    }}
                    onPress={toggleModal}
                /> : ""
            }
            <Provider theme={theme}>
                <Portal>
                    <Modal visible={visible} onDismiss={toggleModal} contentContainerStyle={{
                        backgroundColor: theme.colors.bodyBackground,
                        ...style.modal
                    }}>
                        <Task 
                            taskId={taskId}
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            timeExpiration={timeExpiration}
                            setTimeExpiration={setTimeExpiration}
                            dateExpiration={dateExpiration}
                            setDateExpiration={setDateExpiration}
                            saveTask={saveTask}
                            toggleModal={toggleModal}
                        />
                    </Modal>
                </Portal>
            </Provider>

            <Snackbar
                visible={visibleSnack}
                duration={4000}
                onDismiss={toggleSnack}>
                Task salva com sucesso!!!
            </Snackbar>
        </View>
}

const style = StyleSheet.create({
    box: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 30,    
        zIndex: '998'
    },
    modal: {
        padding: 20,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'fixed',
    },
})

export default Home;