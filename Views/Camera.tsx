import React from "react";
import {RNCamera} from 'react-native-camera';
import {Navigation} from 'react-native-navigation';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';

interface ICameraProps{
  isQRScanner: boolean;
  componentId: string;
  enableScan: boolean;
}

interface ICameraState{
  isActive: boolean;
}

export default class Camera extends React.Component<ICameraProps,ICameraState>{
    constructor(props: ICameraProps){
      super(props);
      this.state = {isActive: true,};
    }
  
    private enabel = true;

    componentDidUpdate(){ // Wird aufgerufen, wenn sich die PROPS aktualisieren. Kein setState aufrufen -> Endloses Rendering wird aufgerufen
        this.enabel = this.props.enableScan
    }

  public render(){
    return(
        <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead = {this.openDetailsView.bind(this)}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',

          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
        </RNCamera>
        <View style= {styles.merged}>
          <Image
            style = {styles.scanIndicator}
            source={require('../Assets/scanIndicator.png')}
            />
        </View>    
      </View>
    );
  }

private openDetailsView(data:any){
  if(this.enabel){
    this.enabel = false;
    Navigation.push(this.props.componentId, {
      component: {
          name: 'UploadView',
          passProps: {
              isQRScanner: true,
              idOfViewBefore: this.props.componentId,
              qrCodeData: data.data,
          },
          options: {
              topBar:{
                 title:{
                     text: "Hallo, "+ JSON.parse(data.data).user
                 }
              }
          }
      }
  })

  }
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  merged: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems:'center',
  },
  scanIndicator: {
    width :300,
    height:300,
  }

});