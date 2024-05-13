import React from "react";

export default function AddPersonForm({ firstName, lastName, age, onTextChange, onAddClick, showEdit, onEditUpdateClick, onCancelClick }) {
    return <div className="card bg-light col-md-12 mb-5 mt-3">
        <div className="card-body">
            <div className="row">
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="First Name"
                        name="firstName" value={firstName} onChange={onTextChange}></input>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Last Name"
                        name="lastName" value={lastName} onChange={onTextChange}></input>
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Age"
                        name="age" value={age} onChange={onTextChange}></input>
                </div>
                {!showEdit && <div className="col-md-3">
                    <button className="btn btn-primary w-100" onClick={onAddClick}>Add</button>
                </div>}
                {showEdit && <div className="col-md-3">
                    <button className="btn btn-warning w-100" hidden={!showEdit} onClick={onEditUpdateClick}>Update</button>
                    <button className="btn btn-dark w-100" hidden={!showEdit} onClick={onCancelClick}>Cancel</button>
                </div>}
            </div>
        </div>
    </div>
}