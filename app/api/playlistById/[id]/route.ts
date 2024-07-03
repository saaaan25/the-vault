import { NextResponse } from 'next/server';
import getPlaylistById from '@/actions/getPlaylistById';

export async function GET(request: Request) {
    // Obtener el ID de la playlist desde la URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ error: "Playlist ID is required" }, { status: 400 });
    }

    const playlistId = Number(id)

    const playlist = await getPlaylistById(playlistId);

    if (!playlist) {
        return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    return NextResponse.json(playlist);
}
