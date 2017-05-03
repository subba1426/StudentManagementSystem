package com.subba.assignment.java.student;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
	
	@Autowired
	StudentRepository studentRepository;
	
	public List<Student> getAllStudents() {
		List<Student> students = new ArrayList<Student>();
		studentRepository.findAll().forEach(students::add);
		return students;
	}

	public Student getStudent(Integer id) throws IllegalArgumentException{
		return studentRepository.findOne(id);
	}
	
	public Student addStudent(Student student) {
		return studentRepository.save(student);
	}
	
	public Student updateStudent(Integer id, Student student) {
		return	studentRepository.save(student);
	}
	
	public void  deleteStudent(Integer id) throws IllegalArgumentException{
		studentRepository.delete(id);
	}
}
