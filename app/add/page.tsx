"use client";

// import hadiths from "../../hadithDB/test/batch1.json";
import { hadithType } from "@/types"

const AddDataPage = () => {
  const addHandler = async (hadith: hadithType) => {
    const res = await fetch("/api/hadiths", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hadith),
    });
    if (res.ok) {
      console.log("Added hadith");
    } else {
      console.log("Failed to add hadith");
    }
  };

  const hadiths = []
  const addData = async () => {
    for (const hadith of hadiths
      // .filter((_, index) => index > 12)
      ) {
      await addHandler(hadith);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <button
        className="px-4 py-3 rounded-md bg-neutral-900 text-neutral-50"
        onClick={addData}
      >
        Add Data
      </button>
    </div>
  );
};

export default AddDataPage;
