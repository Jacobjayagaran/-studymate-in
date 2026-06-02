import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, messages, profile, subject, chapter } = body;

    // ── EXAM GENERATION ──────────────────────────────────────────────────────
    if (type === 'exam') {
      const prompt = `You are an expert teacher for ${profile} students.

Generate exactly 5 multiple choice questions for this chapter:
Subject: ${subject}
Chapter: ${chapter}
Board/Standard: ${profile}

IMPORTANT: Questions must be based on the actual content of "${chapter}" from the ${profile} textbook.

Return ONLY a valid JSON array with NO extra text, NO markdown, NO backticks. Just raw JSON:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Brief explanation of why this answer is correct"
  }
]

Rules:
- Questions must match the actual textbook chapter content
- correct is the INDEX (0, 1, 2, or 3) of the correct option
- 4 options per question
- Clear explanations
- Appropriate difficulty for ${profile} students`;

      const response = await client.messages.create({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });

      let text = response.content[0].text.trim();
      // Clean up in case AI adds markdown
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const questions = JSON.parse(text);
      return Response.json({ questions });
    }

    // ── CHAT ─────────────────────────────────────────────────────────────────
    const system = `You are StudyMate AI, an expert tutor for ${profile} students.

${chapter ? `The student is currently studying:
Subject: ${subject}
Chapter: ${chapter}

You are an expert in this exact chapter from the ${profile} textbook.
When asked to explain, give a clear, complete explanation matching what's in the textbook.
Use examples, diagrams in text, step-by-step solutions where needed.` : `Help the student with their ${subject} questions.`}

Guidelines:
- Always stay relevant to ${profile} curriculum
- Use simple, clear language appropriate for this level
- For math: show step-by-step solutions
- For science: use real-life examples
- For languages: explain meaning, context, themes
- For social science: connect to real events
- Be encouraging and supportive
- Keep answers focused and easy to understand`;

    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    });

    return Response.json({ response: response.content[0].text });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: "Failed", details: error.message }, { status: 500 });
  }
}
