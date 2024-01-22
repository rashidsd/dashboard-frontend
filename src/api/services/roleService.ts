import axios from "../config/axiosInstance"
import {AddRoleProps} from '../../Models/role'


const createRole = async (role: AddRoleProps) => {
  try {
    const response = await axios.post("/role", {
      GroupID: role.GroupID,
      RoleName: role.RoleName,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const allRoles = async()=> {
try {
  const response =  await axios.get("/role/group")
  return response.data
} catch (error) {
  return error
}
}


const deleteRole = async(id:string)=> {
  try {
    const response =  await axios.delete(`/role/${id}`)
    return response.data
  } catch (error) {
    return error
  }
  }


export {
  createRole,
  allRoles,
  deleteRole,
}


