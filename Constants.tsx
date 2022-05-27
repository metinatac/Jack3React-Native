import { Platform } from "react-native";
export enum Colors{
    primaryBlue = '#00a4d2',
    primaryWhite = '#ffffff',
    primaryLightGray = '#b2b4b2',
    primaryDarkGray = '#8d8c8a',
    primaryRed = '#c8102e',
    primaryGreen = '#4ee44e',
    secondaryGray0 = '#000000',
    secondaryGray1 = '#54585d',
    secondaryGray2 = '#898d8d',
    secondaryGray3 = '#b2b4b2',
    secondaryGray4 = '#c7c9c7',
    secondaryGray5 = '#f4f3f4',
    listElementBackground = '#b3e4f2',
    blurred = 'rgba(200, 200, 200, 0.8)',
}
export enum Resources{
    editIcon = require('./Assets/icons/editPenIcon.png'),
    removeIcon = require('./Assets/icons/removeTrashIcon.png'),
    addIcon = require('./Assets/icons/addFileIcon.png'),
    addIcon2 = require('./Assets/icons/addFileIcon2.png'),
    galleryIcon = require('./Assets/icons/galleryIcon.png'),
    uploadIcon = require('./Assets/icons/uploadFileIcon.png'),
    fileIcon = require('./Assets/icons/fileIcon.png'),
    cameraIcon = require('./Assets/icons/cameraIcon.png'),
    failCross = require('./Assets/icons/failCross.png'),
    successTick = require('./Assets/icons/successTick.png'),
    qrCodeIcon = require('./Assets/icons/qrCodeIcon.png'),
    jackLogo = require('./Assets/jackLogo.png'),
}

type NumberClosure = (value: number) => void;

export let headerHeight = {
    aHeight: Platform.OS === 'ios' ? 44 : 56,
    handlers: [] as NumberClosure[],
    set height(value) {
        this.aHeight = value;
        this.handlers.forEach((handler) => handler(value));
    },
    get height() {
        return this.aHeight;
    },
    registerListener(handler: NumberClosure) {
        this.handlers.push(handler);
    },
    unregisterListener(handler: NumberClosure) {
        const index = this.handlers.indexOf(handler);
        this.handlers.splice(index, 1);
    },
};