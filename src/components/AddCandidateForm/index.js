import React, {useState} from "react";
import "./index.css"

const AddCandidateForm = ({onAdd}) =>{
    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", gender: "", experience: "", skills: []
    });

    const handleChange = (e) => {
        const {name, value, options} = e.target;
        if(name === "skills"){
            const selected = Array.form(options).filter(o => o.selected).map(o => o.value);
            setFormData({...formData, skills: selected});
        }
        else{
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        onAdd(formData);
        setFormData({name: "", phone: "", email: "", gender: "", experience: "", skills: []});
    };

    return(
        <form onSubmit={handleSubmit} >
            <input className="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
            <input className="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required/>
            <input className="email" type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>

            <select className="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option>Male</option><option>Female</option><option>Other</option>
            </select>

            <select className="experience" name="experience" value={formData.experience} onChange={handleChange} required>
                <option value="">Select Experience</option>
                <option>1 Years</option><option>2 Years</option><option>3 Years</option><option>4 Years</option>
            </select>

            <select className="skills" name="skills" multiple value={formData.skills} onChange={handleChange}>
                <option>JavaScript</option><option>React JS</option><option>Node JS</option><option>Python</option>
            </select>
            <div className="addBtn">
              <button className="btn" type="submit">Add Candidate</button>
            </div>
        </form>
    );
};

export default AddCandidateForm;