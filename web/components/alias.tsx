import { Dispatch, SetStateAction } from "react";

export type Codebase = {
  cursor: number;
  name: string[];
  code: string[];
};

export type SetCodebase = Dispatch<
  SetStateAction<{
    cursor: number;
    name: string[];
    code: string[];
  }>
>;
