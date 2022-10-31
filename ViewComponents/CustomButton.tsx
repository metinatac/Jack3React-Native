import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Resources } from '../Constants';

interface ICutomButtonProps {
    text: string;
    onPress: () => void;
    isActive?: boolean;
    icon?: Resources;
    isIconLeft?: boolean;
    backgroundColor?: Colors;
    foregroundColor?: Colors;
    borderRadius?: number;
    style?: object;
    buttonStyle?: object;
    iconPaddingLeft?: number;
    iconPaddingRight?: number;
    iconSize?: number;
    textPaddingLeft?: number;
    textPaddingRight?: number;
}

export default class CustomButton extends React.Component<ICutomButtonProps, any> {
    constructor(props: ICutomButtonProps) {
        super(props);
    }

    private getIsActive = () => (this.props.isActive == null ? true : this.props.isActive);

    public render() {
        const isActive = this.getIsActive();
        return (
            <View style={this.props.style ? this.props.style : {}}>
                <TouchableOpacity
                    disabled={!isActive}
                    style={[
                        styles.button,
                        {
                            flexDirection: this.props.isIconLeft ? 'row-reverse' : 'row',
                            backgroundColor: isActive
                                ? this.props.backgroundColor
                                    ? this.props.backgroundColor
                                    : Colors.primaryBlue
                                : Colors.secondaryGray4,
                            borderRadius: this.props.borderRadius ? this.props.borderRadius: 3,
                        },
                        this.props.buttonStyle ? this.props.buttonStyle : {},
                    ]}
                    onPress={this.props.onPress}>
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: this.props.foregroundColor
                                    ? this.props.foregroundColor
                                    : Colors.primaryWhite,
                                    paddingLeft: this.props.textPaddingLeft? this.props.textPaddingLeft:0,
                                    paddingRight: this.props.textPaddingRight? this.props.textPaddingRight:0
                            },
                        ]}>
                        {this.props.text}
                    </Text>
                    {this.props.icon && (
                        <Image
                            style={[
                                styles.image,
                                {
                                    tintColor: this.props.foregroundColor
                                        ? this.props.foregroundColor
                                        : Colors.primaryWhite,
                                    paddingLeft: this.props.iconPaddingLeft? this.props.iconPaddingLeft:0,
                                    paddingRight: this.props.iconPaddingRight? this.props.iconPaddingRight:0,
                                    width: this.props.iconSize? this.props.iconSize:25,
                                    height: this.props.iconSize? this.props.iconSize:25,
                                },
                            ]}
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'center',
        //paddingRight: 20,
    },
    image: {
        resizeMode: 'contain',
    },
});
