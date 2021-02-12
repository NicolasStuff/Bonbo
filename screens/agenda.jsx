import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Alert, Modal, TouchableHighlight, FlatList } from 'react-native';
import { ActionSheet, Root } from 'native-base';
import { connect } from 'react-redux';
import { WeekCalendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { auth, db } from '../connection/firebase';
import firebase from 'firebase';
// import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window')
let animObj = null;

function Agenda() {
  const [daySelected, setDaySelected] = useState(new Date().setHours(1,0,0,0))
  const [smileys, setSmileys] = useState('')
  const [post, setPost] = useState({})
  const [dataUser, setDataUser] = useState([])
  const [dayNumber, setDayNumber] = useState(new Date().getDay())

  const smileysImages = [
    {img: require('../assets/twemoji_angry-face.png'), number:1, feel:'vraiment très très mal.'},
    {img: require('../assets/twemoji_face-with-rolling-eyes.png'), number:2, feel:'bof bof'},
    {img: require('../assets/twemoji_beaming-face-with-smiling-eyes.png'), number:3, feel:'plutôt bien'},
    {img: require('../assets/twemoji_smiling-face-with-heart-eyes.png'), number:4, feel:'décontracté(e) et de bonne humeur'},
    {img: require('../assets/twemoji_baby-angel.png'), number:5, feel:"d'une humeur de déglingo, prêt(e) à gravir des montagnes"}
  ]
  // Search firestore data for user 
  useEffect(() => {
    const data = db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc =>{
      setDataUser(doc.data().feel)
      console.log(doc.data().feel)
      console.log('firestore :', (doc.data().feel[0].timestamp.seconds)*1000)
      console.log('test :', new Date().setHours(1,0,0,0))
    })
    return () => {
      data() 
    }
  }, [])
  console.log('daySelected', daySelected)
  // useEffect(() => {
  //   dataUser.map(feel => )
  //   return () => {
      
  //   }
  // }, [dataUser])
  

  // Calendar 
  LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';
  
  function setDayName(date){
    const optionsDate = { weekday: 'long'};
    const dayName = new Intl.DateTimeFormat('fr-FR', optionsDate).format(date).slice(0,3)
    return (dayName+'').charAt(0).toUpperCase()+dayName.substr(1)
  }
  
  const daysToDisplay = [];
  for(let i = 0; i<7; i++){
    let date = new Date(new Date().setDate(new Date().getDate()-i));
    daysToDisplay.unshift({day:setDayName(date), emotion:1})
  }

  const todayTimestamp = new Date().setHours(1,0,0,0)/1000
  console.log('todayTimestamp',todayTimestamp)
  
  const todayToDisplay = new Date(todayTimestamp *1000).toISOString().slice(0,10)
  console.log('todayToDisplay', todayToDisplay)
  let markedDatesToDisplay = {
    [todayToDisplay]:{selected: true, marked: true, selectedColor: '#FF828B'},
  }

  let array = ['2020-12-28', '2020-12-29'];
  array.map((date) =>
    markedDatesToDisplay = {...markedDatesToDisplay, [date]:{marked: true, dotColor:'#FF828B'}}, 
  )

  //Affecter un nom dynamique à la journée.
  // var dayName = dayNumber
  // if (dayNumber === 0) {
  //   dayName = 'Dimanche'
  // } else if (dayNumber === 1) {
  //   dayName = 'Lundi'
  // } else if (dayNumber === 2) {
  //   dayName = 'Mardi'
  // } else if (dayNumber === 3) {
  //   dayName = 'Mercredi'
  // } else if (dayNumber === 4) {
  //   dayName = 'Jeudi'
  // } else if (dayNumber === 5) {
  //   dayName = 'Vendredi'
  // } else if (dayNumber === 6) {
  //   dayName = 'Samedi'
  // }

  //Setteur du jour selectionné sur le calendrier
  function selectedDay (day) {
    setDaySelected(day.dateString)
  };

  //Setteurs des smiley selectionnés, création de l'object avec smiley, date de creation , récupérés grâce aux setteurs.
  const handleClickSmiley = (number) => {
    setSmileys(number)
    var postObject = new Object()
    postObject.smileys = smileys;
    postObject.date = daySelected;
    setPost(postObject)
  }

  //Choix du texte en fonction du smiley selectionné
  var feel;
  if (smileys === 1) {
    feel = 'vraiment très très mal.'
  } else if (smileys === 2) {
    feel = 'bof bof'
  } else if (smileys === 3) {
    feel = 'plutôt bien'
  } else if (smileys === 4) {
    feel = 'décontracté(e) et de bonne humeur'
  } else {
    feel = `d'une humeur de déglingo, prête à gravir des montagnes`
  }

  var ArticlesView = () => {
    return (
      <View>
        <Text style={styles.todayText}>Aujourd'hui</Text>
        <View style={{...styles.buttons, backgroundColor: '#82C4C3'}}>
          <Text style={{fontSize:40}}>💡</Text>
          {/* <Image style={styles.emoji} source={require('../assets/light-bulb.png')} style={styles.feelingsEmo} /> */}
          <View style={styles.insideTextContainer}>
            <Text style={styles.insideText}>CONSEIL D'EXPERT</Text>
            <Text style={styles.insideText}>Voir les experts</Text>
          </View>
          <TouchableOpacity style={styles.readContainer}>
            <Text style={styles.read}>Lire</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttons, backgroundColor: '#D4647C'}}>
          <Text style={{fontSize:40}}>👨‍👩‍👧‍👦</Text>
          {/* <Image style={styles.emoji} source={require('../assets/twemoji_family-man-woman-girl-boy.png')} style={styles.feelingsEmo} /> */}
          <View style={styles.insideTextContainer}>
            <Text style={styles.insideText}>SUGGESTION D'ACTIVITE</Text>
            <Text style={styles.insideText}>S'arrêter et se reposer</Text>
          </View>
          <TouchableOpacity style={styles.readContainer}>
            <Text style={styles.read}>Lire</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.buttons, backgroundColor:'#FF887E'}}>
          <Text style={{fontSize:40}}>📖</Text>
          {/* <Image style={styles.emoji} source={require('../assets/twemoji_family-man-woman-girl-boy.png')} style={styles.feelingsEmo} /> */}
          <View style={styles.insideTextContainer}>
            <Text style={styles.insideText}>UN ARTICLE POUR VOUS</Text>
            <Text style={styles.insideText}>S'arrêter et se reposer</Text>
          </View>
          <TouchableOpacity style={styles.readContainer}>
            <Text style={styles.read}>Lire</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

  }

  // const renderItemFeelingHistory = ({ item, index }) => (
  //   <View key={index} style={{ justifyContent: 'center', alignSelf: 'center', display:'flex', flex:1 }}>
  //     <Text style={styles.feelingWeekText}>{item.day}</Text>
  //     <Image source={require('../assets/twemoji_angry-face.png')} style={styles.feelingsEmo} />
  //   </View>
  // );

  var display;
  if (post.smileys === undefined || daySelected !== post.date) {
    display = (
      <View>
        <Text style={styles.greetingText}>Bonjour {auth.currentUser.displayName}, </Text>
        <Text style={styles.questionText}>Comment vous sentez vous aujourd'hui?</Text>
        <View style={styles.smileyRow}>
          {
            smileysImages.map((smiley,i) => {
              return(
                <TouchableOpacity key={i} onPress={() => { handleClickSmiley(smiley.number) }}>
                  <Image source={smiley.img} style={styles.feelingsEmo} />
                </TouchableOpacity>
              )
            })
          }
        </View>
        <ArticlesView />
      </View>
    )
  } else {
    display = (
      <View style={{flex:1}}>
        <Text style={styles.greetingText}>Vous vous sentez {feel} </Text>
        <Text style={styles.questionText}>Cette semaine a été incroyablement.....</Text>
        <Image source={require('../assets/rainbow.gif')} style={styles.rainbow} />
        <Text style={styles.questionText}>Votre humeur cette semaine</Text>
        <View style={styles.feelingWeek}>
          {
            daysToDisplay.map((day,i)=>{
              return(
                <View key={day+i} style={{ justifyContent: 'center', alignSelf: 'center', display:'flex', flex:1, justifyContent:'space-around'}}>
                  <Text style={styles.feelingWeekText}>{day.day}</Text>
                  <Image source={require('../assets/twemoji_angry-face.png')} style={styles.feelingsEmo} />
                </View>
              )
            })
          }
        </View>
        <ArticlesView />
      </View >
    )
  }


  return (
    <Root>
       <WeekCalendar style={styles.calendar}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={new Date()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => { setDaySelected(day.timestamp/1000)}}
          markedDates={markedDatesToDisplay}
        />
      <ScrollView style={styles.container}>
        {display}
      </ScrollView>
    </Root>
  );
}

function mapStateToProps(state) {
  return { newPhoto: state.picture }
}

export default connect(
  mapStateToProps,
  null
)(Agenda);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  calendar: {
    height: 60,
    padding: 15
  },
  feelingsEmo: {
    width: 35,
    height: 35,
    alignSelf: 'center'
  },
  greetingText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#767676',
    paddingTop: 45,
  },
  questionText: {
    width: width / 1.5,
    textAlign: 'center',
    fontSize: 16,
    color: '#767676',
    paddingBottom: 15,
    alignSelf: 'center'
  },
  smileyRow: {
    flexDirection: 'row',
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 50
  },
  todayText: {
    textAlign: 'left',
    marginTop: 30,
    marginLeft: 30,
    color: '#767676',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: width / 1.2,
    minHeight: 70,
    marginTop: 20,
    padding: 15,
    borderRadius: 5
  },
  thirdTip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    backgroundColor: '#FF887E',
    width: width / 1.2,
    minHeight: 70,
    marginTop: 20,
    padding: 15,
    borderRadius: 5
  },
  emoji: {
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
  },
  insideTextContainer: {
    alignSelf: 'center'
  },
  insideText: {
    color: 'white',
    fontSize: 14
  },
  read: {
    textAlign: 'center',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5
  },
  readContainer: {
    alignSelf: 'center',
  },
  rainbow: {
    width: width / 1.8,
    height: 100,
    alignSelf: 'center'
  },
  feelingWeek: {
    flex:1,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: width/1.2,
    backgroundColor: '#F8F8F8',
    height: 80,
    paddingHorizontal: 10,
    paddingTop: 5,
    borderRadius: 20
  },
  feelingWeekText: {
    textAlign: 'center',
    paddingBottom: 10,
    width:'100%'
  }
});


  // const handleClickFrown=() =>{
  //   setSmiley("bof bof ...")
  // };
  // const handleClickMiddle=() =>{
  //   setSmiley("plutôt pas mal")
  // };
  // const handleClickSmily=() =>{
  //   setSmiley("tellement ouf !!!")
  // };



  //Création de l'object avec smiley, date de creation du post, text associer.

  // const handleClickValidate = () => {
  //   var postObject = new Object()
  //   postObject.smiley = smiley;
  //   postObject.date = selectedDate;
  //   postObject.text = messageText;
  //   postObject.photo = props.newPhoto;
  //   setPost(postObject)
  // }
  //Allow to edit your post

  // console.log('photo avant affichage',props)

  //condition qui affiche un placeholder si : pas de post OU la date du post n'est pas la même que la date selectionner
  // var affichage;
  // if((post.text === "") && (post.photo === undefined) && (post.date !==selectedDate) ){
  //   console.log("cas vide")
  //   affichage = (
  //       <View>
  //         <Text style={styles.feelings}>Vous n'avez rien publié pour l'instant</Text>
  //       </View>
  //       )
  // } else if(post.text === "" && post.photo && post.date ===selectedDate){
  //   console.log("cas photo")
  //   affichage=
  //       <View style={styles.shareResultImageOnly}>
  //          <View>
  //          <Text style={styles.feelingText}>Aujourd'hui, votre humeur est {smiley}</Text>
  //         <TouchableOpacity onPress={()=>handleClickEdit()} >
  //         <Image style={styles.editIcon} source={require('../assets/edit.png')}/>
  //         </TouchableOpacity>
  //       </View>
  //         <Image style={styles.shareResultImage} source={{uri:post.photo.uri}}></Image>  
  //       </View>

  // } else if(post.text && post.photo === undefined && post.date ===selectedDate){
  //   console.log("cas texte")
  //   affichage=
  //       <View style={styles.shareResultTextOnly}>
  //         <View>
  //         <Text style={styles.feelingText}>Aujourd'hui, votre humeur est {smiley}</Text>
  //         <TouchableOpacity onPress={()=>handleClickEdit()} >
  //         <Image style={styles.editIcon} source={require('../assets/edit.png')}/>
  //         </TouchableOpacity>
  //       </View>
  //         <Text style={styles.shareResultText}>{post.text}</Text>
  //       </View>

  // } else if (post.text && post.photo && post.date ===selectedDate){
  //   console.log("cas photo et texte")
  //   affichage= (
  //       <View style={styles.shareResult}>
  //         <View >
  //           <Text style={styles.feelingText}>Aujourd'hui, votre humeur est {smiley}</Text>
  //           <TouchableOpacity onPress={()=>handleClickEdit()} >
  //           <Image style={styles.editIcon} source={require('../assets/edit.png')}/>
  //           </TouchableOpacity>
  //       </View>
  //         <Text style={styles.shareResultText}>{post.text}</Text>
  //         <Image style={styles.shareResultImage} source={{uri:post.photo.uri}}></Image>  
  //       </View>
  //     )

  // }



  //var modal;

  // if((post.date === undefined) || (post.date !== selectedDate)){
  //   console.log("cas modal vide")
  //   modal = 
  //   <View style={styles.centeredView}>
  //   <View style={styles.modalView}>
  //   <Text style={styles.feelings}>Comment vous sentez vous aujourd'hui?</Text>
  //     <View style={styles.smileyContainer}>
  //       <TouchableOpacity style={styles.frown} onPress={()=>handleClickFrown()}>
  //         <Image style={styles.smileys} source={require('../assets/bi_emoji-frown.png')}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.middle} onPress={()=>handleClickMiddle()} >
  //         <Image style={styles.smileys} source={require('../assets/bi_emoji-neutral.png')}/>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.smily} onPress={()=>handleClickSmily()} >
  //         <Image style={styles.smileys} source={require('../assets/bi_emoji-laughing.png')}/>
  //       </TouchableOpacity>
  //   </View>
  //     <TextInput
  //     style={{  height: 150,
  //               width:width/1.4,
  //               borderColor: 'gray',
  //               borderRadius:30,
  //               borderWidth: 2,
  //               textAlign:'center',
  //               marginBottom:'5%'
  //           }}
  //     onChangeText={text => onChangeText(text)}
  //     value={messageText}
  //   />
  //     <View style={{flexDirection:'row',}}>
  //         <TouchableOpacity onPress={() => onClickAddImage()} style={styles.cameraButton}>
  //           <Image style={styles.cameraIcon} source={require('../assets/camera.png')} />
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           style={{ ...styles.openButton, backgroundColor: "#FF6B6B" }}
  //           onPress={() => {
  //             //setModalVisible(!modalVisible);
  //             handleClickValidate();

  //           }}
  //         >
  //         <Text style={styles.textStyle} >Publier</Text>
  //         </TouchableOpacity>
  //     </View>
  //   </View>
  // </View>
  // }