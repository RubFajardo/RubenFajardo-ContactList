import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useEffect} from "react";

export const Home = () => {

  const {store, dispatch} = useGlobalReducer()

  useEffect(()=> {
        getAgenda()
    }, [])

    const getAgenda = async () =>{
        const result = await fetch("https://playground.4geeks.com/contact/agendas/RubenAgenda");
        const data = await result.json()
        dispatch({ type: "get_agenda", payload: data.contacts })
    }

    const removeHandler = async (i) => {
        //backend
        const agendaToRemove = i.id
        await fetch('https://playground.4geeks.com/contact/agendas/RubenAgenda/contacts/' + agendaToRemove, {
            method: "DELETE",
    })
    
    await getAgenda();
}

  const storeInHTML = store.map((contact) => {
	return (
	<div key={contact.id} className="card mb-3 p-3 d-flex flex-row align-items-center">
    <img src="https://www.corporatephotographerslondon.com/wp-content/uploads/2016/04/D4S7825.jpg" className="me-5 ms-4" alt="Profile" />
    <div className="flex-grow-1">
      <h4 className="mb-3">{contact.name}</h4>
      <p className="mb-0 text-muted"><i className="fa-solid fa-envelope me-2"></i> {contact.email}</p>
      <p className="mb-0 text-muted"><i className="fa-solid fa-phone me-2"></i> {contact.phone}</p>
      <p className="mb-0 text-muted"><i className="fa-solid fa-location-dot me-3"></i>{contact.address}</p>
    </div>
    <div className="d-flex flex-column gap-2 ms-3">
      <Link to={`/EditContact/${contact.id}`}><button className="btn btn-outline-secondary btn-sm">
       <i className="fa-solid fa-pen"></i>
      </button></Link>
      <button onClick={() => removeHandler(contact)}  className="btn btn-outline-danger btn-sm">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>)
  })

	return (
		<div className="container">
		
			<Link to="/AddContact"> <div className="d-flex justify-content-end"><button type="button" className="btn btn-success mt-3 mb-3">Create a new contact</button></div></Link>
			  {storeInHTML}
		</div>
	);
}; 