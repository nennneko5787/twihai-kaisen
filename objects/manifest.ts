export interface Item {
  id: number;
  type: "twks" | "zero";
  chapter: string;
  maxPage: number;
}

export interface Manifest {
  items: Item[];
}
