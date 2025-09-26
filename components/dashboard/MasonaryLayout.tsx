"use client";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Span } from "next/dist/trace";
import { Button } from "../ui/button";

interface Notedata {
  id: string;
  title: string | null;
  plainText: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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
      className="ps-20 flex gap-4 "
      columnClassName=""
    >
      {data.map((note) => (
        <Card key={note.id} className="mb-4">
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
            {note.plainText?.split("\n").map((line, index) => (
              <p className="truncate" key={index}>
                {line}
              </p>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant={"outline"}>View...</Button>
          </CardFooter>
        </Card>
      ))}
    </Masonry>
  );
};

export default MasonaryLayout;
