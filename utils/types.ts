export interface IPlainNotedata {
  id: string;
  title: string | null;
  plainText: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteData extends IPlainNotedata {
  jsonText: string | null;
}

export type EditorActiveState = {
  isBold: boolean;
  isUnderline: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isParagraph: boolean;
  isAlignLeft: boolean;
  isAlignRight: boolean;
  isAlignCenter: boolean;
  isJustify: boolean;
  canUndo: boolean;
  canRedo: boolean;
};
