import Navbar from 'react-bootstrap/Navbar';
import { List} from 'react-bootstrap-icons'
import { useLayoutContext } from '../context/LayoutContext';
import {useEffect,useState} from 'react'
import {BoxArrowRight} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/services/auth';

function Header() {
  const {openSidebar,setOpenSidebar} = useLayoutContext();
  const [loginName,setloginName] = useState("")
  const [companyName,setCompanyName] = useState("")
  const [logo,setLogo] = useState("")

  const navigate = useNavigate()

  useEffect(()=> {
    const result = localStorage.getItem("authInfo")
      if (result) {
          const data = JSON.parse(result)
           setloginName(data.user.name)
          setCompanyName(data.company.name)
          setLogo(data.company.logo)
      }
  },[])

 async function  handleLogout() {
 
    const response:any = await logout()
    if (response.data.status==true) {
    localStorage.removeItem("authInfo")
    navigate("/login",{replace:true})
   }else {
  
   }
  }


  return (
    <Navbar className="bg-primary ps-2 pe-2  mt-2 rounded-1">
      <div className="d-md-none">
        <List
          size={32}
          color="white"
          className="me-3"
          style={{ cursor: "pointer" }}
          onClick={()=>setOpenSidebar(!openSidebar)}
        />
      </div>
      <Navbar.Brand className="text-white">
      <img src={logo} className="img-fluid rounded me-2" height={48} width={48} alt="..." />
        {companyName}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>

        <p className='h6 d-inline me-4 text-white'
        style={{cursor:"pointer"}}
        onClick={()=>{ navigate("/changePassword")}}
        >
          change password</p>
         <BoxArrowRight size={32} className='text-white ' 
         style={{cursor:"pointer"}}
         onClick={handleLogout}
         />
         
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;