import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type hadithType = {
  id: number;
  arabic: string;
  narrator: string;
  english: string;
  chapterId: number;
  bookId: number;
  idInBook: number;
};
