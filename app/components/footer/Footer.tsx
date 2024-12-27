import Image from "next/image";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaCopyright } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const marketList = [
    { title: "Sports", link: "" },
    { title: "Politics", link: "" },
    { title: "Finance", link: "" },
    { title: "News", link: "" },
    { title: "Entertainment", link: "" },
  ];

  const resourceList = [
    { title: "Create", link: "" },
    { title: "Contact", link: "" },
    { title: "About", link: "" },
  ];

  return (
    <main className=" my-2 px-4  py-4">
      <div className="border flex justify-between items-  border-x-0 py-4  rounded border-slate-300">
        <section>
          <Image src={"/dark_logo.svg"} alt="logo" width={100} height={100} />
          <p className="mt-5 font-sm font-light text-textPrimary">
            The India's Biggest opinion market
          </p>
        </section>
        <section>
          <h1 className=" text-lg font-medium">Markets</h1>
          <div className="flex flex-col mt-2">
            {marketList?.map((res) => {
              return (
                <Link href={res.link} className="font-light text-textPrimary">
                  {res.title}
                </Link>
              );
            })}
          </div>
        </section>
        <section>
          <h1 className=" text-lg font-medium">Resources</h1>
          <div className="flex flex-col mt-2">
            {resourceList.map((res) => {
              return (
                <Link href={res.link} className="font-light text-textPrimary">
                  {res.title}
                </Link>
              );
            })}
          </div>
        </section>
        <section>
          <h1 className=" text-lg font-medium">Join the community</h1>
          <div className="flex px-1 mt-2 gap-5">
            <Link
              href={"https://x.com/opinionclubhq"}
              className=" rounded-md text-white "
            >
              <BsTwitterX color="black" size={25} />
            </Link>
            <Link
              href={"https://t.co/j2P7bsAxJ0"}
              className=" rounded-md text-white "
            >
              <FaTelegramPlane color="black" size={30} />
            </Link>
          </div>
        </section>
      </div>

      <section className="mt-3 flex justify-between">
        <p className="flex items-center gap-1">
          Opinion Club <FaCopyright /> 2024
        </p>
        <Link href={""} className=" rounded-md ">
          Terms of Service
        </Link>
      </section>
    </main>
  );
}
export default Footer;
