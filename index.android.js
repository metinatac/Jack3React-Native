import {Navigation} from 'react-native-navigation';
import Camera from './Views/Camera';
import MainView from './Views/MainView';
import QRCodeDetailsView from './Views/QRCodeDetailsView';

Navigation.registerComponent('MainScreen',() => MainView);
Navigation.registerComponent('CameraView',() => Camera);
Navigation.registerComponent('QRCodeDetailsView', () => QRCodeDetailsView)

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
              children: [
                 {
                      component:{
                         name: 'MainScreen',
                         options: {
                             topBar:{
                                 title: {
                                     text: "Main"
                                 }
                              }
                          }
                      }
                 },
             ]
          }
        }
    })
});

