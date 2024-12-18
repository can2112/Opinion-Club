import { Avatar, AvatarImage } from "../components/ui/avatar";
import Interaction from "./Interaction";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: "normal",
});

interface QuestionProp {
  title: string;
  postedBy: string;
  timeAgo: string;
  description: string;
}

function Question({ title, postedBy, timeAgo, description }: QuestionProp) {
  return (
    <div className="bg-white p-3 rounded-xl">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p className={`text-textSecondary text-sm ${noto.className} `}>
            Posted by {postedBy}
          </p>
        </div>

        <div>
          <p className="text-textSecondary text-sm">{timeAgo}</p>
        </div>
      </section>
      <h1 className="mt-2 text-heading font-semibold text-md-custom">
        {title}
      </h1>

      <p className="mt-3 text-textPrimary text-sm">{description}</p>
      <Interaction />
    </div>
  );
}
export default Question;
