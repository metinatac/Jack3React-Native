export class RequestManager {
    
    constructor(){ 
    }

   


    public sendRequest(requestType: RequestManager.Type, endpointData: string){
       
        if(requestType === RequestManager.Type.GET){
               return this.doGetRequest(endpointData);
           }
           
    }
   async doGetRequest(endpointData:string){
            try {
                const response = await fetch(
                    endpointData
                );
                const json = await response.json();
                return json;
            } catch(error){
                console.warn(error);
         }
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