import RNFetchBlob from "rn-fetch-blob";
import { SelectedFile } from "./SelectedFile";

export class RequestManager {
    
    constructor(){ 
    }

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


    public sendRequest(requestType: RequestManager.Type, endpointData: string){
       
        if(requestType === RequestManager.Type.GET){
               return this.doGetRequest(endpointData);
           }
           
    }
   async doGetRequest(endpointData:string){
      /*      try {
                const response =  await RNFetchBlob.config({trusty: true}).fetch(RequestManager.Type.GET, )
               
                const json = await response.json();
                return json;
            } catch(error){
                console.warn(error);
         }*/
    }
    async doGetRequestv2(endpointData: string) {
        console.log('check')
        RNFetchBlob.config({ trusty: true })
        .fetch(
          'GET',
          endpointData
        )
        .then(res => console.log(res));
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

      async doGetRequestv4(endpointData: string) {
        /*var request = RNFetchBlob.config({ trusty: true }).fetch('POST', endpointData, {       
            'Content-Type': 'multipart/form-data',
          }, [
            { name: 'file',id: '441', filename: 'Download.png', type: 'image/png', data: JSON.stringify(RNFetchBlob.wrap('./Assets/Download.png'))}]).then((resp) => {
              //response body 
                      
            }).catch((err) => {
              console.log('error---------', err)
              // ...
              
            })
       console.log(request)*/
      }

      async doGetRequestv3(file: SelectedFile, endpointData: string) {
    
          const body = new FormData()
          body.append('file', file)
          
          RNFetchBlob.config({ trusty: true })
          .fetch('POST', endpointData, undefined, body)
    
      }


      
}


export namespace RequestManager{
    export enum Type{
        GET = "GET",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE"

    }
}