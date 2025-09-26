import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const body = await req.json();
    const { title, jsonText } = body;
    const plainText = generateText(jsonText, [StarterKit]);

    const newNote = await prisma.note.create({
      data: {
        title: title || "",
        jsonText: JSON.stringify(jsonText),
        plainText,
        userId,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
