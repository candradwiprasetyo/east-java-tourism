import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-Reasoner",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        response: data[0]?.generated_text || "No response",
      });
    } else {
      return NextResponse.json(
        { error: data.error || "API Error" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
