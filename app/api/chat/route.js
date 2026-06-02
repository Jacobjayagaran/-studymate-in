import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request) {
  try {
    const { messages, board, subject } = await request.json();
    
    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: `You are StudyMate, a helpful AI tutor for Indian students studying ${board || 'school'} curriculum${subject ? ' - ' + subject : ''}. Explain clearly and simply. Show step-by-step working for problems. Be encouraging and friendly.`,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    return Response.json({
      response: response.content[0].text
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
