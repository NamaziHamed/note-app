"use client";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Notedata } from "@/utils/types";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const MasonaryLayout = () => {
  const [data, setData] = useState<Notedata[]>([]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const formatedDate = (date: string) => {
    const dt = DateTime.utc();
    const ISODate = DateTime.fromISO(date);
    const difference = dt.diff(ISODate, "day").as("day");

    if (difference < 7) return ISODate.toRelative();

    return ISODate.toFormat("dd LLL yyyy");
  };

  const handleRemove = async (id: string) => {
    try {
      const res = await axios.delete(`/api/note/${id}`);
      if (res.status === 200) {
        setData((notes) => notes.filter((note) => note.id !== id));
        toast.success("Note deleted successfully");
      } else {
        toast.error("Something went wrong! please try again!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete note! please try again!");
    }
  };

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
      breakpointCols={breakpointColumnsObj}
      className="ps-20 pt-10 pe-3 flex gap-4 w-auto"
    >
      {data.map((note) => (
        <Card key={note.id} className="mb-4 group relative">
          <Button
            variant={"ghost"}
            className="absolute top-0 right-0 "
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(note.id);
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500 hidden group-hover:block" />
          </Button>
          <Link href={"/note/" + note.id}>
            <CardHeader>
              <CardTitle>
                {note.title ? (
                  note.title
                ) : (
                  <span className="text-muted-foreground">untitled</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 relative">
              {!note.plainText && (
                <p className="text-xs text-muted-foreground">Empty!</p>
              )}
              {note.plainText
                ?.split("\n")
                .slice(0, 15)
                .map((line, index) => (
                  <p
                    key={index}
                    className="text-wrap break-words text-xs text-card-foreground"
                  >
                    {line}
                  </p>
                ))}
            </CardContent>
            <CardFooter className="mt-3">
              <span className="text-[0.65rem] text-muted-foreground  truncate">
                Last update: {formatedDate(note.updatedAt.toLocaleString())}
              </span>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </Masonry>
  );
};

export default MasonaryLayout;
