"use client"

import {Divider} from "@nextui-org/react";
import { title } from "@/components/primitives";
import SearchInput from '@/components/searchInput'
import Hadiths from "@/components/hadiths";


export default function DocsPage() {

	return (
		<div className=" min-h-screen space-y-6">
			<SearchInput />
			<Divider className="my-4" />
			<Hadiths />
		</div>		
	);
}


// {hadiths.map(hadith => {
// 	return (
// 		<Card key={hadith.id} className="max-w-[400px] md:max-w-full p">
// 			<CardHeader className="flex gap-3">
// 				<div className="flex flex-col w-full space-y-2">
// 					<div className=" flex justify-between items-center">
// 						<p className="text-md">The Forty Hadith of Imam Nawawi</p>
// 						<p className="text-md">الأربعون النووية</p>
// 					</div>
// 					<p className="text-small text-default-500">{hadith.narrator}</p>
// 				</div>
// 			</CardHeader>
// 			<Divider/>
// 			<CardBody>
// 				<div className=" flex justify-between items-start gap-6">
// 					<div id="english" className=" text-left">
// 						<p>{hadith.english}</p>
// 					</div>
// 					<div id="arabic" className=" text-right">
// 					<p>{hadith.arabic}</p>
// 					</div>
// 				</div>
// 			</CardBody>
// 			<Divider/>
// 			<CardFooter>
// 				<div>
// 					<p>Reference: <span>The Forty Hadith of Imam Nawawi</span></p>
// 					<p>In-book reference: <span>Hadith 3</span></p>
// 					{/* &quot;, &ldquo;, &#34;, &rdquo; */}
// 				</div>
// 			</CardFooter>
// 		</Card>
// 	)
// })}