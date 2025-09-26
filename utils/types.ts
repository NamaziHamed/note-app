import { inherits } from "util";

export interface Notedata {
  id: string;
  title: string | null;
  plainText: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpecificNoteData extends Notedata {
  jsonText: string | null;
}
