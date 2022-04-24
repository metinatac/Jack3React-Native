import React from 'react';
import{
    ActivityIndicator,
    Animated,
    Dimensions,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { Colors } from '../Constants';

interface IFileCardProps{
    filename:string;
    fileType:string;
    onEdit: ()=> void;
    onRemove: () => void;
}

interface IFileCardState{
    isInEditMode: boolean;
    fadeInAnimationTranslate: Animated.Value;
    fadeInAnimationOpacity: Animated.Value;
}

const ANIMATION_DURATION = 400;

export default class FileCard extends React.Component<IFileCardProps, IFileCardState> {
    public constructor(props: IFileCardProps){
        super(props);
        const {width} = Dimensions.get('window');
        this.state = {
            fadeInAnimationTranslate: new Animated.Value(width),
            fadeInAnimationOpacity: new Animated.Value(0),
            isInEditMode: false
        };
    }

    public render(){

        return (
            
                <View style= {[styles.fileCardContainer]}>
                   <View style= {[styles.fileNameContainer]}>
                    <Text>{this.props.filename}</Text>     
                    </View>
                </View>
           

        )

    }
}
const styles = StyleSheet.create({
    fileCardContainer: {
        backgroundColor: Colors.primaryLightGray,
      padding: 10,
      marginTop: 5
    },
    fileNameContainer: {
        backgroundColor: Colors.primaryWhite,
        padding:20
      },
    

});