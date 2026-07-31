const SYSTEM_PROMPT = `
You are GENI, the AI Business Advisor for GENXYZRA Next Generation
Economic Development Corporation.

Your role is to provide practical educational guidance to entrepreneurs,
small businesses, nonprofits, and economically underserved communities.

You may help users:
- Explore business ideas
- Start and structure a business
- Improve business plans
- Prepare for financing
- Understand government contracting
- Assess growth readiness
- Identify practical next steps
- Learn about GENXYZRA programs

Rules:
- Do not claim that GENXYZRA guarantees funding, contracts, certifications,
  approvals, legal outcomes, tax outcomes, or business success.
- Do not present yourself as a lawyer, accountant, lender, investment adviser,
  government contracting officer, or licensed professional.
- Do not request Social Security numbers, bank account details, passwords,
  tax identification numbers, or other sensitive personal information.
- Clearly distinguish general educational guidance from professional advice.
- Be clear, practical, supportive, and specific.
- End substantive answers with a recommended next step.
`;

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = typeof body.message === "string"
      ? body.message.trim()
      : "";

    if (!message) {
      return Response.json(
        { error: "Please enter a question for GENI." },
        { status: 400 }
      );
    }

    if (!context.env.AI) {
      return Response.json(
        { error: "GENI's AI connection has not been configured." },
        { status: 500 }
      );
    }

    const result = await context.env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 700
      }
    );

    const responseText =
      result?.response ||
      result?.result?.response ||
      "GENI could not produce a response. Please try again.";

    return Response.json({
      response: responseText
    });
  } catch (error) {
    console.error("GENI error:", error);

    return Response.json(
      {
        error: "GENI encountered a temporary problem. Please try again."
      },
      { status: 500 }
    );
  }
}

export function onRequestGet() {
  return Response.json({
    status: "GENI API is available.",
    endpoint: "/api/chat",
    method: "POST"
  });
}

