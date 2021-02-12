import React, {useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import {connect} from 'react-redux';

function cameraScreen(props) {
  const[hasPermission, setHasPermission] = useState(null);
  // console.log(picture)
  const [type, setType] = useState(Camera.Constants.Type.front);

// console.log(props)
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })(),
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }, []);

  var camera = useRef(null);

  var takePicture = async () => {
    if (camera) {
      // console.log("Je suis passé")
      let photo = await camera.current.takePictureAsync(); 
      // console.log("photo dans CameraScreen",photo.uri)
      props.handlePicture(photo)
      props.navigation.navigate("Agenda");
      // picture = photo;
    }
  }

    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={camera} type={type}>
          <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>takePicture()}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                  >
                  <MaterialCommunityIcons
                      name="camera-switch"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
          </Camera>
        </View>
    )
  }
  function mapDispatchToProps(dispatch) {
    return {
      handlePicture: function(picture) {
        // console.log('la photo',picture) 
          dispatch( {type: 'AddPicture', newPicture : picture} ) 
      }

      }
    }
  
  
  export default connect(
    null, 
    mapDispatchToProps
)(cameraScreen);