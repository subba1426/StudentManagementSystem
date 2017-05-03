package com.subba.assignment.java.student.controller;

import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.subba.assignment.java.student.Student;
import com.subba.assignment.java.student.StudentService;

@RestController
public class StudentController {

	final Logger logger = LoggerFactory.getLogger(StudentController.class);
	
	@Autowired
	StudentService studentService;
	
	@RequestMapping("/students")
	public List<Student> getAllStudents() {
		logger.debug("In getAllStudents method");
		return studentService.getAllStudents();
	}
	
	@RequestMapping("/students/{id}")
	public Student getStudents(@PathVariable Integer id) {
		return studentService.getStudent(id);
	}
	
	@RequestMapping(method = RequestMethod.POST, value ="/students")
	public Response addStudent(@RequestBody Student student) {
		logger.debug("Start of  addStudent method");
		Student addStudent = studentService.addStudent(student);
		logger.debug("Start of  addStudent method");
		return Response.ok().entity(addStudent).build();
		
	}
	
	@RequestMapping(method = RequestMethod.PUT, value ="/students/{id}")
	public Response updateStudent(@RequestBody Student student, @PathVariable Integer id) {
		logger.debug("Start of  updateStudent method");
		Student updatedStudent =  studentService.updateStudent(id, student);
		return Response.ok().entity(updatedStudent).build();
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value ="/students/{id}")
	public Response deleteStudent(@PathVariable Integer id) {
		logger.debug("Start of  deleteStudent method");
		try {
			studentService.deleteStudent(id);
		} catch (IllegalArgumentException e) {
			logger.debug("Error thrown in deleteStudent  method for the id: " + id +" error " + e);
			return Response.status(Status.BAD_REQUEST).build();
		}
		
		return Response.ok().build();
	}
	
	

}
