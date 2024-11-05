import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity, CheckCheck, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import Portfolio from "./Portfolio";

interface Profileprops {
  params: Promise<{ address: string }>;
}

const cartDetails = [
  { title: "Position value", icon: TrendingUp },
  { title: "Profit/loss", icon: Activity },
  { title: "Volume traded", icon: CheckCheck },
  { title: "Markets traded", icon: CheckCheck },
];

interface cardDetails {
  title: string;
  icon: ForwardRefExoticComponent<LucideProps>;
}

async function page(props: Profileprops) {
  const params = await props?.params;
  const { address } = params;

  if (address == "undefined") {
    return (
      <div className="flex justify-center items-center h-screen ">
        Please Connect your wallet first
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen  py-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex mt-5 items-center gap-2">
        <p className=" bg-gray-300 rounded-lg px-2">
          {address?.slice(0, 4)}....{address?.slice(-4)}
        </p>
        <p> Joined Nov 2024</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {cartDetails?.map((Res: cardDetails, index: number) => {
          const Icon = Res.icon;
          return (
            <Card className="" key={index}>
              <CardContent className="p-2">
                <section className="bg-gray-600 w-10 h-10 flex justify-center items-center rounded-full">
                  <Icon size={25} color={"white"} />
                </section>
                <CardTitle className="font-normal mt-3 text-sm">
                  {Res.title}
                </CardTitle>
                <p className="font-bold">$0.00</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Portfolio />
    </div>
  );
}
export default page;
