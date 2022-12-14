import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { TimePickerModal  } from 'react-native-paper-dates';
import {
    useState,
    useCallback
} from 'react';

const Task = ({
    taskId,
    title,
    setTitle,
    description,
    setDescription,
    timeExpiration,
    setTimeExpiration,
    dateExpiration,
    setDateExpiration,
    saveTask,
    toggleModal
}) => {
    const theme = useTheme();
    const [visible, setVisible] = useState(false)

    const onDismiss = useCallback(() => {
        setVisible(false)
      }, [setVisible])

    const onConfirm = useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            setTimeExpiration(`${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`)
        },
    [setVisible]
    );

    return <>
            <Text variant="headlineSmall">{ taskId ? "Editar tarefa" : "Adicionar tarefa" }</Text>
            <TextInput
                style={style.input}
                mode="outlined"
                label="Título"
                color="primary"
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                multiline={true}
                numberOfLines={5}
                style={style.input}
                mode="outlined"
                label="Descrição"
                color="primary"
                value={description}
                onChangeText={text => setDescription(text)}
            />
            
            <TextInput
                style={style.input}
                mode="outlined"
                label="Data"
                color="primary"
                value={dateExpiration}
                onChangeText={text => setDateExpiration(text)}
            />
            <TextInput
                style={style.input}
                mode="outlined"
                label="Hora"
                color="primary"
                value={timeExpiration}
                onClick={() => setVisible(true)}
            />

            <TimePickerModal
                locale="pt"
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={12} // default: current hours
                minutes={14} // default: current minutes
                label="Select time" // optional, default 'Select time'
                uppercase={false} // optional, default is true
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
            />
            <Button style={style.button} mode="contained" color="primary" onPress={saveTask}>Salvar</Button>
            <Button style={{
                    ...style.button,
                    backgroundColor: theme.colors.error
                }} mode="contained" color="error" onPress={toggleModal}>Cancelar</Button>
    </>
}

const style = StyleSheet.create({
    input: {
        width: '100%'
    },
    button: {
        marginTop: 10,
        width: '100%',
        borderRadius: 5
    },
})

export default Task;