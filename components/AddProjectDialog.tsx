"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { GitBranch, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGitHub } from "use-github-react/dist/use-github";

export function AddProjectDialog() {
  const [allUserRepos, setAllUserRepos] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isSignedIn } = useUser();
  const { getRepositories } = useGitHub({ username: user?.username! });
  const repositories = getRepositories().all();

  //   useEffect(() => {
  //     setAllUserRepos(repositories);
  //   }, [repositories]);

  const filteredRepos = repositories.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedRepo, setselectedRepo] = useState<any>();

  //   console.log(repositories);
  const [formData, setFormData] = useState({
    projectName: "",
    projectBy: "",
    projectDescription: "",
    githubURL: "",
    tags: [] as string[],
    liveUrl: "",
    projectOwner: {
      userName: user?.fullName,
      emailId: user?.emailAddresses[0].emailAddress,
      profileImg: user?.imageUrl,
    },
    twitterlink: "",
  });
  const [tag, setTag] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTags();
    }
  };
  const addTags = () => {
    if (formData.tags.length >= 5 || tag.length > 8) {
      return;
    }
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
    setTag("");
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const AllRepos = () => {
    return (
      <div className="overflow-y-auto min-h-[400px] max-h-[430px] gap-5 grid grid-cols-1 place-items-center place-content-center lg:grid-cols-3">
        {isSignedIn &&
          filteredRepos.map((data: any, i: number) => (
            <div className="border h-fit  p-3 w-full max-w-xs" key={i}>
              <div className="justify-between items-center flex w-full">
                <div className="flex space-x-3">
                  <GitBranch /> <p>{data?.name}</p>
                </div>
                <div>
                  <p
                    onClick={() => setselectedRepo(data)}
                    className="text-xs text-blue-600 cursor-pointer font-semibold"
                  >
                    Add
                  </p>
                </div>
              </div>
              {data?.language && (
                <div className="flex items-center space-x-2 mt-2 ml-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-xs"> {data?.language} </p>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  const SelectedProject = () => {
    return (
      <div className=" max-w-sm mt-3 space-y-5">
        <div>
          <Label>Project Name</Label>
          <Input
            name="projectName"
            className=""
            value={selectedRepo?.name}
            onChange={handleInputChange}
            required
            placeholder="Enter name of your project"
          />
        </div>
        <div>
          <Label>Live URL (optional)</Label>
          <Input
            name="liveUrl"
            className="mt-3"
            placeholder="Enter your Project's URL"
            value={formData.liveUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Label className="flex items-center space-x-2">
              Your
              <Image
                height={13}
                width={13}
                alt=""
                className="mx-2"
                src={require("../app/assets/xlogo.png")}
              />
              handle (optional)
            </Label>
          </div>
          <Input
            name="twitterlink"
            className="mt-3"
            placeholder="Enter your Project's / Creators Twitter handle"
            value={formData.twitterlink}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label>Tags (Eg. Tech Stack)</Label>

          <div className="flex w-full items-center space-x-2">
            <Input
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-3"
              placeholder="Eg. Nextjs"
              value={tag}
              maxLength={8}
            />
            <p
              className=" text-blue-800 hover:text-blue-950 cursor-pointer font-semibold py-2 px-3 mt-3 text-sm "
              onClick={addTags}
            >
              Add
            </p>
          </div>
          <p
            className={`text-xs ${
              tag.length > 8 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {tag.length}/8
          </p>
        </div>
      </div>
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={18} className="mr-2" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Repositories</DialogTitle>
          <DialogDescription>
            Add your github projects directly & make them open source in seconds
          </DialogDescription>
        </DialogHeader>
        {!selectedRepo && (
          <div className="mb-4">
            <Input
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        {!selectedRepo && <AllRepos />}
        {selectedRepo && <SelectedProject />}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
