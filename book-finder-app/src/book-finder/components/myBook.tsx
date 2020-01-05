import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyBook(props){
   
    return(
        <View style={styles.bookContainer}>
            <Text style={styles.label}>{props.book.title}</Text>
            <Text style={styles.label}>{props.book.author}</Text>
            <Text style={styles.label}>{props.book.editor}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bookContainer: {
        flex: 3,
        height: 100,
        flexDirection: "column",
        alignContent: 'space-around',
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    label: {
        flex: 1, 
        fontFamily: "Cardo-Regular",
        fontSize: 18,
        paddingLeft: 9
    },
});