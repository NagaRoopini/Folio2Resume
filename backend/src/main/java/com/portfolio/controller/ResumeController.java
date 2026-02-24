
package com.portfolio.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.portfolio.repository.ResumeRepository;
import com.portfolio.entity.Resume;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @Autowired
    private ResumeRepository repo;

    @PostMapping("/save")
    public Resume save(@RequestBody Resume resume) {
        return repo.save(resume);
    }

    @GetMapping("/user/{userId}")
    public List<Resume> getByUser(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }
    
    @GetMapping("/{id}")
    public Resume getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
