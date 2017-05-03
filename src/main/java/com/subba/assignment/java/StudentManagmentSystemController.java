package com.subba.assignment.java;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StudentManagmentSystemController implements ErrorController {

	private static final String PATH = "/error";

	@RequestMapping(value = "/")
	public String index() {
		return "index.html";
	}

	@RequestMapping(value = PATH)
	public String error() {
		return "Error handling";
	}

	@Override
	public String getErrorPath() {
		return PATH;
	}
}
