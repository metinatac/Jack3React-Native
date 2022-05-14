import RNFetchBlob from 'rn-fetch-blob';
import {SelectedFile} from './SelectedFile';

export class RequestManager {
  constructor() {}

  /*
   const file = {
  uri,             // e.g. 'file:///path/to/file/image123.jpg'
  name,            // e.g. 'image123.jpg',
  type             // e.g. 'image/jpg'
}

const body = new FormData()
body.append('file', file)

fetch(url, {
  method: 'POST',
  body
})
*/

  public sendRequest(requestType: RequestManager.Type, endpointData: string) {
    if (requestType === RequestManager.Type.GET) {
      return this.doGetRequest(endpointData);
    }
  }
  async doGetRequest(endpointData: string) {
    /*      try {
                const response =  await RNFetchBlob.config({trusty: true}).fetch(RequestManager.Type.GET, )
               
                const json = await response.json();
                return json;
            } catch(error){
                console.warn(error);
         }*/
  }
  async doGetRequestv2(endpointData: string) {
    console.log('check');
    var request = RNFetchBlob.config({trusty: true})
      .fetch('GET', endpointData)
      .then(res => console.log(res));
    console.log(request)
  }

  async doGetRequestv4(endpointData: string, formdata: FormData) {
    /*RNFetchBlob.config({ trusty: true })
        .fetch(
          'POST',
          endpointData,
          'Content-Type': 'multipart/form-data'
        )
        .then(res => console.log(res));*/
  }

  async doGetRequestv3(file: SelectedFile, endpointData: string, submissionID: string, userName: string, successCallback:()=>void, failCallback:()=>void){

    /*const body = new FormData();
    body.append('file', { name: file.fileName!, type: file.type!, uri: file.uri! });
    body.append('id', { id: '441'});*/
    var request = RNFetchBlob.config({trusty: true})
      .fetch(
        'POST',
        endpointData,
        {
          'Content-Type': 'multipart/form-data'
        },
        [
          {
            name: 'file',
            filename: file.getFileNameWithType(),
            type: file.type!,
            data: RNFetchBlob.wrap(file.uri!),
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
          failCallback();
        }

      })
      .catch(err => {
        console.log('error---------', err);
        // ...
      });
    console.log(request);
  }

  async doGetRequestv5(file: SelectedFile, endpointData: string) {
    /*const body = new FormData();
    body.append('file', file);
    body.append('id', 441);

    RNFetchBlob.config({trusty: true})
      .fetch(
        'POST',
        endpointData,
        {'Content-Type': 'multipart/form-data'},
        JSON.stringify(body),
      )
      .then(res => console.log(res));*/
  }

  async doGetRequestv6(file: SelectedFile, endpointData: string) {
    console.log('check')
    RNFetchBlob.fetch('POST', endpointData, {
      'Content-Type' : 'multipart/form-data',
    }, [
     
      { name : 'file', filename : file.fileName!, type: file.type!, data: RNFetchBlob.wrap(file.uri!)},
      // elements without property `filename` will be sent as plain text
      { name : 'name', data : 'user'},
      { name : 'id', data : '441'},
    ]).then((resp) => {
      console.log(resp)
    }).catch((err) => {
      // ...
    })
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

function alert(arg0: string): any {
  throw new Error('Function not implemented.');
}
