"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { useGitHub } from "use-github-react/dist/use-github";
import { GitBranch } from "lucide-react";

export function ProjectSelector({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: any;
  setSelectedProject: any;
}) {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { user, isSignedIn } = useUser();
  const { getRepositories } = useGitHub({ username: user?.username! });
  const repositories = getRepositories().all();

  const filteredRepos = repositories.filter((repo: any) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select
      onValueChange={(value) => {
        const selectedRepo = repositories.find(
          (repo: any) => repo.name === value
        );
        setSelectedProject(selectedRepo);
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Select a Project from GitHub" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSignedIn &&
            filteredRepos.map((data: any, i: number) => (
              <SelectItem key={i} value={data.name}>
                <div className="flex items-center space-x-3">
                  <GitBranch size={17} /> <p>{data?.name}</p>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
