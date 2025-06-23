import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useState, useEffect } from "react";


export const EditContact = () => {

  const {store, dispatch} = useGlobalReducer()
  const navigate = useNavigate()

  const { id } = useParams()
  const singleContact = store.find(contact => contact.id === parseInt(id));

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fullAddress, setAddress] = useState('')

  useEffect(()=> {
        if (singleContact) {
            setFullName(singleContact.name)
            setEmail(singleContact.email)
            setPhone(singleContact.phone)
            setAddress(singleContact.address)
        }
    }, [])

  const saveHandler = async () => {

    if (singleContact ) {

    const updatedContact = {
      name: fullName,
      email: email,
      phone: phone,
      address: fullAddress,
    }

     const promise = await fetch(`https://playground.4geeks.com/contact/agendas/RubenAgenda/contacts/${singleContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
        
    const contactEdited = await promise.json()

    dispatch({
  type: 'edit_contact',
  payload: contactEdited

});


navigate('/')
  }};

    return (
        <div className="container mt-4">
           <div className="d-flex flex-column align-items-center"><h1>Add a new contact</h1></div>
            <form>
                
   <div className="form-group mb-2">
    <label>Full Name</label>
    <input type="text" value={fullName} className="form-control" onChange={(e) => setFullName(e.target.value)} placeholder="Full Name"/>
  </div>
  <div className="form-group mb-2">
    <label>Email</label>
    <input type="text" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
  </div>
  <div className="form-group mb-2">
    <label>Phone</label>
    <input type="text" className="form-control"  value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone"/>
  </div>
  <div className="form-group">
    <label>Address</label>
    <input type="text" className="form-control" value={fullAddress}  onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address"/>
  </div>
</form>
<button type="button" onClick={saveHandler} className="btn btn-primary w-100 mt-4">Save</button>
<Link to="/">
        <p className="ms-1">or get back to contacts</p>
      </Link>
        </div>
    );
}; 