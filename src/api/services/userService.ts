import axios from "../config/axiosInstance"
import {UserReg as User, changePasswordProps} from '../../Models/user'


const registerUser = async (user: User) => {
  try {
    const response = await axios.post("/user", { ...user });
    return response;
  } catch (error) {
    return error;
  }
};

const getUserList = async()=> {
  try {
    const response = await axios.get("/user")
    return response.data
  } catch (error:any) {
   
    return error
  }
}

const updateUser =  async(userID:string,userName:string,erpId:string,custId:string)=> {
try {
  const response=  await axios.put(`/user/${userID}`, {
    UserName:userName,
    ERPID:erpId,
    CustId:custId
  })
  return response.data

} catch (error:any) {
  return error
}
}

const deleteUser = async (userID: string) => {
  try {
    const response = await axios.delete(`/user/${userID}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const plainUser = async()=> {
  try {
    const response =  await axios.get("/user/plainUser")
    return response.data
  } catch (error) {
    return error
  }
}

const changePassword = async(info:changePasswordProps)=> {
try {
  const response:any =  await axios.post("/user/changePassword",{...info})
return response.data
} catch (error) {
  return error
}
}
  


export {
  registerUser,
  getUserList,
  updateUser,
  deleteUser,
  plainUser,
  changePassword 
}


