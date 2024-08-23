import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import ToDo from "./ToDo";
import './App.css';

const categories = ["All", "Work", "Personal", "Urgent"]; // Define categories

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="category-nav">
          {categories.map((category) => (
            <Link key={category} to={`/${category.toLowerCase()}`} className="nav-link">
              {category}
            </Link>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<ToDo category="All" />} />
          {categories.map((category) => (
            <Route key={category} path={`/${category.toLowerCase()}`} element={<ToDo category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
