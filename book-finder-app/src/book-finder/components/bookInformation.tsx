import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { BookType } from '../types/bookType';

interface PropsType {
    book: BookType;
}

export default function BookInformation(props: PropsType){

    const [expanded, setExpanded] = useState<boolean>(false);

    const {navigate} = useNavigation();

    useEffect(() => {

    }, []);
        

    return (
        expanded ? (
            <TouchableOpacity onPress={() => setExpanded(false)}>
                <View style={styles.expandedContainer}>
                    <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Image 
                            style={{width: 80, height: 100}}
                            source={{uri:"https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.63"}}
                        />
                    </View>
                    <View style={{flex: 7, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Titolo: {props.book.title}</Text>
                        <Text style={styles.label}>Autore: {props.book.author}</Text>
                        <Text style={styles.label}>Editore: {props.book.editor}</Text>
                        <Text style={styles.label}>ISBN: 136545787687645</Text>
                        <Text style={styles.label}>Universit&agrave;: Politecnico di Milano</Text>
                        <Text style={styles.label}>Venditore: Marco Rossi</Text>
                        <Button title="Contatta" onPress={() => navigate("Chat", {otherUserEmail: props.book.sellerEmail})}/>
                    </View>
                    <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Text style={styles.label}>{props.book.price}&euro;</Text>
                    </View>
                </View>
            </TouchableOpacity> 
        )
        : 
        (
            <TouchableOpacity onPress={() => setExpanded(true)}>
                <View style={styles.container}>
                    <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Image 
                            style={{width: 80, height: 80}}
                            source={{uri:"https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.63"}}
                        />
                    </View>
                    <View style={{flex: 7, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                        <Text style={styles.label}>Titolo: {props.book.title}</Text>
                        <Text style={styles.label}>Autore: {props.book.author}</Text>
                        <Text style={styles.label}>Editore: {props.book.editor}</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Text style={styles.label}>{props.book.price}&euro;</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 12, 
        flexDirection: 'row', 
        height: 100, 
        borderBottomWidth: 0.5, 
        borderColor: 'black', 
        alignContent: 'center'
    },
    expandedContainer:{
        flex: 12, 
        flexDirection: 'row', 
        height: 300, 
        borderBottomWidth: 0.5, 
        borderColor: 'black', 
        alignContent: 'center'
    },
    label: {
        fontFamily: 'Cardo-Regular'
    }
});