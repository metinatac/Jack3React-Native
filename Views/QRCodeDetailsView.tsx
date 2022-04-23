import * as React from "react";
import {Navigation} from 'react-native-navigation';
import { RequestManager } from "../Scripts/RequestManager";
import ActionSheet , {SheetManager}from "react-native-actions-sheet";
import ActionSheetButton from "../Components/ActionSheetButton";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import FileCard from "../ViewComponents/FileCard";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Button,
    Alert,
    SectionList,
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
  result: DirectoryPickerResponse[]
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
        result:[]
        
      };
    }
    public Sheet(show:boolean){
      
     const sheetKey:string = "HELLO"
      if(show){
        console.warn("OPEN SHEET")
        SheetManager.show(sheetKey)
      }else{
        SheetManager.hide(sheetKey)
      }
      
    }

    public openMultiPicker(){
      this.Sheet(false)
      const handleError = (err: unknown) => {
          if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
          } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
          } else {
            throw err
          }
        }
      DocumentPicker.pickMultiple().then((value) =>{
        this.setState({result: this.state.result.concat(value)})
        
      }).catch(handleError)
    }

  public render(){
    console.warn(this.state.result.length)
  return(
        <View style={styles.container}> 
                 {this.state.isLoading ? <ActivityIndicator/> : (
                 <View style={styles.container2}> 
                   <SectionList
                   sections={[{title: 'Dokumente', data: this.state.result}]}
                   renderItem={({item}) => 
                    <FileCard
                    filename={item.name}
                    fileType={item.fileType}
                    onEdit={() =>{}}
                    onRemove={()=>{}}
                    ></FileCard>
                    
                  }
                   />
           
                  <Button
                    title= "TEST"
                    onPress= {this.Sheet.bind(this,true)}
                  />
                  <ActionSheet id = "HELLO">
                    <View>
                      <ActionSheetButton
                      text="BUTTON1"
                      onPress={()=>{}}
                     />
                      <ActionSheetButton
                        text="Dokument wählen"
                        onPress={this.openMultiPicker.bind(this)}
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
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
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

