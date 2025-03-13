import { Dispatch, SetStateAction } from "react";

export type Codebase = {
  cursor: number;
  name: string[];
  code: string[];
};

export type Modifier = Dispatch<
  SetStateAction<{
    cursor: number;
    name: string[];
    code: string[];
  }>
>;
