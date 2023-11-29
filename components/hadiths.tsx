"use client";
import { hadithsAtom } from "@/atoms/search-atoms";
import { useAtomValue } from "jotai";
import HadithCard from "./hadithCard";

function Hadiths() {

  const hadiths = useAtomValue(hadithsAtom);

  return (
    <>{!hadiths.length ? 
        (
          <p>Sorry. we could not found any related hadith to your search</p>
        ) : 
        (
          hadiths.map((hadith) => (
            <HadithCard key={hadith.id} hadith={hadith} />
          ))
        )
      }
    </>
  )
}

export default Hadiths