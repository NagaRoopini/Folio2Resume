package com.portfolio.dto;

import java.util.List;

public class ResumeDto {

    private String name;
    private String email;
    private String phone;
    private String address;
    private String about;
    private String education;

    private List<String> skills;
    private List<String> internships;
    private List<String> projects;
    private List<String> languages;

    // getters & setters

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<String> getInternships() { return internships; }
    public void setInternships(List<String> internships) { this.internships = internships; }

    public List<String> getProjects() { return projects; }
    public void setProjects(List<String> projects) { this.projects = projects; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }
}
