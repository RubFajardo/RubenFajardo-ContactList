export const initialStore=()=>{
  return []
  }

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':

      return [...store, action.payload];

    case 'edit_contact':
      return store.map(contact =>  {
        if (contact.id === action.payload.id) {
          return {...contact, ...action.payload}
        }
        return contact
      }
      );

    case 'delete_contact':
      return store.filter(contact => contact.id !== action.payload.id);

    case 'get_agenda':
      return action.payload


    default:
      throw Error('Unknown action.');
  }    
}

