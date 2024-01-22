
export type UserReg ={
    UserName:string 
     ERPID:string 
     EMail:string 
     HashPassword:string
     ConfirmPassword:string
 }

 export type User ={
   UserID:string ,
   UserName:string,
   ERPID:string,
   EMail:string
   CustId:string
  }

  


  export type changePasswordProps= {
    email:string,
    password:string,
    newPassword:string,
    confirmPassword:string
}