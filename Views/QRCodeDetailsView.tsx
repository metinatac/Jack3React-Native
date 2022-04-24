import * as React from "react";
import { Navigation } from 'react-native-navigation';
import { RequestManager } from "../Scripts/RequestManager";
import { SelectedFile } from "../Scripts/SelectedFile";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import ActionSheetButton from "../Components/ActionSheetButton";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
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
  PermissionsAndroid,
  Permission,
} from 'react-native';
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
interface IQRCodeDetailsViewProps {
  componentId: string;
  qrCodeData: string;
  idOfViewBefore: string;
}

interface IQRCodeDetailsViewState {
  data: [],
  isLoading: Boolean,
  result: SelectedFile[]
}

export default class QRCodeDetailsView extends React.Component<IQRCodeDetailsViewProps, IQRCodeDetailsViewState>{

  componentWillUnmount() {
    Navigation.updateProps(this.props.idOfViewBefore, {
      enableScan: true
    });
  }

  componentDidMount() {
    this.makeReq();

  }

  private makeReq = async () => {
    const rM = new RequestManager();
    rM.doGetRequestv2('https://192.168.178.21:8443/fileuploadservlet')
  }

  private request = async () => {
    const rqManager = new RequestManager;
    const result = await rqManager.sendRequest(RequestManager.Type.GET, this.props.qrCodeData)

    this.setState({
      data: result.movies,
      isLoading: false
    })
  }
  constructor(props: IQRCodeDetailsViewProps) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      result: []

    };
  }
  public Sheet(show: boolean) {

    const sheetKey: string = "HELLO"
    if (show) {
      console.warn("OPEN SHEET")
      SheetManager.show(sheetKey)
    } else {
      SheetManager.hide(sheetKey)
    }

  }

  public openMultiPicker() {
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
    DocumentPicker.pickMultiple().then((value) => {
      var tmpConvertedFiles: SelectedFile[] = [value.length]
      value.forEach(function (value, index) {
        tmpConvertedFiles[index] = new SelectedFile(
          {
            uri: value.uri,
            type: value.type!,
            fileSize: value.size!,
            fileName: value.name!,
          });
        console.log(tmpConvertedFiles[index].fileName);
      });


      this.setState({ result: this.state.result.concat(tmpConvertedFiles) })

    }).catch(handleError)
  }
  async openCamera() {
    this.Sheet(false);
    const permissionStatus = await this.checkPermisson(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, "", "", "");
    const result = await launchCamera({ saveToPhotos: true, mediaType: 'photo' });
    if (result.errorCode !== undefined) {
      console.error(result.errorCode);
    }
    const tmpFileCount = this.state.result.length;
    if (result.assets !== undefined) {
      var tmpConvertedFiles: SelectedFile[] = [result.assets.length]
      result.assets.forEach(function (value, index) {
        tmpConvertedFiles[index] = new SelectedFile(value);
        tmpConvertedFiles[index].fileName = "Image_" + (tmpFileCount + index + 1) + ""
      });
      this.setState({ result: this.state.result.concat(tmpConvertedFiles) })
      // }
    }
  }

  async openGallery() {
    this.Sheet(false);
    const permissionStatus = await this.checkPermisson(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, "", "", "");
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets !== undefined) {
      var tmpConvertedFiles: SelectedFile[] = [result.assets.length]
      const tmpFileCount = this.state.result.length;
      result.assets.forEach(function (value, index) {
        tmpConvertedFiles[index] = new SelectedFile(value);
        tmpConvertedFiles[index].fileName = "Image_" + (tmpFileCount + index + 1) + ""
      });
      console.log(tmpConvertedFiles[0].id);
      this.setState({ result: this.state.result.concat(tmpConvertedFiles) })
    }
  }


  public render() {
    console.warn(this.state.result.length)
    return (
      <View style={styles.container}>
        {this.state.isLoading ? <ActivityIndicator /> : (
          <View style={styles.container2}>
            <SectionList
              sections={[{ title: 'Dokumente', data: this.state.result }]}
              renderItem={({ item }) =>
                <FileCard
                  filename={item.fileName}
                  fileType={item.type}
                  onEdit={() => { }}
                  onRemove={() => { }}
                ></FileCard>

              }
            />

            <Button
              title="TEST"
              onPress={this.Sheet.bind(this, true)}
            />
            <ActionSheet id="HELLO">
              <View>
                <ActionSheetButton
                  text="Neues Foto"
                  onPress={this.openCamera.bind(this)}
                />
                <ActionSheetButton
                  text="Aus Gallerie wählen "
                  onPress={this.openGallery.bind(this)}
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


  async checkPermisson(forPermisson: Permission, titleText: string, messageText: string, buttonPositiveLable: string, buttonNeutralLable?: string, buttonNegativeLable?: string) {
    try {
      const granted = await PermissionsAndroid.request(
        forPermisson,
        {
          title: titleText,
          message: messageText,

          buttonNeutral: buttonNeutralLable,
          buttonNegative: buttonNegativeLable,
          buttonPositive: buttonPositiveLable
        }
      );
      return granted; // tpye -> PermisssionStatus
    } catch (err) {
      console.warn(err);
    }
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

