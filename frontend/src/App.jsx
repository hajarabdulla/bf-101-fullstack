import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    name: "",
    age: "",
  });
  const [id, setId] = useState(undefined);

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

    if (!state.name || !state.age) return;

    axios.post("http://localhost:8080/users", state);
    getData();
  };

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    getData();
  };

  const handleEditClick = (data) => {
    setState({ name: data.name, age: data.age });
    setId(data.id);
  };

  const updateData = async (id) => {
    await axios.put(`http://localhost:8080/users/${id}`, state);
    getData();
  };

  return (
    <>
      <form onSubmit={addData}>
        <input
          name="name"
          type="text"
          value={state.name}
          placeholder="name"
          onChange={handleChange}
        />
        <input
          name="age"
          type="text"
          value={state.age}
          placeholder="age"
          onChange={handleChange}
        />
        <button>add</button>
      </form>
      <button onClick={() => updateData(id)}>update</button>

      {users &&
        users
          .sort((a, b) => a.id - b.id)
          .map((user) => (
            <li key={user.id}>
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span style={{ margin: 20 }}>{user.age}</span>
              <button onClick={(id) => deleteData(user.id)}>delete</button>
              <button onClick={(id) => handleEditClick(user)}>edit</button>
            </li>
          ))}
    </>
  );
};

export default App;
