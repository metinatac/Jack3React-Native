import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Colors, headerHeight, Resources } from '../Constants';


interface IHeaderImageComponentState {
    componentHeight: number;
   
}

export default class HeaderImageComponent extends React.Component<any, IHeaderImageComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            componentHeight: headerHeight.height,
        };

        this.setHeaderHeight = this.setHeaderHeight.bind(this);
        headerHeight.registerListener(this.setHeaderHeight);
       
    }

    public componentWillUnmount() {
        headerHeight.unregisterListener(this.setHeaderHeight);
       
    }

    private setHeaderHeight(height: number) {
        this.setState({ componentHeight: height });
    }
    public render() {
        return (
            <View
                style={[
                    styles.viewStyle,
                    {
                        height: this.state.componentHeight,
                        backgroundColor: 'white',
                    },
                ]}>
                <Image
                    style={[
                        styles.imageStyle,
                        {
                            height: this.state.componentHeight -  20,
                            width: Dimensions.get('window').width,
                           // tintColor: Colors.primaryBlue,
                        },
                    ]}
                    source={Resources.jackLogo}
                    fadeDuration={0}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imageStyle: {
        resizeMode: 'contain',
    },
    subtitleStyle: {
        fontSize: 14,
        color: Colors.primaryWhite,
    },
});
