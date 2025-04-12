import React from "react"
import "./index.css"

const CandidateTable = ({data, currentPage, itemsPerPage}) =>{
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Phone</th><th>Email</th>
                    <th>Gender</th><th>Experience</th><th>Skills</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((candidate) => (
                    <tr key={candidate.id}>
                        <td>{candidate.name}</td>
                        <td>{candidate.phone}</td>
                        <td>{candidate.email}</td>
                        <td>{candidate.gender}</td>
                        <td>{candidate.experience}</td>
                        <td>{candidate.skills.join(', ')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CandidateTable;