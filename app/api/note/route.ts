import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { prisma } from "@/lib/prisma";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import {
  BackgroundColor,
  Color,
  TextStyle,
} from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { toast } from "sonner";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const body = await req.json();
    const { title, jsonText } = body;
    const plainText = "";

    try {
      generateText(jsonText, [
        StarterKit,
        TextStyle,
        BackgroundColor,
        TaskList,
        Color,
        TaskItem,
        TextAlign,
      ]);
    } catch (error) {
      toast.error("Failed to generate plain text from note content.");
      console.error("Error generating plain text:", error);
    }

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

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });

  try {
    const res = await prisma.note.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        plainText: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error!" + error },
      { status: 500 }
    );
  }
}
