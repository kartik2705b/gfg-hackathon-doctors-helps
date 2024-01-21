import axios from "axios";
import { BACKEND_URL } from "../constants";

export const LoginApi = async(payload)=>{
 const response =  axios.post(`${BACKEND_URL}/api/v1/login` ,payload).then((res)=>{
    localStorage.setItem('token' , res.data.token);
    localStorage.setItem('role' , res.data.user.role);
    return {message:res.data.message , status:true}
  }).catch((e)=>{
    return {message:e.response.data.message, status:false}
  })
  return response
}

export const RegisterApi = async(payload)=>{
    const response =  axios.post(`${BACKEND_URL}/api/v1/register` ,payload).then((res)=>{
       return {message:res.data.message , status:true}
     }).catch((e)=>{
       return {message:e.response.data.message, status:false}
     })
     return response
   }