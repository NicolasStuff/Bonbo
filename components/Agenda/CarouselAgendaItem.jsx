import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'


const { width, height } = Dimensions.get('window')

// Receiving Ited Data and Navigation
const CarouselItem = ({ item, navigation }) => {
    return (
    // Button to navigate to Caroussel Details
    <TouchableOpacity style={styles.cardView}
        onPress={() => navigation.navigate('detailsArticles')}>
        {/* Display of the Card Data */}
        <Image style={styles.image} source={{ uri: item.url }} />
        <View style={styles.textView}>
            <Text style={styles.itemTitle}> {item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
    </TouchableOpacity>
    

    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 100,
        height: height / 2.7,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0.5, height: 0.5 },
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
        // left: 5,
    },
    image: {
        width: width - 100,
        height: height / 4,
        borderRadius: 10
    },
    itemTitle: {
        color: '#767676',
        fontSize: 18,
        // shadowColor: '#000',
        // shadowOffset: { width: 0.8, height: 0.8 },
        // shadowOpacity: 1,
        // shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: '#767676',
        fontSize: 12,
        // shadowColor: '#000',
        // shadowOffset: { width: 0.8, height: 0.8 },
        // shadowOpacity: 1,
        // shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem