
package com.portfolio.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.entity.Portfolio;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findByUserId(Long userId);
}
