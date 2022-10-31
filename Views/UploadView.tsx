import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { RequestManager } from '../Scripts/RequestManager';
import { SelectedFile } from '../Scripts/SelectedFile';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import ActionSheetButton from '../Components/ActionSheetButton';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FileCard from '../ViewComponents/FileCard';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SectionList,
  PermissionsAndroid,
  Permission,
  Image,
  Platform,
} from 'react-native';
import CustomButton from '../ViewComponents/CustomButton';
import { Colors, Resources } from '../Constants';
import CustomModal from '../ViewComponents/CustomModal';

export function getNewFilesArray(fileIndex: number, _filesArray: SelectedFile[]): Array<SelectedFile> {
  if (_filesArray.length == 1) {
    return new Array<SelectedFile>();
  }
  var tmpNewFilesArray: SelectedFile[] = new Array<SelectedFile>(_filesArray.length - 1);
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

interface IUploadViewProps {
  componentId: string;
  qrCodeData: string;
  idOfViewBefore: string;
}

interface IUploadViewState {
  data: [];
  loadingIsvisible: boolean;
  uploadFailed: boolean;
  uploadSucceeded: boolean;
  changeNameModalVisible: boolean;
  failedFiles: SelectedFile[];
  result: SelectedFile[];
}

export default class UploadView extends React.Component<IUploadViewProps, IUploadViewState> {
  componentWillUnmount() {
    Navigation.updateProps(this.props.idOfViewBefore, {
      enableScan: true,
    });
  }
  private filesArray: SelectedFile[] = [];
  private jsonObj = JSON.parse(this.props.qrCodeData)
  private editingFile: number = 0;

  private upload = async () => {
    var filesProceeded: number = 0;
    var failedFiles: SelectedFile[] = [];
    
    // Function that has to be executed on a success message from the server
    const success = () => {
      filesProceeded++;
      if (filesProceeded === this.filesArray.length) {
        this.checkIfUploadWasSuccessful(failedFiles);
      }
    };
    // Function that has to be executed on a fail message from the server
    const fail = (file: SelectedFile) => {
      filesProceeded++;
      let _failedFile: SelectedFile[] = [file];
      failedFiles = failedFiles.concat(_failedFile)
      if (filesProceeded === this.filesArray.length) {
        this.checkIfUploadWasSuccessful(failedFiles);
      }
    };
    // Parameters from the JSON-file out of the QR-Code
    const subID = JSON.stringify(this.jsonObj.currentStageSubmission)
    const userName = JSON.stringify(this.jsonObj.user)
    const pre = JSON.stringify(this.jsonObj.apiend)
    const post1 = pre.slice(0, -1)
    const post2 = post1.substring(1)
    const endpoint = "https://" + post2 + ":8443/fileuploadservlet"
    const requestManager = new RequestManager();

    this.filesArray.forEach(async element => {
      await requestManager.postSelectedFiles(
        element,
        endpoint, subID, userName,
        success, fail
      )
    });
  };

  constructor(props: IUploadViewProps) {
    super(props);
    this.state = {
      loadingIsvisible: false,
      uploadFailed: false,
      uploadSucceeded: false,
      data: [],
      changeNameModalVisible: false,
      failedFiles: [],
      result: [],

    };
  }
  Sheet(show: boolean) {
    const sheetKey: string = 'HELLO';
    if (show) {
      SheetManager.show(sheetKey);
    } else {
      SheetManager.hide(sheetKey);
    }
  }

  private checkIfUploadWasSuccessful(failedFiles: SelectedFile[]) {

    if (failedFiles.length > 0) {
      //SOMETHING WENT WRONG FOR FILES ...
      this.setState({ failedFiles: failedFiles, uploadFailed: true });
    }
    else {
      this.setState({ uploadSucceeded: true });
    }
  }

  async openMultiPicker() {
    await DocumentPicker.pickMultiple()
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
        });
        this.Sheet(false);
        this.filesArray = this.filesArray.concat(tmpConvertedFiles);
        this.setState({ result: this.state.result.concat(tmpConvertedFiles) });
      })
  }

  async openCamera() {
    if (Platform.OS === 'android') {
      const permissionStatus = await this.checkPermisson(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        '',
        '',
        '',

      );
      console.log(permissionStatus)
    }

    const result = await launchCamera({ saveToPhotos: true, mediaType: 'photo' ,quality: 0.5});
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
      this.Sheet(false);
      this.filesArray = this.filesArray.concat(tmpConvertedFiles);
      this.setState({ result: this.state.result.concat(tmpConvertedFiles) });
    }
  }

  async openGallery() {
    if (Platform.OS === 'android') {
      const permissionStatus = await this.checkPermisson(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        '',
        '',
        '',
      );
    }
   
    const result = await launchImageLibrary({ mediaType: 'photo',quality: 0.5 });
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
      this.Sheet(false);
      this.filesArray = this.filesArray.concat(tmpConvertedFiles);     
      this.setState({ result: this.state.result.concat(tmpConvertedFiles) });
    }
  }

  private editFile(_index: number, _files: SelectedFile[]) {
    this.editingFile = _index;
    this.setState({ changeNameModalVisible: true })
  }

  private removeFile(_index: number, _files: SelectedFile[]) {
    this.setState({ result: getNewFilesArray(_index, _files) });
  }

  private onChangeNameSubmit(filename: string) {
    this.filesArray[this.editingFile].fileName = filename;
    this.setState({ changeNameModalVisible: false })
  }
  private onUploadPress() {
    this.upload()
    this.setState({ loadingIsvisible: true })
  }

  private closeResponseScreen() {
    this.filesArray = this.state.failedFiles
    this.setState({
      loadingIsvisible: false,
      uploadFailed: false,
      uploadSucceeded: false,
      result: this.filesArray,
      failedFiles: []
    })

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
      return granted;
    } catch (err) {
      console.log(err);
    }
  }

  public render() {
    this.filesArray = this.state.result;
    console.log(this.state.result.length);
    return (
      <View style={styles.container}>
        <Text>Aktuelle Aufgabe: {this.jsonObj.course_name + " > " + this.jsonObj.task_name}</Text>
        <View style={styles.container2}
          pointerEvents={this.state.loadingIsvisible ? 'none' : 'auto'}>
          <SectionList
            style={styles.sectionListContainer}
            sections={[{ title: 'Dokumente', data: this.state.result }]}
            renderItem={({ item, index }) => (
              <FileCard
                files={this.filesArray}
                file={item}
                index={index}
                onEdit={this.editFile.bind(this)}
                onRemove={this.removeFile.bind(this)}></FileCard>
            )}
          />
          <CustomModal
            visible={this.state.changeNameModalVisible}
            titleLabel='Namen der Datei ändern'
            cancelLabel='Abbrechen'
            submitLabel='Bestätigen'
            onSubmit={this.onChangeNameSubmit.bind(this)}
            onCancel={() => this.setState({ changeNameModalVisible: false })}
            showTextInput={true}
          />
          <View style={styles.controllButtonsContainer}>
            <CustomButton
              style={styles.customButtoncontainer}
              text="Hochladen"
              onPress={this.onUploadPress.bind(this)}
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
        {this.state.loadingIsvisible &&
          <View style={styles.loading}>
            {!this.state.uploadFailed && !this.state.uploadSucceeded &&
              <ActivityIndicator
                size={'large'}
                color={Colors.primaryBlue}
              />}
            {this.state.uploadFailed &&
              <View style={styles.loading}>
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <Image
                    style={styles.responseImage}
                    source={this.state.uploadSucceeded ? Resources.successTick : Resources.failCross}
                  />
                </View>

                <View style={{ flex: 3 }}>
                  <Text>Hochladen fehlgeschlagen für:</Text>
                  <SectionList
                    style={{ width: '90%' }}
                    sections={[{ title: 'Dokumente', data: this.state.failedFiles }]}
                    renderItem={({ item, index }) => (
                      <FileCard
                        files={this.filesArray}
                        file={item}
                        index={index}
                      >
                      </FileCard>
                    )}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <CustomButton
                    text='Fertig'
                    onPress={this.closeResponseScreen.bind(this)}
                  />
                </View>
              </View>
            }
            {this.state.uploadSucceeded &&
              <View style={styles.loading}>
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <Image
                    style={styles.responseImage}
                    source={this.state.uploadSucceeded ? Resources.successTick : Resources.failCross}
                  />
                </View>

                <View style={{ flex: 3 }}>
                  <Text>Daten erfolgreich hochgeladen!</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <CustomButton
                    text='Fertig'
                    onPress={this.closeResponseScreen.bind(this)}
                  />
                </View>


              </View>
            }
          </View>
        }
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurred,
    flex: 1
  },
  responseImage: {
    paddingTop: 10,
    width: 50,
    height: 50,

  }
});
