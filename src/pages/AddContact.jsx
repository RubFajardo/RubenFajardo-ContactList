import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


export const AddContact = () => {

  const {store, dispatch} = useGlobalReducer()
  const navigate = useNavigate()

  let FullName = ''
  let Email = ''
  let Phone = ''
  let Address = ''

  const saveHandler = async () => {

    const newContact = {
      name: FullName,
      email: Email,
      phone: Phone,
      address: Address,
    }

     
    const promise = await fetch("https://playground.4geeks.com/contact/agendas/RubenAgenda/contacts", {
            method: "POST",
            body: JSON.stringify(newContact),
            headers: { "Content-Type": "application/json" },
        });
        
    const contactUploaded = await promise.json()

    dispatch({
  type: 'add_contact',
  payload: contactUploaded
});


navigate('/')
  }

    return (
        <div className="container mt-4">
           <div className="d-flex flex-column align-items-center"><h1>Add a new contact</h1></div>
            <form>
                
   <div className="form-group mb-2">
    <label>Full Name</label>
    <input type="text" className="form-control" onChange={(e) => FullName = e.target.value} placeholder="Full Name"/>
  </div>
  <div className="form-group mb-2">
    <label>Email</label>
    <input type="text" className="form-control" onChange={(e) => Email = e.target.value} placeholder="Enter Email"/>
  </div>
  <div className="form-group mb-2">
    <label>Phone</label>
    <input type="text" className="form-control" onChange={(e) => Phone = e.target.value} placeholder="Enter Phone"/>
  </div>
  <div className="form-group">
    <label>Address</label>
    <input type="text" className="form-control" onChange={(e) => Address = e.target.value} placeholder="Enter Address"/>
  </div>
</form>
<button type="button" onClick={saveHandler} className="btn btn-primary w-100 mt-4">Save</button>
<Link to="/">
        <p className="ms-1">or get back to contacts</p>
      </Link>
        </div>
    );
}; 