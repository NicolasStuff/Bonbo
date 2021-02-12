import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View ,Image, Button, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import { db } from '../connection/firebase';
const { width, height } = Dimensions.get('window')




 function detailsDeals(props) {
   var newDeal = props.newDeal

  var docRef = db.collection("deals").doc("Z5RjotavdZpzwgYgWhOS");
  
  docRef.get().then(function(doc) {
      if (doc.exists) {
          // console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          // console.log("No such document!");
      }
  }).catch(function(error) {
      // console.log("Error getting document:", error);
  });

    return (
      <ScrollView horizontal={false}>
        <View>
        <Image style={styles.header_detailsDeals} source={{uri:newDeal.logo}} />
        <Text style={styles.text_detailsDeals}>{newDeal.description}</Text>
        <ScrollView  
            horizontal={true}
            style={styles.carousel_detailsDeals}>
            <Image style={styles.pictureCarousel_detailsDeals} source={require('../assets/chambre2.png')}/>
            <Image style={styles.pictureCarousel_detailsDeals} source={require('../assets/chambre1.png')}/>
            <Image style={styles.pictureCarousel_detailsDeals} source={require('../assets/chambre3.png')}/>
            <Image style={styles.pictureCarousel_detailsDeals} source={require('../assets/chambre2.png')}/>
            <Image style={styles.pictureCarousel_detailsDeals} source={require('../assets/chambre1.png')}/>
        </ScrollView>
        <Text style={styles.discountText_detailsDeals}>
          <Text style={styles.discountTextNumber_detailsDeals}>
            {newDeal.deals}
          </Text>
              sur les armoires et meubles avec le code:
        </Text>
          <Text style={styles.code_detailsDeals}>{newDeal.discountCode}</Text>
        </View>
      </ScrollView>
    );
  }

  function mapStateToProps(state) {
    return { newDeal: state.deal }
  }
    
  export default connect(
    mapStateToProps,
    null
  )(detailsDeals);


const styles = StyleSheet.create({
  header_detailsDeals:{
    marginTop:10,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'contain',
    width: 100,
    height: 100,
  },
  text_detailsDeals:{
    textAlign:'center',
    alignSelf: "center",
    margin: 20,
    fontSize:16,
  },
  carousel_detailsDeals:{
    marginTop:20,
    height: 150,
  },
  pictureCarousel_detailsDeals:{
    height:'100%',
    marginLeft:1,
  },
  discountText_detailsDeals:{
    textAlign:'center',
    fontSize:18,
    marginTop:25,
    
  },
  discountTextNumber_detailsDeals:{
    fontWeight:'bold',
    alignSelf:'center'
  },
  code_detailsDeals:{
    textAlign:'center',
    alignSelf:'center',
    fontSize:25,
    color:'white',
    borderRadius:5,
    marginTop:'10%',
    backgroundColor:'#FF828B',
    height:50,
    width:width/1.4,
    paddingTop:10,
  } 
  });