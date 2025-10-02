import { create } from "zustand";
import { JSONContent } from "@tiptap/react";

const emptyDoc: JSONContent = { type: "doc", content: [] };
const initialState = {
  id: "new",
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
  clearNote: () => set({ ...initialState }),
}));
