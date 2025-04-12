import React, {useEffect, useState} from "react";
import CandidateTable from "./components/CandidateTable";
import FilterBar from "./components/FilterBar";
import AddCandidateForm from "./components/AddCandidateForm";
import "./App.css"

const App = () =>{
  const [allCandidates, setAllCandidates] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({gender: '', experience: '', skills: []});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() =>{
    fetch('/candidates.json')
    .then(res => res.json())
    .then(data => {
      setAllCandidates(data);
      setDisplayed(data);
    });
  }, []);

  const applyFilters = () =>{
    let result = [...allCandidates];

    if(search){
      result = result.filter((c) => 
      [c.name, c.phone, c.email].some((field) => 
      field.toLowerCase().includes(search.toLowerCase())
         )
      );
    }

    if(filters.gender){
      result = result.filter(c => c.gender === filters.gender);
    }

    if(filters.experience){
      result = result.filter(c => c.experience === filters.experience);
    }

    if(filters.skills.length){
      result = result.filter(c => 
        filters.skills.every(skill => c.skills.includes(skill))
      );
    }

    setDisplayed(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  });

  const handleAddCandidate = (newCandidate) =>{
    newCandidate.id = allCandidates.length + 1;
    const updated = [...allCandidates, newCandidate];
    setAllCandidates(updated);
  };

  const handleFilterChange = (key, value) =>{
    setFilters(prev => ({...prev, [key]: value}));
  };

  return(
    <div className="container">
      <h1>Candidate Management App</h1>
      <input className="searchInput" placeholder="Search by Name, Phone or Email" onChange={e => setSearch(e.target.value)}/>
      <FilterBar onFilterChange={handleFilterChange}/>
      <AddCandidateForm onAdd={handleAddCandidate}/>
      <CandidateTable data={displayed} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
      <div className="btnContainer">
        <button className="moveBtn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button className="moveBtn" onClick={() => setCurrentPage((p) => (p * itemsPerPage < displayed.length ? p + 1 : p))}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;