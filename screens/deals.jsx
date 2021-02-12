import React,{useEffect, useState} from 'react';
import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View,Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import {connect} from 'react-redux';

import { db } from '../connection/firebase';

function Deals(props) {
  
  const [dataPars, setDataPars] = useState([])

  //Access to Firestore to get data from deals at lauching
  
  useEffect(()=>{
    const getDeals = async()=>{
    const dealsDataRef = db.collection('deals');
    const snapshot = await dealsDataRef.get();
    const results = [];
    snapshot.forEach(doc => {
      results.push(doc.data());
      setDataPars(results);
    })
  }
  getDeals()
  },[]
);
console.log(dataPars)


  const getHeader = () => {
    return (
      <View>
         <Image style={styles.header_deals}
            source={require('../assets/deals_background.png')}
            />
            <Image style={styles.bobon_logo_deals}
            source={require('../assets/bonbo_logo.png')}
            />
            <Text style={styles.text_header_deals}>Réductions du mois de Novembre de -15 à -50%</Text>
      </View>
    )
  };

  const handleClickDeal = (item)=>{
  console.log('passé dans le clic', item);
  props.navigation.navigate('detailsDeals')         //Navigation to dealsDetail page
  props.sendDealtoDealDetail(item)                //sending dealData to dealsDetail via Redux
  }
  console.log('ya',dataPars)
  return (
        <FlatList
          horizontal={false} 
          showsHorizontalScrollIndicator={false} 
          data={dataPars}
          keyExtractor = { (item, index) => index.toString() }
          ListHeaderComponent={getHeader}
          renderItem={ ({ item, index }) => (
            <View style={styles.background}>
              <TouchableOpacity onPress={()=>handleClickDeal(item)} style={styles.container} >
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.logo}} // Use item to set the image source
                    key={index} // Important to set a key for list items
                    style={{
                      height:'70%',
                      width:width/3.2,
                      marginTop:'auto',
                      marginBottom:'auto',
                      marginRight:20,
                      marginLeft:20,
                      borderWidth:2,
                    }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>{item.company}</Text>
                  <Text style={styles.textDiscount}>{item.deals}</Text>
                  <Text style={styles.textDate}>{item.date}</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
        />
    );
  };

  function mapDispatchToProps(dispatch) {
    return {
      sendDealtoDealDetail: function(item) {
        dispatch({type:'sendDealtoDealDetail',
                deal:item})
  }
    
}
	
}
export default connect(
    null, 
    mapDispatchToProps
    )(Deals);

  const styles = StyleSheet.create({
    header_deals: {
      marginTop: '8%',
    },
    bobon_logo_deals:{
      position:'absolute',
      top:'30%',
      left:'45%',
      width: 53,
      height: 60,
    },
    text_header_deals:{
      position:'absolute',
      marginTop:'42%',
      marginLeft:'2%',
      width:'65%',
      fontSize:17,
      color:'white',
    },
    background:{
      backgroundColor:'white'
    },
    container:{
      flexDirection:'row',
      justifyContent:'flex-start',
      backgroundColor:'white',
      marginTop:15,
      height:96
    },
    imageContainer:{
      height:100,
      backgroundColor: "#D9E1E5",
      borderRadius:5,
      
    },
    textContainer:{
      alignSelf:'center',
      marginLeft:30
    },
    textTitle:{
      fontSize:14,
      marginBottom: 9,
      fontWeight:'bold',
    },
    textDiscount:{
      fontSize:14,
      fontWeight:'bold'
    }
    

    
  });