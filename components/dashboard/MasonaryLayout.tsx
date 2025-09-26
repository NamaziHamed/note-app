"use client";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Notedata } from "@/utils/types";

const MasonaryLayout = () => {
  const [data, setData] = useState<Notedata[]>([]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const res = await axios.get("/api/note");
        if (res.status === 200) return setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserNotes();
  }, []);

  return (
    <Masonry
      breakpointCols={3}
      className="ps-20 pt-10 pe-3 flex gap-4 "
      columnClassName=""
    >
      {data.map((note) => (
        <Card key={note.id} className="mb-4">
          <Link href={"/note/" + note.id}>
            <CardHeader>
              <CardTitle>
                {note.title ? (
                  note.title
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {note.createdAt.toLocaleString()}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!note.plainText && <p className="text-xs">Empty!</p>}
              {note.plainText?.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="text-wrap break-words text-xs text-card-foreground"
                >
                  {line}
                </p>
              ))}
            </CardContent>
          </Link>
        </Card>
      ))}
    </Masonry>
  );
};

export default MasonaryLayout;
