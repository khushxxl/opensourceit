import React from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { GithubIcon, Link2, LinkIcon } from "lucide-react";
import Image from "next/image";

function Sidebar({
  selectedProject,
  handleCloseSidebar,
}: {
  selectedProject: any;
  handleCloseSidebar: any;
}) {
  return (
    <motion.div
      className="fixed inset-y-0 right-0 bg-white max-w-xl w-full shadow-xl p-10 pt-20 z-50"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <button
        className="text-gray-600 absolute top-3 right-3"
        onClick={handleCloseSidebar}
      >
        ✕
      </button>
      <div className="space-y-5">
        <div>
          <Label>Project Name</Label>
          <p className="text-gray-600 font-semibold mt-[1px] text-2xl">
            {selectedProject?.projectName}
          </p>
        </div>
        <div>
          <Label>Project By</Label>
          <p className="text-gray-600 font-semibold mt-[1px] text-md">
            {selectedProject?.projectBy}
          </p>
        </div>

        <div className="mt-2">
          <Label>Project By</Label>
          <p className="mt-2">{selectedProject?.projectDescription}</p>
        </div>
        <div className="flex items-center space-x-5">
          {selectedProject?.tags?.map((data: any, i: number) => {
            return (
              <div className="bg-gray-200 p-1 rounded-2xl px-3 text-xs" key={i}>
                {data}
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <Link target="_blank" href={selectedProject?.githubURL}>
            <Button className="flex space-x-4" variant={"outline"}>
              <span> Contribute on Github </span>
              <GithubIcon />
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mt-7">
          {selectedProject?.liveUrl && (
            <div className="">
              <Link target="_blank" href={selectedProject?.githubURL}>
                <Button className="flex space-x-4" variant={"outline"}>
                  <span> Visit Live Project</span>
                  <LinkIcon />
                </Button>
              </Link>
            </div>
          )}

          {selectedProject?.twitterlink && (
            <div>
              <Link href={selectedProject?.twitterlink}>
                <Button variant={"outline"}>
                  <Image
                    height={13}
                    width={13}
                    alt=""
                    className="mx-2"
                    src={require("../app/assets/xlogo.png")}
                  />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
