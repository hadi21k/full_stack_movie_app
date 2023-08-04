import Collection from "@/models/collection";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
  try {
    connectToDB();

    const res = await Collection.findById(params.collection_id);

    return new NextResponse(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { name } = await req.json();

    connectToDB();

    const res = await Collection.findByIdAndUpdate(params.collection_id, {
      name,
    });

    return new NextResponse(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();

    await Collection.findByIdAndRemove(params.collection_id);

    return new NextResponse(JSON.stringify({ message: "Collection deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error }), {
      status: 400,
    });
  }
};
