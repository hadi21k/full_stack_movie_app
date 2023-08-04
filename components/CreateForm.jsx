"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const CreateForm = ({ media }) => {
  const [collectionName, setCollectionName] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);

  const createCollection = async (e) => {
    e.preventDefault();

    try {
      if (!session)
        throw new Error("You must be logged in to create a collection");
      if (!collectionName) {
        throw new Error("You must provide a collection name");
      }
      setCreating(true);
      const response = await fetch("/api/collections/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          collectionName,
          title: media.original_title || media.name || media.title,
          src: media.backdrop_path,
          mediaId: media.id,
          mediaType: media.media_type,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      toast({
        description: "Your collection was created successfully",
      });
      router.push(`/`);
    } catch (err) {
      console.error(err.message);
      toast({
        description: err.message,
      });
    } finally {
      setCreating(false);
    }
  };
  return (
    <form
      onSubmit={createCollection}
      className="flex flex-col gap-4 bg-white/10 backdrop-filter backdrop-blur-xl p-4 rounded-md"
    >
      <Input
        type="text"
        placeholder="Collection Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <Button className="bg-primary hover:bg-foreground">
        {creating ? "Creating..." : "Create"}
      </Button>
    </form>
  );
};

export default CreateForm;
