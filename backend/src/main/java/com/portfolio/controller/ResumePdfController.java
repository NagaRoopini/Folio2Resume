package com.portfolio.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.dto.ResumeDto;
import com.portfolio.service.ResumePdfService;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin
public class ResumePdfController {

    private final ResumePdfService service;

    public ResumePdfController(ResumePdfService service) {
        this.service = service;
    }

    @PostMapping("/download")
    public ResponseEntity<byte[]> download(@RequestBody ResumeDto dto) {

        byte[] pdf = service.generate(dto);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=Resume.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
    }
}
