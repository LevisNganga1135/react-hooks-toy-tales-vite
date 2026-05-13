import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleLikeToy(toy) {
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) =>
        setToys(toys.map((t) => (t.id === updatedToy.id ? updatedToy : t)))
      );
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => setToys(toys.filter((toy) => toy.id !== id)));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDelete={handleDeleteToy}
        onLike={handleLikeToy}
/>
      
    </>
  );
}

export default App;
