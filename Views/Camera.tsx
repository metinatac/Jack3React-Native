import React, { Component } from "react";
import {RNCamera} from 'react-native-camera';
import {Navigation} from 'react-native-navigation';
import {
    View,
    Text, 
    StyleSheet,
    Image
} from 'react-native';
import { throwStatement } from "@babel/types";

interface ICameraProps{
  isQRScanner: boolean;
  componentId: string;
  enableScan: boolean;
}

interface ICameraState{
  isActive: boolean;
}



const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );


function onBarCodeRead(scanResult: any){

    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
	
	  console.warn(scanResult.data);
	
    }
    return;
  }
  


export default class Camera extends React.Component<ICameraProps,ICameraState>{
    constructor(props: ICameraProps){
      super(props);
      this.state = {isActive: true,};
      
    }
  
    private enabel = true;

    componentDidUpdate(){ // Wird aufgerufen, wenn sich die PROPS updatend. PS: Kein setState aufrufen -> endless Rendering wird aufgerufen
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
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <View />;
            if(!this.props.isQRScanner)
            return ( // -> Spaeter ein Button zum Foto schießen einfügen
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
              </View>
            );
          }}
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
          name: 'QRCodeDetailsView',
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