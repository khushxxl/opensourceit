import AddProjectSchema from "@/app/models/AddProjectSchema";
import { connectToDatabase } from "@/lib";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectToDatabase();

  try {
    const projects = await AddProjectSchema.find({});

    if (!projects) {
      return new Response(JSON.stringify({ message: "Projects not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
