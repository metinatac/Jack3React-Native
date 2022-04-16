import React, { PureComponent } from "react";
import {Navigation} from 'react-native-navigation';
import { RequestManager } from "../Scripts/RequestManager";
import ActionSheet , {SheetManager}from "react-native-actions-sheet";
import ActionSheetButton from "../Components/ActionSheetButton";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Button,
    Alert,
} from 'react-native';
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
interface IQRCodeDetailsViewProps{
 componentId: string;
 qrCodeData: string;
 idOfViewBefore: string;
}

interface IQRCodeDetailsViewState{
  data: [],
  isLoading: Boolean,
}

 export default class QRCodeDetailsView extends React.Component<IQRCodeDetailsViewProps,IQRCodeDetailsViewState>{
   


componentWillUnmount(){
    Navigation.updateProps(this.props.idOfViewBefore, {
        enableScan: true
      });
}

componentDidMount(){
  //this.request()
  
  
}


private request = async () =>{
  const rqManager = new RequestManager;
  const result = await rqManager.sendRequest(RequestManager.Type.GET,this.props.qrCodeData)

  this.setState({
   data: result.movies,
   isLoading: false
  })
 }

    constructor(props: IQRCodeDetailsViewProps){
      super(props);
      this.state = { 
        isLoading: false,
        data: [],
        
        
      };
      
      

      
    }

    public openSheet(){
     
      SheetManager.show("HELLO");


        
         
    }


  public render(){
   

  return(
        <View style={styles.container}> 
                 {this.state.isLoading ? <ActivityIndicator/> : (
                 <View > 
                  <Button
                    title= "TEST"
                    onPress= {this.openSheet.bind(this)}
                  />
                  <ActionSheet id = "HELLO">
                    <View>
                      <ActionSheetButton
                      text="BUTTON1"
                      onPress={()=>{}}
                     />
                      <ActionSheetButton
                        text="BUTTON1"
                        onPress={()=>{}}
                        />
                     
                    </View>
                  </ActionSheet>
                    

                 </View>
                   
        )}

        </View>
  );
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
});