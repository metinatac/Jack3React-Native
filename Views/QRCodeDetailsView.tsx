import * as React from 'react';
import {Navigation} from 'react-native-navigation';
import {RequestManager} from '../Scripts/RequestManager';
import {SelectedFile} from '../Scripts/SelectedFile';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import ActionSheetButton from '../Components/ActionSheetButton';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FileCard from '../ViewComponents/FileCard';
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
import {DebugInstructions} from 'react-native/Libraries/NewAppScreen';
import CustomButton from '../ViewComponents/CustomButton';
import {Colors, Resources} from '../Constants';

export function getNewFilesArray(
  fileIndex: number,
  _filesArray: SelectedFile[],
): Array<SelectedFile> {
  if (_filesArray.length == 1) {
    return new Array<SelectedFile>();
  }
  console.log(_filesArray);
  var tmpNewFilesArray: SelectedFile[] = new Array<SelectedFile>(
    _filesArray.length - 1,
  );
  var tmpIndex = 0;

  _filesArray.forEach(function (value, index) {
    if (fileIndex !== index) {
      tmpNewFilesArray[tmpIndex] = value;
      tmpIndex++;
    }
  });
  console.log(tmpNewFilesArray);
  return tmpNewFilesArray;
}

interface IQRCodeDetailsViewProps {
  componentId: string;
  qrCodeData: string;
  idOfViewBefore: string;
}

interface IQRCodeDetailsViewState {
  data: [];
  isLoading: Boolean;
  result: SelectedFile[];
}

export default class QRCodeDetailsView extends React.Component<
  IQRCodeDetailsViewProps,
  IQRCodeDetailsViewState
> {
  componentWillUnmount() {
    Navigation.updateProps(this.props.idOfViewBefore, {
      enableScan: true,
    });
  }

  componentDidMount() {
    //this.makeReq();
    /*
    let formd = new FormData();
    formd.append("file", {uri: '/Users/harun_melike_ilyas/git/Jack3React-Native/Assets/Download.png', name: 'Download.png', type: 'image/png'})
    */

    this.makeReqv3();
  }

  private filesArray: SelectedFile[] = [];

  private makeReq = async () => {
    const rM = new RequestManager();
    rM.doGetRequestv2('https://192.168.0.234:8443/fileuploadservlet');
  };
  private makeReqv3 = async () => {
    const rM = new RequestManager();
    rM.doGetRequestv3(
      this.filesArray[0],
      'https://192.168.0.234:8443/fileuploadservlet'
    );
  };

  private request = async () => {
    const rqManager = new RequestManager();
    const result = await rqManager.sendRequest(
      RequestManager.Type.GET,
      this.props.qrCodeData,
    );

    this.setState({
      isLoading: false,
    });
  };
  constructor(props: IQRCodeDetailsViewProps) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      result: [],
    };
  }
  public Sheet(show: boolean) {
    const sheetKey: string = 'HELLO';
    if (show) {
      console.log('OPEN SHEET');
      SheetManager.show(sheetKey);
    } else {
      SheetManager.hide(sheetKey);
    }
  }

  public openMultiPicker() {
    this.Sheet(false);
    const handleError = (err: unknown) => {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancelled');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else if (isInProgress(err)) {
        console.log(
          'multiple pickers were opened, only the last will be considered',
        );
      } else {
        throw err;
      }
    };
    DocumentPicker.pickMultiple()
      .then(value => {
        var tmpConvertedFiles: SelectedFile[] = new Array<SelectedFile>(
          value.length,
        );
        value.forEach(function (value, index) {
          tmpConvertedFiles[index] = new SelectedFile({
            uri: value.uri,
            type: value.type!,
            fileSize: value.size!,
            fileName: value.name!,
          });
          console.log(tmpConvertedFiles[index].fileName);
        });

        this.filesArray = this.filesArray.concat(tmpConvertedFiles);
        this.setState({result: this.state.result.concat(tmpConvertedFiles)});
      })
      .catch(handleError);
  }
  async openCamera() {
    this.Sheet(false);
    const permissionStatus = await this.checkPermisson(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      '',
      '',
      '',
    );
    const result = await launchCamera({saveToPhotos: true, mediaType: 'photo'});
    if (result.errorCode !== undefined) {
      console.error(result.errorCode);
    }
    const tmpFileCount = this.state.result.length;
    if (result.assets !== undefined) {
      var tmpConvertedFiles: SelectedFile[] = new Array<SelectedFile>(
        result.assets.length,
      );
      result.assets.forEach(function (value, index) {
        tmpConvertedFiles[index] = new SelectedFile(value);
        tmpConvertedFiles[index].fileName =
          'Image_' + (tmpFileCount + index + 1) + '';
      });
      this.filesArray = this.filesArray.concat(tmpConvertedFiles);
      this.setState({result: this.state.result.concat(tmpConvertedFiles)});
      // }
    }
  }

  async openGallery() {
    this.Sheet(false);
    const permissionStatus = await this.checkPermisson(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      '',
      '',
      '',
    );
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets !== undefined) {
      var tmpConvertedFiles: SelectedFile[] = new Array<SelectedFile>(
        result.assets.length,
      );
      const tmpFileCount = this.state.result.length;
      result.assets.forEach(function (value, index) {
        tmpConvertedFiles[index] = new SelectedFile(value);
        tmpConvertedFiles[index].fileName =
          'Image_' + (tmpFileCount + index + 1) + '';
      });

      this.filesArray = this.filesArray.concat(tmpConvertedFiles);
      console.log(this.filesArray);
      this.setState({result: this.state.result.concat(tmpConvertedFiles)});
    }
  }

  public render() {
    this.filesArray = this.state.result;
    console.log(this.state.result.length);
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container2}>
            <SectionList
              style={styles.sectionListContainer}
              sections={[{title: 'Dokumente', data: this.state.result}]}
              renderItem={({item, index}) => (
                <FileCard
                  files={this.filesArray}
                  file={item}
                  index={index}
                  onEdit={this.editFile.bind(this)}
                  onRemove={this.removeFile.bind(this)}></FileCard>
              )}
            />

            <View style={styles.controllButtonsContainer}>
              <CustomButton
                style={styles.customButtoncontainer}
                text="Hochladen"
                onPress={this.makeReqv3.bind(this)}
                icon={Resources.uploadIcon}
                borderRadius={50}
                iconPaddingLeft={50}
                textPaddingLeft={20}
                isActive={this.filesArray.length < 1 ? false : true}
              />

              <CustomButton
                text=""
                onPress={this.Sheet.bind(this, true)}
                icon={Resources.addIcon2}
                borderRadius={50}
              />
            </View>

            <ActionSheet id="HELLO">
              <View>
                <ActionSheetButton
                  text="Neues Foto"
                  onPress={this.openCamera.bind(this)}
                  icon={Resources.cameraIcon}
                />
                <ActionSheetButton
                  text="Aus Gallerie wählen "
                  onPress={this.openGallery.bind(this)}
                  icon={Resources.galleryIcon}
                />
                <ActionSheetButton
                  text="Dokument wählen"
                  onPress={this.openMultiPicker.bind(this)}
                  icon={Resources.fileIcon}
                />
              </View>
            </ActionSheet>
          </View>
        )}
      </View>
    );
  }

  private editFile(_index: number, _files: SelectedFile[]) {}

  private removeFile(_index: number, _files: SelectedFile[]) {
    this.setState({result: getNewFilesArray(_index, _files)});
  }

  async checkPermisson(
    forPermisson: Permission,
    titleText: string,
    messageText: string,
    buttonPositiveLable: string,
    buttonNeutralLable?: string,
    buttonNegativeLable?: string,
  ) {
    try {
      const granted = await PermissionsAndroid.request(forPermisson, {
        title: titleText,
        message: messageText,

        buttonNeutral: buttonNeutralLable,
        buttonNegative: buttonNegativeLable,
        buttonPositive: buttonPositiveLable,
      });
      return granted; // tpye -> PermisssionStatus
    } catch (err) {
      console.log(err);
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
    width: '100%',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
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

  sectionListContainer: {
    width: '100%',
  },
  controllButtonsContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  customButtoncontainer: {
    justifyContent: 'space-evenly',
  },
});
