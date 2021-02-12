import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Carousel from '../components/Activity/CarouselActi';
import Caroussel from '../components/ArticlesDetail/CarousselAgendaDetail.jsx'
import {dummyData} from '../data/DataConseils'

export default function Bonbo({navigation}) {
    return (
      <View>
        {/* <Text>Agenda Kids friendly</Text> */}
        <Caroussel data = {dummyData} navigation = {navigation}></Caroussel>
      </View>
    );
  }