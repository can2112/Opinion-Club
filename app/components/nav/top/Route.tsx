"use client";
import { useAccount } from "wagmi";
import NavLink from "../NavLink";

function Routes() {
  const { address } = useAccount();

  return (
    <div className=" md:flex gap-12 hidden">
      {address && <NavLink label="PORTFOLIO" route={`/profile/${address}`} />}
    </div>
  );
}
export default Routes;
