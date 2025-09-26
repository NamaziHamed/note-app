import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import StarterKit from "@tiptap/starter-kit";
import { generateText } from "@tiptap/core";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

  const { id } = await params;

  const body = await req.json();
  const { title, jsonText } = body;
  const plainText = generateText(jsonText, [StarterKit]);
  try {
    const updatedNote = await prisma.note.update({
      data: { title, jsonText: JSON.stringify(jsonText), plainText },
      where: { id, userId },
    });
    if (updatedNote)
      return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" + error },
      { status: 500 }
    );
  }
}
