"use client";
import React from "react";
import { Input } from "../ui/input";

const SearchBox = ({
  text,
  search,
}: {
  text: string;
  search: (value: string) => void;
}) => {
  return (
    <div>
      <Input
        type="text"
        value={text}
        onChange={(e) => search(e.target.value)}
        placeholder="Serach by title or text"
        className="w-full md:min-w-sm lg:min-w-md xl:min-w-lg"
      />
    </div>
  );
};

export default SearchBox;
