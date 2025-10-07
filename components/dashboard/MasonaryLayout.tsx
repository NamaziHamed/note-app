"use client";
import React from "react";
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
import { NoteData } from "@/utils/types";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const MasonaryLayout = ({
  data,
  onRemove,
}: {
  data: NoteData[];
  onRemove: (id: string) => void;
}) => {
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
              onRemove(note.id);
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
