import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

export async function POST(request) {
  try {
    const { messages, profile, subject, chapters } = await request.json();

    const chapterList = chapters && chapters.length > 0
      ? `\n\nChapters you know for this subject:\n${chapters.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
      : '';

    const system = `You are StudyMate, an expert AI tutor specifically for ${profile || 'Indian school'} students.

Your student is studying: ${profile || 'school curriculum'}
Current subject: ${subject || 'General'}${chapterList}

Your role:
- You are an EXPERT in this specific curriculum
- Explain topics clearly with examples
- For math problems, show step-by-step solutions
- For science, use simple analogies
- For languages, help with grammar, meanings, summaries
- Always relate to their specific textbook content
- Be encouraging, friendly and patient
- Keep answers focused and easy to understand
- If asked about a chapter, explain it in detail based on the curriculum`;

    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    });

    return Response.json({ response: response.content[0].text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
