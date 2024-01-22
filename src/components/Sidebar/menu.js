
import  Settings  from "@mui/icons-material/Settings";
import  Dashboard  from "@mui/icons-material/Dashboard";


export const menu = [

  {
    icon: <Settings />,
    title: "Settings",
    role:'Settings',
    items: [
      {
        title: "Manage Users",
        to:'/user',
        role:'Manage Users'
        },
        {
        title: "Manage Roles",
        to:'/role',
        role:'Manage Roles'
      },
      {
        title: "Assign Roles",
        to:'/assignRoles',
        role:'Assign Roles'
      },
      {
        title: "Change Password",
        to:'/changePassword',
        role:'Change Password'
      }
    ],
   
   },
    {
      icon:<Dashboard />,
      title:'Dashboard',
      role:'Dashboard',
      items:[
        {
          title:'Human Rsource',
          to:'dashboard/hrdashboard',
          role:'Hr Dashboard'
        },
        {
          title:'Production',
          to:'dashboard/productiondashboard',
          role:'Production Dashboard'
        },
        {
          title:'Stock',
          to:'dashboard/stockdashboard',
          role:'Stock Dashboard'
        },
        {
          title:'Account',
          to:'dashboard/accountDashboard',
          role:'Accounts Dashboard'
        },
        {
          title:'Export',
          to:'dashboard/exportDashboard',
          role:'Export Dashboard'
        }
      ],
      
    },
 
  
];

