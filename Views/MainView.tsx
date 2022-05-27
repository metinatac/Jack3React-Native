import React, { PureComponent } from "react";
import {RNCamera} from 'react-native-camera';
import {Navigation} from 'react-native-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequestManager } from "../Scripts/RequestManager";
import CustomButton from "../ViewComponents/CustomButton";
import { Resources } from "../Constants";
import {
    View,
    StyleSheet,
    Button
} from 'react-native';



interface IMainViewProps{
 componentId: string;
}

interface IMainViewState{
    cameraIsActive: boolean;
    qrCodeData: string;
   
}

export default class MainView extends React.Component<IMainViewProps,IMainViewState>{
   
    constructor(props: IMainViewProps){
      super(props);
     this.state = {
         cameraIsActive: true,
         qrCodeData: "",
     }

    this.onQRDetected = this.onQRDetected.bind(this)
    }


    private onQRDetected(data: any){
        console.log(data.data)
        this.setState({cameraIsActive: false, qrCodeData: data.data})
    }
  
  public render(){
  return(
        <View style={styles.container}> 
             <CustomButton
                style={styles.customButtoncontainer}
                text="Scanner starten"
                onPress={this.openCameraView.bind(this)}
                icon={Resources.qrCodeIcon}
                borderRadius={50}
                iconPaddingLeft={50}
                textPaddingLeft={20}
              />
        </View>
  );
}


private openCameraView() {
    Navigation.push(this.props.componentId, {
        component: {
            name: 'CameraView',
            passProps: {
                isQRScanner: true,
                enableScan: true,
            },
            options: {
                topBar:{
                   visible:false
                }
            }
        }
    })
}
        
    




 }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
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
  customButtoncontainer: {
    justifyContent: 'space-evenly',
  },
});