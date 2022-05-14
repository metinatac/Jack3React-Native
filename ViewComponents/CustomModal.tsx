import React from 'react';
import { Colors, Resources } from '../Constants';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
interface ICustomModalProps {
    visible: boolean;
    titleLabel: string;
    submitLabel?: string;
    cancelLabel?: string;
    onSubmit?: (inputText: string) => void;
    onSubmitForPasswordModal?: (inputText: string, secondInputTextForPassword: string) => void;
    onCancel?: () => void;
    children?: any;
    showTextInput?: boolean;
    textInputOptions?: any;
}

interface ICustomModalState {
    modalVisible: boolean;
}

export default class CustomModal extends React.Component<ICustomModalProps, ICustomModalState> {
    private inputText: string;

    constructor(props: ICustomModalProps) {
        super(props);

        this.inputText =
            props.textInputOptions && props.textInputOptions.defaultValue ? props.textInputOptions.defaultValue : '';
        this.state = {
            modalVisible: props.visible,
        };
        this.onChangedInputText = this.onChangedInputText.bind(this);
    }

    public render() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.props.visible}
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={() => {
                    if (this.props.onCancel) {
                        this.props.onCancel();
                    }
                }}>
                <KeyboardAvoidingView behavior="padding" style={styles.container} enabled={Platform.OS === 'ios'}>
                    <View style={styles.whitebox}>
                        <Text style={styles.title}>{this.props.titleLabel}</Text>
                        <View style={styles.content}>{this.props.children}</View>
                        {this.props.showTextInput && this.renderTextInput()}
                        <View style={styles.buttonContainer}>
                            {this.props.cancelLabel && (
                                <TouchableOpacity
                                    testID="ModalButtonCancel"
                                    style={styles.modalButton}
                                    onPress={() => {
                                        if (this.props.onCancel) {
                                            this.props.onCancel();
                                        }
                                    }}>
                                    <Text style={styles.submitAbortTexts}>{this.props.cancelLabel}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                testID="ModalButtonSubmit"
                                style={styles.modalButton}
                                onPress={() => {
                                   if (this.props.onSubmit) {
                                        this.props.onSubmit(this.inputText);
                                    }
                                }}>
                                <Text style={styles.submitAbortTexts}>
                                    {this.props.submitLabel ? this.props.submitLabel : 'OK'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }

    private renderTextInput() {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.iosInputBox}>
                    <TextInput
                        style={styles.iosTextInputStyle}
                        onChangeText={this.onChangedInputText}
                        autoFocus={true}
                        {...this.props.textInputOptions}
                    />
                </View>
            );
        } else {
            return (
                <TextInput
                    style={styles.iosInputBox}
                    onChangeText={this.onChangedInputText}
                    {...this.props.textInputOptions}
                />
            );
        }
    }
    private onChangedInputText(text: string) {
        this.inputText = text;
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0007',
    },
    whitebox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor:  Colors.primaryWhite,
        width: '85%',
        paddingHorizontal: 15,
        paddingTop: 10,
        borderRadius: 3,
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 5,
        paddingRight: 5,
    },
    modalButton: {
        paddingVertical: 10,
        paddingRight: 0,
        paddingLeft: 20,
    },
    content: {
        // alignSelf: 'flex-start',
    },
    submitAbortTexts: {
        fontSize: 16,
    },
    iosInputBox: {
        marginTop: 15,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#999',
    },
    iosTextInputStyle: {
        padding: 3,
    },
});
