import axios from "axios";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    name: "",
    age: undefined,
  });

  const getData = async () => {
    const res = await axios.get("http://localhost:8080/users");
    setUsers(res.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", state);
    getData();
    
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:8080/users/${id}`);
    getData();
  };
  const updateData = (id) => {
    axios.put(`http://localhost:8080/users/${id}`);
    getData();
  };
  return (
    <>
      <form onSubmit={addData}>
        <input  name="name" placeholder="enter name" onChange={handleChange} />
        <input name="age" placeholder="enter age" onChange={handleChange} />
        <button>Add</button>
      </form>
      {users &&
        users.map((user,index) => (
          <li key={index}>
            <span >{user?.name}</span>
            <span >{user?.age}</span>
            <button onClick={()=>deleteData(user.id)}>delete</button>
            <button onClick={()=>updateData()}>update</button>
          </li>
        ))}
    </>
  );
}

export default App;
