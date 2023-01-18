import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    name: "",
    age: undefined,
  });

  const getData = async () => {
    const res = await axios.get("http://localhost:8080/users");
    setUsers(res.data);
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
    console.log(id);
    axios.delete(`http://localhost:8080/users/${id}`);
    getData();
  };

  return (
    <>
      <form onSubmit={addData}>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          name="age"
          type="text"
          placeholder="age"
          onChange={handleChange}
        />
        <button>add</button>
      </form>

      {users &&
        users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span style={{ margin: 20 }}>{user.age}</span>
            <button onClick={(id) => deleteData(user.id)}>delete</button>
          </li>
        ))}
    </>
  );
};

export default App;
