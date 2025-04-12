import React from "react"
import "./index.css"

const FilterBar = ({onFilterChange}) =>{
    const handleChange = (e) =>{
        const {name, value, options} = e.target;
        if(name === 'skills'){
            onFilterChange(name, Array.from(options).filter(o => o.selected).map(o => o.value));
        }
        else{
            onFilterChange(name, value);
        }
    };

    return(
        <div className="filterContainer">
            <select className="allGender" name="gender" onChange={handleChange}>
                <option value="">All Genders</option>
                <option>Male</option><option>Female</option><option>Other</option>
            </select>

            <select className="allGender" name="experience" onChange={handleChange}>
                <option value="">All Experience</option>
                <option>1 Year</option><option>2 years</option><option>3 Years</option>
            </select>

            <select className="skills" name="skills" multiple onChange={handleChange}>
                <option>JavaScript</option><option>React JS</option><option>Node JS</option>
            </select>
        </div>
    );
};

export default FilterBar;