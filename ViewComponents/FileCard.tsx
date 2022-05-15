import React from 'react';
import {
    Animated,
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CustomButton from '../ViewComponents/CustomButton';
import { Colors, Resources } from '../Constants';
import { SelectedFile } from '../Scripts/SelectedFile';

interface IFileCardProps {
    files: SelectedFile[]
    file: SelectedFile
    index: number;
    onEdit?: (index: number, files: SelectedFile[]) => void;
    onRemove?: (index: number, files: SelectedFile[]) => void;
}

interface IFileCardState {
    isInEditMode: boolean;
    fadeInAnimationTranslate: Animated.Value;
    fadeInAnimationOpacity: Animated.Value;
}

const ANIMATION_DURATION = 400;

export default class FileCard extends React.Component<IFileCardProps, IFileCardState> {
    public constructor(props: IFileCardProps) {
        super(props);
        const { width } = Dimensions.get('window');
        this.state = {
            fadeInAnimationTranslate: new Animated.Value(width),
            fadeInAnimationOpacity: new Animated.Value(0),
            isInEditMode: false
        };
    }

    public render() {

        return (

            <View style={[styles.fileCardContainer]}>
                <View style={[styles.fileNameContainer]}>
                    <Text>{this.props.file.fileName}</Text>
                </View>
               
                <View style={[styles.spacer]}>
                    
                </View>
                <View>
                    {this.props.onEdit && <CustomButton
                        text=''
                        onPress={() => this.props.onEdit!(this.props.index,this.props.files)}
                        icon={Resources.editIcon}
                        borderRadius={15}
                    /> }
                </View>
                <View>
                   {this.props.onRemove && <CustomButton
                        text=''
                        onPress={() => this.props.onRemove!(this.props.index,this.props.files)}
                        icon={Resources.removeIcon}
                        borderRadius={15}
                    /> }
                </View>

            </View>


        )

    }

    private renderText(){
        return (
            <Text>{this.props.file.fileName}</Text>
        )
    }
}
const styles = StyleSheet.create({
    fileCardContainer: {
        backgroundColor: Colors.secondaryGray5,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
        width: '100%',
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    fileNameContainer: {
        backgroundColor: Colors.secondaryGray5,
        width: '50%'



    },

    buttonStyle: {
        borderRadius:30
    },
    spacer:{
        paddingLeft: 10
    }



});