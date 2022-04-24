import RNFetchBlob from "rn-fetch-blob";

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
        RNFetchBlob.config({ trusty: true })
        .fetch(
          'GET',
          endpointData
        )
        .then(res => console.log(res));
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