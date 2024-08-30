import { LinkedinIcon, TwitterIcon } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="w-[100%]  mt-32 flex items-center flex-col justify-center">
      <hr />
      <div className="w-full pt-5 flex justify-center flex-col items-center text-center lg:justify-between lg:flex-row">
        <div className="text-gray-500">
          <p>Send us an email</p>
          <p>khushaal.choithramani@gmail.com</p>
        </div>
        <div className="text-gray-500 mt-5">
          <p className="underline">2024 © opensourceit.com</p>
        </div>
        <div className="text-gray-500 flex items-center flex-col mt-5 lg:mt-0">
          <p> Made by Khush with 💜</p>
          <div className="flex items-center space-x-2">
            <LinkedinIcon size={16} fill="black" color={"black"} />
            <TwitterIcon size={16} fill="black" color={"black"} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
