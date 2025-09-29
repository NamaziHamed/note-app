import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

const AddNewNote = () => {
  return (
    <Link
      className="flex gap-2 items-center fixed bottom-0 right-0 p-3 hover:scale-110 duration-300 transition-all"
      href={"/note/new"}
    >
      <PlusCircleIcon className="text-primary w-10 h-10 " />
    </Link>
  );
};

export default AddNewNote;
