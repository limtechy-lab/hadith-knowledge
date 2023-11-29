import {Card, CardHeader, CardBody, CardFooter, Divider,} from "@nextui-org/react";

import { hadithType } from "@/types";
export type HadithCardType = hadithType & {
  similarity: number;
};

function HadithCard({ hadith }: { hadith: HadithCardType }) {
  return (
    <Card className="max-w-[400px] md:max-w-full p">
    {/* <CardHeader className="flex gap-3">
      <div className="flex flex-col w-full space-y-2">
        <div className=" flex justify-between items-center">
          <p className="text-md">The Forty Hadith of Imam Nawawi</p>
          <p className="text-md">الأربعون النووية</p>
        </div>
      </div>
    </CardHeader> */}
    <Divider/>
    <CardBody>
      <div className=" flex justify-between items-start gap-6">
        <div id="english" className=" text-left space-y-1">
          <p className="text-small text-default-500">{hadith.narrator}</p>
          <p>{hadith.english}</p>
        </div>
        <div id="arabic" className=" text-right">
        <p>{hadith.arabic}</p>
        </div>
      </div>
    </CardBody>
    <Divider/>
    <CardFooter>
      <div className=" flex justify-start space-x-2 text-xs">
        <p>Book: <span>{hadith.book_id}</span></p>
        <p>Chapter: <span>{hadith.chapter_id}</span></p>
        <p>Hadith No.: <span>{hadith.id}</span></p>
        {/* &quot;, &ldquo;, &#34;, &rdquo; */}
      </div>
    </CardFooter>
  </Card>
  )
}

export default HadithCard

