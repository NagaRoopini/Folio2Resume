
package com.portfolio.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.portfolio.repository.PortfolioRepository;
import com.portfolio.entity.Portfolio;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin("*")
public class PortfolioController {

    @Autowired
    private PortfolioRepository repo;

    @PostMapping("/save")
    public Portfolio save(@RequestBody Portfolio portfolio) {
        return repo.save(portfolio);
    }

    @GetMapping("/user/{userId}")
    public List<Portfolio> getByUser(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
