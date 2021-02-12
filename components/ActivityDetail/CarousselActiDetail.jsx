import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarousselItemActiDetail'


const { width, heigth } = Dimensions.get('window')
let flatList

const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(()=> {
        setDataList(data)
    })

    if (data && data.length) {
        return (
            <View>
                <FlatList data={data}
                ref = {(flatList) => {flatList = flatList}}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }], {useNativeDriver: false},
                    )}
                />

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: 'white', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        elevation: 6,
    },
    headerStyle: {
        fontSize: 29,
    }
})

export default Carousel