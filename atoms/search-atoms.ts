
// import hadiths_data from "@/hadithDB/test/hadiths.json";
import { atom } from "jotai";

export enum Action {
  SEARCH = "SEARCH",
  RESET = "RESET",
}

const hadiths_data = []

// Search Handler Function
const searchHandler = async (query: string) => {
  const res = await fetch(`/api/search?query=${query}`);
  const { data } = await res.json();
  return data;
};

const searchActiveAtom = atom(false);

export const queryAtom = atom("", (_get, set, query) => {
  if (query === "") {
    set(searchAtom, Action.RESET);
  }
  set(queryAtom, query);
});

export const searchAtom = atom(
  (get) => get(searchActiveAtom),
  async (get, set, action: Action) => {
    const query = get(queryAtom);
    if (action === Action.SEARCH) {
      if (query.length === 0) {
        return;
      } else {
        set(searchActiveAtom, true);
        const data = await searchHandler(query);
        if (!data) {
          set(searchActiveAtom, false);
          return;
        }
        set(hadithsAtom, data);
        set(searchActiveAtom, false);
      }
    } else if (action === Action.RESET) {
      set(searchActiveAtom, false);
      set(hadithsAtom, hadiths_data);
    }
  }
);

export const hadithsAtom = atom(hadiths_data);
