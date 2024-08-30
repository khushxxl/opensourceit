import AddProjectSchema from "@/app/models/AddProjectSchema";
import { connectToDatabase } from "..";

export const getAllProjects = async () => {
  try {
    await connectToDatabase();

    const projects = await AddProjectSchema.find();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (formdata: any) => {
  try {
    await connectToDatabase();

    const newProject = await AddProjectSchema.create(formdata);

    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    console.log(error);
  }
};
