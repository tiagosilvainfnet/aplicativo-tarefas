import { useEffect, useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { FAB, Snackbar , useTheme, Modal, Portal, Provider, Dialog, Button, Paragraph } from 'react-native-paper';
import { List, Task } from '../components';
import { clearStorage, getStorage, saveStorage } from '../services/storage';

const Home = ({ navigation }) => {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeExpiration, setTimeExpiration] = useState("");
    const [dateExpiration, setDateExpiration] = useState("");
    const [tasks, setTasks] = useState([]);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [deletedId, setDeletedId] = useState(0);

     const hideDialog = () => setVisibleDialog(false);

    const toggleModal = () => {
        setVisible(!visible);
    }

    const toggleSnack = () => {
        setVisibleSnack(!visibleSnack);
    }

    const loadTasks = async () => {
        const _tasks = await getStorage('tasks');
        if(_tasks){
            setTasks(_tasks);
        }
    }

    const saveTask = async () => {
        // TODO: Alterar para verificar se o id existe e atualizar;

        toggleModal();
        toggleSnack();

        let _tasks = await getStorage('tasks');
        if(_tasks === null){
            _tasks = []
        }
        _tasks.push({
            id: tasks.length > 0 ? tasks[tasks.length - 1]['id'] + 1 : 1,
            title,
            description,
            timeExpiration,
            dateExpiration,
        });
        await saveStorage('tasks', _tasks);
        setTasks(_tasks);

        setTaskId(null);
        setTitle("");
        setDescription("");
        setTimeExpiration("");
        setDateExpiration("");
    }

    const edit = async (id) => {
        let _tasks = await getStorage('tasks');
        let task = _tasks.filter(t => t.id === id)[0];

        setTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setTimeExpiration(task.timeExpiration);
        setDateExpiration(task.dateExpiration);

        toggleModal();
    }
    const _delete = async () => {
        let _tasks = await getStorage('tasks');
        _tasks = _tasks.filter(t => t.id !== deletedId);

        if(_tasks.length > 0){
            await saveStorage('tasks', _tasks);
        }else{
            await saveStorage('tasks', null);
        }
        setTasks(_tasks);
        setDeletedId(0);
        hideDialog();
    }

    const openDialog = (id) => {
        setDeletedId(id)
        setVisibleDialog(true)
    }

    useEffect(() => {
        loadTasks();
    }, [])

    return <View style={{
            ...style.box,
            backgroundColor: theme.colors.bodyBackground
        }}>
            <List 
                edit={edit}
                _delete={openDialog}
                items={tasks}/>
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

            <Portal theme={theme}>
                <Dialog visible={visibleDialog} onDismiss={hideDialog}>
                    <Dialog.Title>Deletar tarefa?</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Tem certeza, que deseja deletar essa tarefa?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={_delete}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

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