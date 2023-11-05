
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState([]);
  const URL = "https://jsonplaceholder.typicode.com/users"
  const getData = async()=>{
    const result = await fetch(URL);
    result.json().then(json=>{
        setUsers(json)
    })
  } 

  useEffect(()=>{
    getData();
  },[])

  useEffect(() => {
    if (searchQuery){
      setSearched(
        users.filter((user)=>{
          //main code`
          return Object.values(user).join('').toLowerCase().includes(searchQuery.toLowerCase())
        })
      )
    }else{
      setUsers(users);
    }
   
  },[searchQuery])
  return (
    <div className="App">
      <input 
      type="text" 
      className="search" 
      placeholder='Search Users....'
      onChange={(event)=>setSearchQuery(event.target.value)}/>
      <h1>Users</h1>
      <div className="grid-main">
        {searchQuery.length > 0 ? 
          searched.map((search)=>{
            return(
              <div className='grid-child'>
                <h2>{search.name}</h2>
                <p>{search.username}</p>
              </div>
            )
          })
         : 
            //  {/* displays all users  */}
           users.map((user)=>{
            return(
              <div className="grid-child">
                <h2>{user.name}</h2>
                <p>{user.username}</p>
              </div>
            )
           })
        }



       
      </div>
    </div>
  );
}

export default App;
