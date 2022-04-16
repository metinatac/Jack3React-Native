import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import  {Colors}  from '../Constants';
interface ICutomButtonProps {
    text: string;
    onPress: () => void;
    isActive?: boolean;
}

export default class CustomButton extends React.Component<ICutomButtonProps, any> {
    constructor(props: ICutomButtonProps) {
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
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop:20
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'center',
        //paddingRight: 20,
    },
    image: {
        width: 25,
        height: 25,
        paddingHorizontal: 20,
        resizeMode: 'contain',
    },
    divider: {
        width: '100%',
        height: 1,
        marginTop: 25,
        marginBottom: 15,
        backgroundColor: Colors.primaryDarkGray,
    },
});
