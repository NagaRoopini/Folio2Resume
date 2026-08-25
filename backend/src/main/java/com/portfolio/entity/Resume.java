
package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String resumeData;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getResumeData() { return resumeData; }
    public void setResumeData(String resumeData) { this.resumeData = resumeData; }
}
