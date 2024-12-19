"react-icons/bs";
import Image from "next/image";
import VoteImage from "../components/icons/Vote.svg";
import CommentImage from "../components/icons/Comment.svg";
import ShareImage from "../components/icons/Share.svg";
import { Button } from "@/components/ui/button";
import VerticalDots from "../components/icons/VDots.svg";

function Interaction() {
  return (
    <div className="flex justify-between  items-center mt-5 px-1">
      <section className="flex gap-8   items-center">
        <Button variant={"ghost"} className="gap-1">
          <Image
            src={VoteImage}
            alt=""
            width={25}
            height={25}
            className="rotate-180"
          />
          <p>202</p>
        </Button>

        <Button variant={"ghost"} className="gap-1">
          <Image src={VoteImage} alt="" width={25} height={25} />
          <p>332</p>
        </Button>

        <Button variant={"ghost"} className="gap-1">
          <Image src={CommentImage} width={25} height={25} alt="comment" />
          <p>90</p>
        </Button>
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
