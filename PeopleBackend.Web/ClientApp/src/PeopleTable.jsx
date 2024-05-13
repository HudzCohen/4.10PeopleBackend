import React from "react";
import AddPersonForm from "./AddPersonForm";
import PersonRow from "./PersonRow";
import axios, { all } from "axios";

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            //id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        showEdit: false, 
        checkedPeople: []
    }
    
    componentDidMount = () => {
        this.loadPeople();
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data});
        });
    }

    getTableContent = () => {
       const { people, checkedPeople } = this.state;
       return people.map (p => <PersonRow key={p.id} person={p}
              onEditClick={() => this.onEditClick(p)}
              onDeleteClick={() => this.onDeleteClick(p.id)}
              checked={checkedPeople.includes(p.id)} 
              onCheckToggle={() => this.onCheckToggle(p.id)}
              />)
    }

    onTextChange = e => {
        const copy = this.state.person;
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy});
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    //id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }

    onEditClick = (p) => {
      this.setState({
        showEdit: true,
        person: {
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            age: p.age
        }
       });
    }

    onDeleteClick = (id) => {
        axios.post('/api/people/delete', { id }).then(response => {
            this.loadPeople();
        });
    }

    onCancelClick = () => {
       this.setState({
        showEdit: false,
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        }
       });
    }

    onEditUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(response => {
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                showEdit: false
            })
            this.loadPeople();
        })
    }

    onDeleteAllChecked = () => {
      const { checkedPeople } = this.state;
      axios.post('/api/people/deleteall', { Ids: checkedPeople}).then(response => {
        this.loadPeople();
      });
    }

   onCheckToggle = (id) => {
      const {checkedPeople} = this.state;
      
      if(checkedPeople.includes(id)){
        this.setState({checkedPeople: checkedPeople.filter(c => c !== id)});
      }
      else {
        this.setState({ checkedPeople: [...checkedPeople, id]});
      }
   }



    render() {
        const { people , showEdit } = this.state;
        const { firstName, lastName, age, id } = this.state.person;
        const { onTextChange, onAddClick, onEditUpdateClick, onCancelClick, onDeleteAllChecked } = this;
        
        return (
            <>
                <div className="row">
                    <AddPersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        showEdit={showEdit}
                        onTextChange={onTextChange}
                        onAddClick={onAddClick}
                        onEditUpdateClick={onEditUpdateClick}
                        onCancelClick={onCancelClick}
                    />
                </div>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{width: 15}}>
                                <button className="btn btn-danger btn-sm" onClick={onDeleteAllChecked}>Delete All Checked</button>
                                <button className="btn btn-outline-info btn-sm mt-2" onClick={ () => this.setState({ checkedPeople: people.map(p => p.id) })}>Check All</button>
                                <button className="btn btn-outline-info btn-sm mt-2" onClick={ () => this.setState({ checkedPeople: [] })}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.getTableContent()}
                    </tbody>
                </table>
            </>
        )

    }

}

export default PeopleTable;