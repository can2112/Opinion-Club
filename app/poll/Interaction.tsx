"react-icons/bs";
import Image from "next/image";
import VoteImage from "../components/icons/Vote.svg";
import CommentImage from "../components/icons/Comment.svg";
import ShareImage from "../components/icons/Share.svg";
import { Button } from "@/components/ui/button";
import VerticalDots from "../components/icons/VDots.svg";

function Interaction() {
  return (
    <div className="flex justify-between  items-center mt-5 ">
      <section className="flex gap-8 justify-start   items-center">
        <div className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2">
          <Image
            src={VoteImage}
            alt=""
            width={25}
            height={25}
            className="rotate-180"
          />
          <p>202</p>
        </div>

        <div className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2">
          <Image src={VoteImage} alt="" width={25} height={25} />
          <p>332</p>
        </div>

        <div className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2">
          <Image src={CommentImage} width={25} height={25} alt="comment" />
          <p>90</p>
        </div>
      </section>
      <section className="flex items-center gap-5">
        <Button variant={"ghost"} size={"icon"}>
          <Image src={ShareImage} width={25} height={25} alt="comment" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Image src={VerticalDots} width={25} height={25} alt="comment" />
        </Button>
      </section>
    </div>
  );
}
export default Interaction;
