import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/context/AppContext";
import { Input } from "./ui/input";
import { Trash, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

function ProjectsSection({
  openSourceProjects,
  handleLearnMore,
}: {
  openSourceProjects: any;
  handleLearnMore: any;
}) {
  const { filterText, setfilterText, setallOpenSourceProjects } =
    useContext(AppContext);

  const { user } = useUser();
  async function getAllProjects() {
    const response = await fetch(`/api/getAllProjects`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  }
  const deleteProject = async (projectId: string) => {
    try {
      const res = await fetch("/api/deleteProject", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      const data = await res.json();
      toast.success("Your Project has been deleted");
      console.log(data.message); // Success message
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  // Filter projects only if filterText exists, otherwise show all projects
  const filteredProjects = filterText
    ? openSourceProjects.filter(
        (project: any) =>
          project.projectName
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          project.projectDescription
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          project.tags.some((tag: string) =>
            tag.toLowerCase().includes(filterText.toLowerCase())
          )
      )
    : openSourceProjects;

  if (filteredProjects) {
    return (
      <div className="flex flex-col justify-start items-start mt-20 min-h-[80vh]">
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 mt-10">
          {filteredProjects.map((data: any, i: number) => (
            <div key={i} className="border rounded p-5 relative  max-w-lg ">
              <p className="font-bold text-lg bg-gradient-to-t mt-5 from-purple-800 h-fit via-violet-900 to-purple-800 text-transparent bg-clip-text">
                {data?.projectName}
              </p>

              {user?.emailAddresses[0].emailAddress ==
                data?.projectOwner?.emailAddresses[0]?.emailAddress && (
                <div
                  onClick={async () => {
                    await deleteProject(data?._id).then(async () => {
                      await getAllProjects()
                        .then((result) => {
                          setallOpenSourceProjects(result);
                          console.log("Open Source Projects", result);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    });
                  }}
                  className=" absolute top-5 cursor-pointer right-5"
                >
                  <XIcon size={17} />
                </div>
              )}
              <p className="text-gray-600 font-semibold ">{data?.projectBy}</p>
              <p className="mt-2  max-w-xs overflow-x-hidden">
                {data?.projectDescription}
              </p>
              <Button
                variant={"outline"}
                className="mt-5 text-sm"
                onClick={() => handleLearnMore(data)}
              >
                Learn More
              </Button>
              {data?.tags && (
                <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {data?.tags?.map((data: any, i: number) => {
                    return (
                      <div
                        className="bg-gray-200 p-1 rounded-2xl w-fit px-3 text-xs"
                        key={i}
                      >
                        {data}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProjectsSection;
