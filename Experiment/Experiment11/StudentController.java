package Exp11;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


// REST Controller
@RestController
@RequestMapping("/")
public class StudentController {

    private Student student;

    // Welcome endpoint
    @GetMapping
    public String welcomeMessage() {
        return "Welcome to Student Management REST API";
    }

    // GET student details
    @GetMapping("/student")
    public ResponseEntity<Student> getStudent() {
        if (student == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    // POST student data
    @PostMapping("/student")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        this.student = student;
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }
}
