import {useState,useEffect} from 'react'
import { plainUser } from '../api/services/userService'
import { assignUserRoles,updateUserRoles } from '../api/services/userRoleService';
import Select from '../components/shared/Select';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { selectOptionProps } from '../Models/select';



interface rolesProps {
  GroupName:string,
  RoleID:string,
  RoleName:string,
  Assign:Number
}


function AssignRoles() {
  const [selectedOption, setSelectedOption] = useState<selectOptionProps | undefined>(undefined);
  const [options, setOptions] = useState<selectOptionProps[]>([]);
  const [roles, setRoles] = useState<rolesProps[]>([]);
  const [roleGroup,setRoleGroup] = useState<string[]>([])
  const [msg,setMsg] = useState("")

  function getOptions(users: any[]) {
    const userList = users.map((u) => ({ value: u.UserID, label: u.UserName }));
    setOptions(userList);
    if (userList.length>0)
        handleChange(userList[0])
  }

  async function handleChange(newvalue: selectOptionProps | undefined) {
   if (newvalue) {
      const response:any = await assignUserRoles(newvalue.value);
      if (response.data) {
        setRoles(response.data);
        setRoleGroup([...new Set(roles.map(r=>r.GroupName))])
        setSelectedOption(newvalue);
        setMsg("")
      }
    }
  }

  function handleAssign(value:any,id:string){
     roles.filter(r=>r.RoleID==id)[0].Assign = (value==true ?1:0)
    setRoles([...roles])
    setMsg("")
  }

  async function handleUpdateRoles() {
    if(selectedOption?.value) {
      const response:any = await updateUserRoles(selectedOption.value,roles)
       setMsg(response.msg)
    }
    
  }

  useEffect(() => {
    async function loadUsers() {
      const response: any = await plainUser();
      if (response.data) {
        getOptions(response.data);
      }
    }
    loadUsers();
  }, [])

  return (
    <>
      <Container>
   
    <Select 
          options={options}
          value={selectedOption}
          onChange={handleChange}
        />

          <Accordion className='mt-2'>
          {roleGroup.map((g, i) => (
            <Accordion.Item key={i} eventKey={i.toString()}  >
              <Accordion.Header>{g}</Accordion.Header>

              <Accordion.Body>
                <table className="table table-striped table-hover">
                  <tbody>
                    {roles.map((r) => (
                     r.GroupName==g &&  (
                      <tr key={r.RoleID}>
                        <td>{r.RoleID}</td>
                        <td>{r.RoleName}</td>
                        <td>
                          <Form.Check 
                            type="switch"
                            checked={r.Assign == 1 ? true : false}
                            onChange={(e) =>
                              handleAssign(e.target.checked, r.RoleID)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                          )
                    ))}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <div className="d-flex justify-content-between align-items-center ">
        <div className="align-self-center text-danger">{msg}</div>
          <Button
            variant="primary"
            className="mt-2"
            onClick={handleUpdateRoles}
          >
            update Roles
          </Button>
        </div>
      </Container>
    </>
  );
}

export default AssignRoles