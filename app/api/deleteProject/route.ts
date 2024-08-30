import AddProjectSchema from "@/app/models/AddProjectSchema";
import { connectToDatabase } from "@/lib";
import { connect } from "http2";

import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const projectId = body.projectId;
    const user = await AddProjectSchema.findByIdAndDelete(projectId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
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
