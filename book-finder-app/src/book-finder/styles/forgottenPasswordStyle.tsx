import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    title:{
        flexDirection: 'row',
        fontFamily: 'Cardo-Regular',
        fontSize: 58,
        alignContent: 'center',
        textAlign: 'center',
        color: '#90001F'
    },
    image: {
        maxHeight: 200,
        maxWidth: 80,
        marginLeft: 30
    },
    buttonContainer: {
        backgroundColor: '#90001F',
        marginHorizontal: 30,
        borderRadius: 30,
        marginTop: 16,
        height: 40
    },
    buttonText: {
        fontFamily: 'Cardo-Regular',
		fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
	emailInput: {
		height: 40,
        marginHorizontal: 30,
        marginVertical: 10,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
        fontSize: 16,
        borderRadius: 30
    },
    smallButtons: {
        fontSize: 16,
        fontFamily: 'Cardo-Bold',
        marginTop: 80,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    signingOptions: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    text1: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20
    },
    text2: {
        fontFamily: 'Cardo-Bold',
        fontSize: 20
    },
    text3: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20,
        marginTop: 30,
        justifyContent: 'space-around',
        alignContent: 'stretch'
    },
});
