# Quiz Prompt Template

Use this prompt to generate a 15-question quiz every 4-5 lessons.

```text
You are helping create a 15-question quiz for a high school Digital Content Creators class.

Program Area ID: {{programAreaId}}
Quiz ID: {{quizId}}
Quiz Title: {{quizTitle}}
Quarter: {{quarter}}
Covered Lesson IDs: {{lessonIds}}
Covered Lesson Titles: {{lessonTitles}}
Source Notes or Transcript Segment: {{sourceNotes}}

Create a 15-question quiz with:
- 5 multiple choice questions
- 4 vocabulary/tool identification questions
- 3 scenario-based troubleshooting questions
- 2 process-order questions
- 1 short response question

For each question, include:
- question text
- answer choices, if applicable
- correct answer
- explanation
- difficulty
- lesson ID
- tag
- JSON-ready output

Keep questions aligned to the provided lessons. Do not invent unsupported source details; use placeholders for missing transcript-specific information.
```

