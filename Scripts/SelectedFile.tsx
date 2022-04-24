import {Asset}from "react-native-image-picker";
export class SelectedFile implements Asset{
    base64?: string;
    uri?: string;
    width?: number;
    height?: number;
    fileSize?: number;
    type?: string;
    fileName?: string;
    duration?: number;
    bitrate?: number;
    timestamp?: string;
    id?: string;
    constructor(props: Asset) {
       this.base64= props.base64 
       this.uri= props.uri 
       this.width= props.width 
       this.height= props.height 
       this.fileSize= props.fileSize 
       this.type= props.type 
       this.fileName= props.fileName 
       this.duration= props.duration 
       this.bitrate= props.bitrate 
       this.timestamp= props.timestamp 
       this.id= props.id 

       
    }

}

