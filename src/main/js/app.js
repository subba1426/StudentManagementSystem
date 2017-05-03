'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
const client = require('./client');




class StudentApp extends React.Component {
	constructor(props) {
	    super(props);
	    
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleAdd = this.handleAdd.bind(this);
	    this.handleDelete = this.handleDelete.bind(this); 
	    this.showAddWindow = this.showAddWindow.bind(this);
	    this.closeAddWindow = this.closeAddWindow.bind(this);
	    this.state = {students: [], attributes: [], displayAddWindow : false};
	  }
	
	componentDidMount() { 
		client({method: 'GET', path: '/students', headers: {'Accept': 'application/schema+json'}}).done(response => {
			 		this.setState({students: response.entity});
		});
	}
	
	componentWillUpdate(nextProps, nextState) {
	 		this.setState({students: nextState.students});
	 		this.state.students = nextState.students;
	 		this.state.displayAddWindow = nextState.displayAddWindow;
		}

	shouldComponentUpdate (nextProps, nextState) {
				  
		 if((this.props.students != nextProps.students)	 || (this.state.students != nextState.students)){
			 return true;
		 } else if ((this.props.displayAddWindow != nextProps.displayAddWindow)	 || (this.state.displayAddWindow != nextState.displayAddWindow)) {
			 return true;
		 }else{
			return false;
		 }
		}

	

	render() {
    return ( 
    		<StudentTable students={this.state.students} handleAdd= {this.handleAdd} handleDelete={this.handleDelete}
    		displayAddWindow = {this.state.displayAddWindow} 	showAddWindow = {this.showAddWindow} closeAddWindow = {this.closeAddWindow}/>
    )
  }
	
	  handleChange(e) {
		  }
	  
	  handleSubmit(e) {
		  }
	  
	  handleAdd(e) {
		   e.preventDefault();
		  		  
		var id = document.getElementById("StudentId").value;
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var email = document.getElementById("email").value;
		var phoneNumber = document.getElementById("phoneNumber").value;
		
		var student = {}
		student = {
			'id': Number.parseInt(id),
			'firstName': firstName,
			'lastName': lastName,
			'email': email,
			'phoneNumber': phoneNumber
		  
		};
  
  
		client({method: 'POST', entity:student,  path: '/students', headers: {'Content-Type': 'application/json'}}).done(response => {
			var updatedStudents = this.state.students.slice();
			updatedStudents.push(student)
		    this.setState({ students: updatedStudents });
			
	 });
		document.getElementById("StudentId").value = '';
		document.getElementById("firstName").value = '';
		document.getElementById("lastName").value = '';
		document.getElementById("email").value = '';
		document.getElementById("phoneNumber").value = '';

		
	  }
	  
	  showAddWindow(e){
		  this.setState({ displayAddWindow: true });
			
	  }
	  
	  closeAddWindow(e){
		  this.setState({ displayAddWindow: false });
	  }
	  
	  handleDelete(e) {
		  let studentId = e.target.value;
	  		client({method: 'DELETE', path: '/students/'+studentId}).done(response => {
	    	
	    	var updatedStudents = this.state.students.filter(function(student) {
	    	    return (student.id != studentId);
	    	});   
	    	
	    	  this.setState({ students: updatedStudents });
		  });
		  }
	  
	  
	
}


class StudentTable extends React.Component{
	constructor(props) {
		super(props);
	} 
	
	render() {
		var students = this.props.students.map(student =>
			<Student key={student.id} student={student} handleDelete={this.props.handleDelete}  students={this.props.students}/>
		);
		return (
		 <div> 	
				
			<table className="table table-striped">
				<tbody >
					<tr>
						<th>Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone Number</th>
					</tr>
					{students}
				</tbody>
			</table>
	
			
			{ this.props.displayAddWindow ?  <button   className="btn btn-info" onClick={this.props.closeAddWindow.bind(this)}>Close</button> : <button   className="btn btn-info" onClick={this.props.showAddWindow.bind(this)}>Add Student </button>	  }
			{ this.props.displayAddWindow ? <AddStudentComponent closeAddWindow = {this.props.closeAddWindow} handleAdd={this.props.handleAdd} /> : null }
		  </div>
			
		)
	}
}



class AddStudentComponent extends React.Component {
	constructor(props) {
		super(props);
	} 
	
	
	render() {
       return (
         <form method="POST" onSubmit={this.props.handleAdd.bind(this)}>
         
	          <table className="table table-striped">
	          <tbody> 
	          		<tr><td>Id</td><td><input type="text" name="id"  id="StudentId" /></td></tr>
	          		<tr><td>First Name</td><td><input type="text" name="firstName"  id="firstName" /></td></tr>
	          		<tr><td>Last Name</td><td> <input type="text" name="lastName"  id="lastName" /></td></tr>
	          		<tr><td>Email</td><td> <input type="text" name="email"  id="email" /></td></tr>
	          		<tr><td>Phone Number</td><td><input type="text" name="phoneNumber"   id="phoneNumber" /></td></tr>
	          </tbody>
	      </table>
	      <input className="btn btn-info" type="submit" value="Submit" />
	             
	     </form>
       );
   }
}	



class Student extends React.Component{
	
	constructor(props) {
		super(props);
	} 
	
	render() {
	     return (
			<tr>
			  <td>{this.props.student.id}</td>
	          <td>{this.props.student.firstName}</td>
	          <td>{this.props.student.lastName}</td>
	          <td>{this.props.student.email}</td>
	          <td>{this.props.student.phoneNumber}</td>
	          <td>
	            <button className="btn btn-info" value={this.props.student.id} onClick={this.props.handleDelete.bind(this)}>Delete</button>
	          </td>
			</tr>
		)
	}
}

ReactDOM.render(<StudentApp/>, react);