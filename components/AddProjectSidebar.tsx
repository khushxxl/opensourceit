import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Github } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { AppContext } from "@/context/AppContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";

function AddProjectSidebar({
  handleCloseSidebar,
}: {
  handleCloseSidebar: any;
}) {
  const { user } = useUser();

  const { allOpenSourceProjects, setallOpenSourceProjects } =
    useContext(AppContext);

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

  const validateForm = () => {
    const { projectName, projectBy, projectDescription, githubURL } = formData;
    if (!projectName || !projectBy || !projectDescription || !githubURL) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };
  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    setloading(true);
    toast.loading("Adding your project", { id: "1" });
    if (!validateForm()) {
      setloading(false);
      toast.error("Error in adding your project", { id: "1" });
      return;
    }

    try {
      await addDoc(collection(db, "all-open-source-projects"), formData).then(
        async () => {
          await getAllOpenSourceProjectsFirebase();
          toast.success("Project created", { id: "1" });
          setloading(false);
          handleCloseSidebar();
        }
      );
    } catch (error) {
      setloading(false);
      toast.error("Error in adding your project", { id: "1" });
      console.log(error);
    }
  };

  return (
    <motion.div
      className="fixed inset-y-0 right-0 bg-white max-w-md w-full shadow-xl p-10 pt-20 z-50 overflow-y-auto"
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

      <div className="flex items-center space-x-2">
        <p>
          <Github />
        </p>
        <p className="bg-gradient-to-t text-left from-purple-800 h-fit via-violet-900 to-purple-800 text-xl text-transparent bg-clip-text font-extrabold">
          Add Project
        </p>
      </div>
      <div className="space-y-5 mt-10">
        <div>
          <Label>Project Name</Label>
          <Input
            name="projectName"
            className="mt-3"
            value={formData.projectName}
            onChange={handleInputChange}
            required
            placeholder="Enter name of your project"
          />
        </div>
        <div>
          <Label>Project By</Label>
          <Input
            name="projectBy"
            className="mt-3"
            value={formData.projectBy}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div>
          <Label>What is your project about?</Label>
          <Textarea
            name="projectDescription"
            className="focus:outline-none mt-3"
            value={formData.projectDescription}
            onChange={handleInputChange}
            required
            placeholder="Describe what is your project about, you can also write about the areas where you would like the community to help you with!"
          />
        </div>
        <div>
          <Label>Enter Github URL</Label>
          <Input
            name="githubURL"
            className="mt-3"
            placeholder="https://github.com/username/repo"
            value={formData.githubURL}
            onChange={handleInputChange}
            required
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
          <Input
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-3"
            placeholder="Eg. Nextjs"
            value={tag}
            maxLength={8}
          />
          <p
            className={`text-xs ${
              tag.length > 8 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {tag.length}/8
          </p>
        </div>

        <div className="grid grid-cols-3 place-items-start gap-3 place-content-start">
          {formData.tags.map((data, i) => (
            <div
              className="bg-gray-200 flex items-center w-fit p-1 h-fit rounded-2xl px-3 text-xs"
              key={i}
            >
              {data.length > 8 ? `${data.slice(0, 8)}...` : data}
              <XIcon
                size={14}
                className="ml-1 cursor-pointer"
                onClick={() => removeTag(i)}
              />
            </div>
          ))}
        </div>
        {formData.tags.length >= 5 && (
          <p className="text-xs text-red-600">
            You can enter a maximum of 5 tags
          </p>
        )}
        <Button disabled={loading} className="px-10" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </motion.div>
  );
}

export default AddProjectSidebar;
