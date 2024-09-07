"use client";
import React, { useContext } from "react";
import { CategorySelector } from "./CategorySelector";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { AppContext } from "@/context/AppContext";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { AddProjectDialog } from "./AddProjectDialog";

function Navbar() {
  const {
    showAddProjectSidebar,
    setshowAddProjectSidebar,
    filterText,
    setfilterText,
  } = useContext(AppContext);

  const { isSignedIn } = useAuth();
  return (
    <div className={`p-8 flex items-center justify-between   bg-white`}>
      <div>
        <Link href={"/"}>
          <h1 className="font-bold cursor-pointer text-xl">opensourceit</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-5">
        {/* <div className="w-fit min-w-[170px]">
          <CategorySelector />
        </div> */}
        <Input
          onChange={(e) => setfilterText(e.target.value)}
          placeholder="Search for a project"
          className="w-fit hidden lg:flex"
        />
        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setshowAddProjectSidebar(!showAddProjectSidebar)}
            >
              <Plus size={18} className="mr-2" /> Add Project
            </Button>
            {/* <AddProjectDialog /> */}
            <UserButton />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
