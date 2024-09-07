"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { openSourceProjects } from "@/constants";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { AppContext } from "@/context/AppContext";
import AddProjectSidebar from "@/components/AddProjectSidebar";
import { GithubIcon } from "lucide-react";
import ProjectsSection from "@/components/ProjectsSection";
import Link from "next/link";
import { getAllOpenSourceProjectsFirebase } from "@/lib/actions/projects.action";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useGitHub } from "use-github-react/dist/use-github";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const {
    showAddProjectSidebar,
    setshowAddProjectSidebar,
    allOpenSourceProjects,
    setallOpenSourceProjects,
  } = useContext(AppContext);

  const handleLearnMore = (project: any) => {
    setSelectedProject(project);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setSelectedProject(null);
  };

  const handleCloseAddProjectSidebar = () => {
    setshowAddProjectSidebar(!showAddProjectSidebar);
  };

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
  useEffect(() => {
    getAllOpenSourceProjectsFirebase();
  }, []);

  const { user } = useUser();
  const { getRepositories } = useGitHub({ username: user?.username! });
  const repositories = getRepositories().all();

  // console.log(repositories);

  useEffect(() => {
    console.log("logging all projects", allOpenSourceProjects);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center max-w-7xl mx-auto p-24">
      <div className="flex flex-col items-center lg:flex-row">
        <p className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-5xl text-center text-transparent bg-clip-text font-extrabold">
          Open Source your projects
        </p>
        <GithubIcon size={40} className="ml-3 mt-3 lg:mt-0" fill="black" />
      </div>
      <p className="text mt-5 text-gray-400 max-w-xl text-center">
        Open Source and list your projects here, so community can help you
        build, especially built for{" "}
        <Link
          target="_blank"
          href={" https://x.com/search?q=%23buildinpublic&src=hashtag_click"}
        >
          <span className="font-bold underline text-blue-600 cursor-pointer">
            #buildinpublic
          </span>
        </Link>
      </p>

      <ProjectsSection
        openSourceProjects={allOpenSourceProjects}
        handleLearnMore={handleLearnMore}
      />
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleCloseSidebar}
          />
          <Sidebar
            selectedProject={selectedProject}
            handleCloseSidebar={handleCloseSidebar}
          />
        </>
      )}
      {showAddProjectSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleCloseAddProjectSidebar}
          />
          <AddProjectSidebar
            handleCloseSidebar={handleCloseAddProjectSidebar}
          />
        </>
      )}
      <Footer />
    </main>
  );
}
