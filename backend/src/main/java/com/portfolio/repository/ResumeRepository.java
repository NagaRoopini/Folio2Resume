
package com.portfolio.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserId(Long userId);
}
