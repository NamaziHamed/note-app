import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import StarterKit from "@tiptap/starter-kit";
import { generateText } from "@tiptap/core";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

  const { id } = await context.params;

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

export async function GET(req: Request, context: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = await context.params;
  if (!userId)
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

  try {
    const noteData = await prisma.note.findUnique({
      where: { id },
    });
    if (!noteData)
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    return NextResponse.json(noteData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;
  const { id } = await context.params;
  if (!userId)
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

  try {
    const res = await prisma.note.delete({
      where: { id, userId },
    });
    if (!res)
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error: " + error },
      { status: 500 }
    );
  }
}
