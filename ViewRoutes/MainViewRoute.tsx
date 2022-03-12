import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainView from '../Views/MainView';
import CameraView from '../Views/Camera';

const screens = {
Main: {
    screen: MainView
},
Camera:{
    screem: CameraView
}
}

const MainStack = createNativeStackNavigator()
