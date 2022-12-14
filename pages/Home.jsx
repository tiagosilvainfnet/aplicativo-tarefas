import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const Home = () => {
    const theme = useTheme();

    return <View style={{
            ...style.box,
            backgroundColor: theme.colors.bodyBackground
        }}>
            <Text>Home</Text>
        </View>
}

const style = StyleSheet.create({
    box: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
})

export default Home;