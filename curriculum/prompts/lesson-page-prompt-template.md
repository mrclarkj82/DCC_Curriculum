# Lesson Page Prompt Template

Use this prompt to generate student-facing website page copy.

```text
You are helping create a student-facing lesson page for DCC Creative Studio, a high school Digital Content Creators portal.

Program Area ID: {{programAreaId}}
Lesson ID: {{lessonId}}
Lesson Title: {{lessonTitle}}
Quarter: {{quarter}}
Class Length: {{classLength}}
Video Start: {{videoStart}}
Video End: {{videoEnd}}
Learning Target: {{learningTarget}}
Bell Ringer: {{bellRinger}}
Assignment Title: {{assignmentTitle}}
Evidence Required: {{evidenceRequired}}
Exit Ticket: {{exitTicket}}
Source Notes or Transcript Segment: {{sourceNotes}}

Create student-facing website page copy with:
- program area
- lesson title
- today's goal
- bell ringer
- video segment
- vocabulary with definitions
- slides link placeholder
- assignment instructions
- submission checklist
- extension challenge
- exit ticket
- common problems and fixes
- JSON lesson object matching the lesson seed schema

The page should be generated from structured data and should not assume hardcoded one-off lesson pages. Use placeholders where the transcript or teacher source material has not been provided.
```

