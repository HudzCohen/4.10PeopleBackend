
import React from "react";

    function PersonRow({person, onEditClick, onDeleteClick, checked, onCheckToggle}) {
        const { firstName, lastName, age} = person;
        return (
            <tr>
                <td>
                    <div className="d-flex justify-content-center align-items-center">
                        <input type="checkbox" className="form-check-input mt-2"
                        checked={checked} onChange={onCheckToggle}></input>
                    </div>
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                    <button className="btn btn-danger" style={{marginLeft: 10}} onClick={onDeleteClick}>Delete</button> 
                </td>
            </tr>
        )
    }    

export default PersonRow;