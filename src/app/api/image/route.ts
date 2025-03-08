import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = await request.json();

  //find user
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "No user found" }, { status: 401 });
  }
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

  //add the image details on databse
  await prisma.post.create({
    data: {
      promt: prompt,
      url: imageURL,
      seed: randomSeed,
    },
  });
  return NextResponse.json({ url: imageURL });
}
