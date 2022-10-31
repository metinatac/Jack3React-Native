import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Constants } from 'react-native-navigation';
import  {Colors, Resources}  from '../Constants';
interface IActionSheetButtonProps {
    text: string;
    onPress: () => void;
    isActive?: boolean;
    icon?: Resources;
}

export default class ActionSheetButton extends React.Component<IActionSheetButtonProps, any> {
    constructor(props: IActionSheetButtonProps) {
        super(props);
    }

    private getIsActive = () => (this.props.isActive == null ? true : this.props.isActive);

    public render() {
        const isActive = this.getIsActive();
        return (
            <View>
                <TouchableOpacity
                    disabled={!isActive}
                    style={[
                        styles.button,
                    ]}
                    onPress={this.props.onPress}>
                    <Text
                        style={[
                            styles.buttonText,
                            
                        ]}>
                        {this.props.text}
                    </Text>
                   {this.props.icon &&(
                        <Image
                        style= {styles.image}
                        source={this.props.icon}
                        />
                   )}
                  
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        paddingBottom: 30,
        paddingTop:20,
        width:'100%',
        tintColor: Colors.primaryBlue,
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'left',
        width: "60%",
        color: Colors.primaryBlue,
        //paddingRight: 20,
    },
    image: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: Colors.primaryBlue,
    },
    divider: {
        width: '100%',
        height: 1,
        marginTop: 25,
        marginBottom: 15,
        backgroundColor: Colors.primaryDarkGray,
    },
   
});
