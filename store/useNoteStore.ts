import { create } from "zustand";
import { JSONContent } from "@tiptap/react";

// Define a constant for the initial empty state for reuse.
const emptyDoc: JSONContent = { type: "doc", content: [] };
const initialState = {
  id: null as string | null, // Use null to represent "no note loaded"
  title: "",
  jsonText: emptyDoc,
};

interface INoteStore {
  id: string | null;
  title: string;
  jsonText: JSONContent;
  setNote: (note: { id: string; title: string; jsonText: JSONContent }) => void;
  setTitle: (title: string) => void;
  setJsonText: (jsonText: JSONContent) => void;
  clearNote: () => void;
}

export const useNoteStore = create<INoteStore>()((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setJsonText: (jsonText) => set({ jsonText }),
  setNote: (note) => set({ ...note }),
  clearNote: () => set({ ...initialState, id: "new" }), // Set id to "new" for a new note
}));
