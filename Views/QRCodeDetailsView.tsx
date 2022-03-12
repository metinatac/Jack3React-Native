import React, { PureComponent } from "react";
import {Navigation} from 'react-native-navigation';
import { RequestManager } from "../Scripts/RequestManager";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from 'react-native';
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
  this.request()
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
        isLoading: true,
        data: []
      };
      
      

      
    }
  public render(){
  
  return(
        <View style={styles.container}> 
                 {this.state.isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
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