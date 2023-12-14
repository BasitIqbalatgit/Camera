import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import {Button} from "react-native-paper"

function ViewPicture() {
    const [imageDataList, setImageDataList] = useState([]);
    const [selectedName, setSelectedName] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imageCollection = collection(db, 'images');
                const snapshot = await getDocs(imageCollection);

                const imageList = snapshot.docs.map((doc) => doc.data());
                setImageDataList(imageList);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImageData();
    }, []);

    const handleNameClick = (name) => {
        setSelectedName(name);
    };

    const handleHideImage = () => {
        setSelectedName(null);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNameClick(item.name)}>
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{item.name}</Text>
                {selectedName === item.name && (
                    <View style={styles.imageContainer}>
                        <Text style={styles.text}>Selected Image: {item.name}</Text>
                        <Image source={{ uri: item.url }} style={styles.image} />
                        <Button mode="contained" onPress={handleHideImage} style={{ marginTop:5,backgroundColor: '#8B4513' }}>Hide Image </Button>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={imageDataList}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius:10
    },
});

export default ViewPicture;