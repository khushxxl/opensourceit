import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/context/AppContext";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

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

  const getAllOpenSourceProjectsFirebase = async () => {
    const projects: any[] = [];
    const querySnapshot = await getDocs(
      collection(db, "all-open-source-projects")
    );

    querySnapshot.forEach((doc) => {
      const projectData = {
        id: doc.id, // Include the document ID
        ...doc.data(), // Spread the document data
      };
      console.log(projectData.id, " => ", projectData);
      projects.push(projectData);
    });

    setallOpenSourceProjects(projects);
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, "all-open-source-projects", projectId)).then(
        async () => {
          await getAllOpenSourceProjectsFirebase();
          toast.success("Your Project has been deleted");
        }
      );
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 gap-y-5 mt-10 place-content-center place-items-center">
          {filteredProjects.map((data: any, i: number) => (
            <div
              key={i}
              className="border rounded  relative max-w-lg min-h-[350px] min-w-[300px] p-5"
            >
              <p className="font-bold text-lg bg-gradient-to-t mt-5 from-purple-800 h-fit via-violet-900 to-purple-800 text-transparent bg-clip-text">
                {data?.projectName}
              </p>

              {user?.emailAddresses[0].emailAddress ===
                data?.projectOwner?.emailId && (
                <div
                  onClick={async () => {
                    await deleteProject(data?.id);
                  }}
                  className="absolute top-5 cursor-pointer right-5"
                >
                  <XIcon size={17} />
                </div>
              )}

              <p className="text-gray-600 font-semibold">{data?.projectBy}</p>

              <p className="mt-2 max-w-xs overflow-hidden text-ellipsis max-h-[4.5em] line-clamp-3">
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
                <div className=" flex flex-wrap space-x-2 mt-4">
                  {data?.tags?.map((tag: string, i: number) => (
                    <div
                      className="bg-gray-200 p-1 rounded-2xl w-fit px-3 text-xs"
                      key={i}
                    >
                      {tag}
                    </div>
                  ))}
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
