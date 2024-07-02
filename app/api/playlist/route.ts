import { NextResponse } from 'next/server'
import getPlaylistsByUserId from '@/actions/getPlaylistsByUserId'

export async function GET() {
  const playlists = await getPlaylistsByUserId();
  return NextResponse.json(playlists);
}
