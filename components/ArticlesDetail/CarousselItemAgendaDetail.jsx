import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    return (
        //Display of the Caroussel 
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
            {/* <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width ,
        height: height / 3,
        backgroundColor: 'white',
        // margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: width,
        height: height / 3,
        borderRadius: 10
    },
})

export default CarouselItem
