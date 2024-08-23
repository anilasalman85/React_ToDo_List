import React, { useState } from "react";
import './App.css';

const Todo = () => {
  const [showForm, setShowForm] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showDelete, setShowDelete] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [showList, setShowList] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputDeadline, setInputDeadline] = useState("");
  const [inputCategory, setInputCategory] = useState("personal");
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleInput = (e) => setInputTitle(e.target.value);
  const handleInputDesc = (e) => setInputDesc(e.target.value);
  const handleDeadlineChange = (e) => setInputDeadline(e.target.value);
  const handleCategoryChange = (e) => setInputCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowList(true);
    setShowNew(true);

    if (!inputTitle || !inputDesc || !inputDeadline) {
      alert("Please fill in all fields");
      setShowList(false);
    } else if (inputTitle && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              name: inputTitle,
              desc: inputDesc,
              deadline: inputDeadline,
              category: inputCategory,
            };
          }
          return elem;
        })
      );
      setInputTitle("");
      setInputDesc("");
      setInputDeadline("");
      setToggleSubmit(true);
      setShowForm(false);
      setShowDelete(true);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
        deadline: inputDeadline,
        category: inputCategory,
      };
      setItems([newItem, ...items]);
      setInputTitle("");
      setInputDesc("");
      setInputDeadline("");
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((elem) => elem.id !== id);
    setDeleteMessage(true);
    setTimeout(() => {
      setItems(updatedItems);
      setDeleteMessage(false);
    }, 2000);
  };

  const handleEdit = (id) => {
    setShowList(false);
    setShowDelete(false);
    setShowNew(false);
    setShowForm(true);
    setToggleSubmit(false);
    const itemToEdit = items.find((elem) => elem.id === id);
    setInputTitle(itemToEdit.name);
    setInputDesc(itemToEdit.desc);
    setInputDeadline(itemToEdit.deadline);
    setInputCategory(itemToEdit.category);
    setIsEditItem(id);
  };

  const handleAdd = () => {
    setShowForm(true);
    setShowList(true);
    setShowNew(false);
  };

  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = items.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <>
      <h1 className="app-title">To Do List App</h1>

      <div className="category-container">
        <button className="category-button all" onClick={() => handleCategoryFilterChange("all")}>All</button>
        <button className="category-button personal" onClick={() => handleCategoryFilterChange("personal")}>Personal</button>
        <button className="category-button work" onClick={() => handleCategoryFilterChange("work")}>Work</button>
        <button className="category-button urgent" onClick={() => handleCategoryFilterChange("urgent")}>Urgent</button>
        <button className="category-button hobby" onClick={() => handleCategoryFilterChange("hobby")}>Hobby</button>
      </div>

      {showNew && (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary" onClick={handleAdd}>New</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <div className="text-center">
            <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              onChange={handleInput}
              value={inputTitle}
            />
            <label htmlFor="description">Enter Description</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              onChange={handleInputDesc}
              value={inputDesc}
            />
            <label htmlFor="deadline">Enter Deadline</label>
            <input
              type="date"
              id="deadline"
              onChange={handleDeadlineChange}
              value={inputDeadline}
            />
            <label htmlFor="category">Select Category</label>
            <select
              id="category"
              value={inputCategory}
              onChange={handleCategoryChange}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="urgent">Urgent</option>
              <option value="hobby">Hobby</option>
            </select>
            <button type="submit">{toggleSubmit ? "Save" : "Update"}</button>
          </form>
        </div>
      )}

      {showList && (
        <div className="task-list-container">
          {deleteMessage && <p className="text-center text-danger">Item Deleted Successfully</p>}
          {filteredItems.map((item) => (
            <div className="task-item" key={item.id}>
              <div className="task-details">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <p>Deadline: {item.deadline}</p>
                <p className={`task-category ${item.category}`}>{item.category}</p>
              </div>
              <div className="task-actions">
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                {showDelete && (
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Todo;
