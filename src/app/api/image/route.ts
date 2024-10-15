import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  function generateRandomNumber(): number {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomSeed = generateRandomNumber();
  const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}&seed=${randomSeed}&width=512&height=512&nologo=True`;

  await fetch(imageURL);
  return NextResponse.json({ url: imageURL });
}
