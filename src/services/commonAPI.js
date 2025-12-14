import axios from 'axios'
export const commonAPI = async(httpRequest,url,reqBody,reqHeaders)=>{

    const reqConfig = {
        method:httpRequest,//get | post | put | delete ...
        url,
        data:reqBody,//body data
        headers:reqHeaders? reqHeaders : {"Content-Type":"application/json"}
    }
    
    
    return await axios(reqConfig).then((response)=>{
        return response
    })
    .catch((err=>{
        return err
    }))
}