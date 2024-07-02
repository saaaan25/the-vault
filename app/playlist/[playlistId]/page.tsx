"use client"

import PlaylistPage from "../components/PlaylistPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PlaylistPageWrapper = () => {
  const { playlistId } = useParams();
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (playlistId) {
      setId(Number(playlistId));
    }
  }, [playlistId]);

  if (id === null) {
    return <div>Loading...</div>;
  }

  return <PlaylistPage id={id} />;
};

export default PlaylistPageWrapper;
