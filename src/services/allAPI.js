import { baseUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"

//1.register API
export const signupAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/api/v1/register`,user,"")
}

//2.login API
export const signinAPI = async(data)=>{
    return await commonAPI("post",`${baseUrl}/api/v1/token`,data,"")
}

//3.get all properties list
export const getAllPropertiesAPI = async()=>{
    return await commonAPI("get",`${baseUrl}/api/v1/properties`,"","")
}