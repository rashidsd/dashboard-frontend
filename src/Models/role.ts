export interface RoleGroup  {
    GroupID:string,
    GroupName:string,
    SrNo:number
}

// export interface Role {
//     RoleID:string,
//     GroupID:string,
//     RoleName:string
// }

export type RoleLitProps = {
    RoleID:string,
    RoleName:string,
    GroupName:string
  }

  export type AddRoleProps = {
    RoleName:string,
    GroupID:string
  }