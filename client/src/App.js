import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from "react"
function App() {
  const [users,setUsers] = useState()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [isLoaded,setIsLoaded] = useState(false)

  useEffect(()=>{
    if(!isLoaded){
       console.log("loaded")
    fetch("http://localhost:4000/users").then(response=>
      response.json()
    ).then(data=>{
      setIsLoaded(true)
      setUsers(data)
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })}},[users])



   //form handler
   function handleUsernameChange(e){
      setUsername(e.target.value)
      console.log(username)
    }
    function handlePasswordChange(e){
      setPassword(e.target.value)
      console.log(username)
    }
    function handleSubmit(){
      const newUser = {
        username:username,
        password:password
      }
      console.log(newUser)

      fetch('http://localhost:4000/users', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err))
    }
   
  return (
    <div className="App">
      My users
      <br/>
      Add user 
    <hr/>
      username
      <input type="text"
             name="username"
             value={username}
             onChange={handleUsernameChange}
             /><br/>
      password
      <input type="text" 
             name="password"
             value={password}
             onChange={handlePasswordChange}
             /><br/>
      <button onClick={handleSubmit}>Add user</button>
    <hr/>
    <Users users={users}/>
    </div>
  );
}

function Users({users}){
  if (users==null){
    return <div>there are no users loaded</div>
  }
  return (
    <ul>
    {users.map((user)=>(
      <li>{user.username}</li>
    ))}
    </ul>
  )
}
export default App;
