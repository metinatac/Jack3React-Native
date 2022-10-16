import RNFetchBlob from 'rn-fetch-blob';
import {SelectedFile} from './SelectedFile';

export class RequestManager {
  constructor() {}

  async postSelectedFiles(file: SelectedFile, endpointData: string, submissionID: string, userName: string, successCallback:()=>void, failCallback:(failedFile:SelectedFile)=>void){
     RNFetchBlob.config({trusty: true})
      .fetch(
        RequestManager.Type.POST,
        endpointData,
        {
          'Content-Type': 'multipart/form-data'
        },
        [
          {
            name: 'file',
            filename: file.getFileNameWithType(),
            type: file.type!,
            data: RNFetchBlob.wrap(file.getPlattformURI()),
          },
          {
            name : 'id', data : submissionID
          },
          {
            name : 'username', data : userName
          }
        ]
      )
      .then(resp => {
        if(resp.data === "SUCCESS"){
          successCallback();
        } else{
          failCallback(file);
        }

      })
      .catch(err => {
        console.log('error---------', err);
        // ...
      });
  }
}

export namespace RequestManager {
  export enum Type {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
}