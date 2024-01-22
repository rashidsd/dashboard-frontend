import axios from "../config/axiosInstance"
import {RoleGroup} from '../../Models/role'


const createRoleGroup = async (roleGroup: RoleGroup) => {
  try {
    const response = await axios.post("/roleGroup", { ...roleGroup });
    console.log('response',response)
    return response;
  } catch (error) {
    console.log(' Error response')
    return error;
  }
};

const getRoleGroupList = async()=> {
  try {
    const response = await axios.get("/roleGroup")
    return response.data
  } catch (error) {
    return error
  }
}

const updateRoleGroup =  async(id:string,name:string,srNo:number)=> {
try {
  const response=  await axios.put(`/roleGroup/${id}`, {
    GroupName:name,
    SrNo:srNo
  })
  return response.data

} catch (error) {
  return error
}
}

const deleteRoleGroup = async (id: number) => {
  try {
    const response = await axios.delete(`/roleGroup/${id}`);
     return response.data;
  } catch (error) {
    return error;
  }
};



export {
  createRoleGroup,
  getRoleGroupList,
  deleteRoleGroup,
  updateRoleGroup,
 }


