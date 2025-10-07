"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import MasonaryLayout from "@/components/dashboard/MasonaryLayout";
import AddNewNote from "@/components/dashboard/AddNewNote";
import SearchBox from "@/components/dashboard/SearchBox";
import { NoteData } from "@/utils/types";
import axios from "axios";
import { toast } from "sonner";

const page = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<NoteData[]>([]);
  const [filtered, setFiltered] = useState(data);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value.length) {
      const res = data.filter((note) => {
        const search =
          note.plainText?.toLowerCase().includes(value) ||
          note.title?.toLowerCase().includes(value);
        if (search) return note;
      });
      setFiltered(res);
    } else {
      setFiltered(data);
    }
  };

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const res = await axios.get("/api/note");
        if (res.status === 200) {
          setData(res.data);
          setFiltered(res.data);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserNotes();
  }, []);

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

  if (status === "loading")
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center gap-3">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
        <p>Loading ...</p>
      </div>
    );
  return (
    <main>
      <Sidebar session={session} />
      <div>
        <div className="ps-24 pt-10 pe-3 w-full gap-4">
          <h2 className="font-semibold text-2xl text-primary mb-4">
            All notes
          </h2>
          <SearchBox text={searchText} search={handleSearch} />
        </div>
        <MasonaryLayout data={filtered} onRemove={handleRemove} />
      </div>
      <AddNewNote />
    </main>
  );
};

export default page;
