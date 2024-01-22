import axios from "../config/axiosInstance"


const assignUserRoles =async(userId:string)=> {
    try {
      const response = await axios.get(`/userRole/getRoles/${userId}`)
      return response.data
    } catch (error) {
      return error
    }
  }

  const updateUserRoles =async(userId:string,roleList:any[])=> {
    try {
      
      const response = await axios.post('/userRole/updateRoles',{
        userId:userId,
        roleList:roleList
      });
      return response.data
    } catch (error) {
      return error
    }
  }

  export {assignUserRoles,updateUserRoles}
  