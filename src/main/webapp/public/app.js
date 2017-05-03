var Student = React.createClass({

  getInitialState: function() {
    return {display: true };
  },
  handleDelete() {
    var self = this;
    $.ajax({
        url: self.props.student._links.self.href,
        type: 'DELETE',
        success: function(result) {
          self.setState({display: false});
        },
        error: function(xhr, ajaxOptions, thrownError) {
          toastr.error(xhr.responseJSON.message);
        }
    });
  },
  render: function() {

    if (this.state.display==false) return null;
    else return (
      <tr>
          <td>{this.props.student.studentId}</td>
          <td>{this.props.student.firstName}</td>
          <td>{this.props.student.lastName}</td>
          <td>{this.props.student.email}</td>
          <td>{this.props.student.phoneNumber}</td>
          <td>
            <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
          </td>
      </tr>
    );
  }
});

var StudentTable = React.createClass({

  render: function() {

    var rows = [];
    this.props.students.forEach(function(student) {
      rows.push(
        <Student student={student} key={student.studentId} />);
    });

    return (
      <table className="table table-striped">
          <thead>
          <tr>
			<th>Id</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
			<th>Phone Number</th>
		</tr>
          </thead>
          <tbody>{rows}</tbody>
      </table>
    );
  }
});

var App = React.createClass({

  loadStudentsFromServer: function() {

    var self = this;
    $.ajax({
        url: "http://localhost:8080/students",
      }).then(function(data) {
    	  console.log("data>>>>>>>>>>>>" + data.entity)
        self.setState({ students: data.entity });
      });

  },

  getInitialState: function() {
    return { students: [] };
  },

  componentDidMount: function() {
    this.loadStudentsFromServer();
  },

  render() {
    return ( <StudentTable students={this.state.students} /> );
  }
});

ReactDOM.render(<App />, document.getElementById('react') );