package com.portfolio.service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Service;   // 🔥 THIS WAS MISSING

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.portfolio.dto.ResumeDto;

@Service
public class ResumePdfService {

    public byte[] generate(ResumeDto r) {

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document doc = new Document(PageSize.A4, 36, 36, 36, 36);
        PdfWriter.getInstance(doc, out);
        doc.open();

        Font h1 = new Font(Font.HELVETICA, 16, Font.BOLD);
        Font h2 = new Font(Font.HELVETICA, 12, Font.BOLD);
        Font text = new Font(Font.HELVETICA, 11);

        doc.add(new Paragraph(r.getName(), h1));
        doc.add(new Paragraph(r.getEmail() + " | " + r.getPhone(), text));
        doc.add(new Paragraph(r.getAddress(), text));
        doc.add(Chunk.NEWLINE);

        section(doc, "ABOUT", r.getAbout(), h2, text);
        section(doc, "EDUCATION", r.getEducation(), h2, text);

        list(doc, "SKILLS", r.getSkills(), h2, text);
        list(doc, "INTERNSHIPS", r.getInternships(), h2, text);
        list(doc, "PROJECTS", r.getProjects(), h2, text);
        list(doc, "LANGUAGES", r.getLanguages(), h2, text);

        doc.close();
        return out.toByteArray();
    }

    private void section(Document d, String title, String val, Font h, Font t) {
        try {
            d.add(new Paragraph(title, h));
            d.add(new Paragraph(val, t));
            d.add(Chunk.NEWLINE);
        } catch (Exception ignored) {}
    }

    private void list(Document d, String title, List<String> items, Font h, Font t) {
        try {
            d.add(new Paragraph(title, h));
            for (String i : items)
                d.add(new Paragraph("- " + i, t));
            d.add(Chunk.NEWLINE);
        } catch (Exception ignored) {}
    }
}
