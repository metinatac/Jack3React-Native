import {Navigation} from 'react-native-navigation';
import Camera from './Views/Camera';
import MainView from './Views/MainView';
import QRCodeDetailsView from './Views/QRCodeDetailsView';
import HeaderImageComponent from './ViewComponents/HeaderImageComponent';
Navigation.registerComponent('MainScreen',() => MainView);
Navigation.registerComponent('CameraView',() => Camera);
Navigation.registerComponent('QRCodeDetailsView', () => QRCodeDetailsView)
Navigation.registerComponent('HeaderImageComponent', () => HeaderImageComponent)


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
                                title:{
                                    component:{
                                        name: 'HeaderImageComponent',
                                        alignment: 'center'
                                    },
                                },
                              },
                          },
                      },
                 },
             ]
          }
        }
    })
});


