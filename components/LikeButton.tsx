"use client"
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
interface LikeButtonProps {
    songId: string;
};

const LikeButton = React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient} = useSessionContext();

    const authModal = useAuth();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (!user?.id) {
            return;
            // check if the user has liked the song
        }
        const fetchData = async () => {
            const { data, error } = await supabaseClient.
            from("likes")
            .select("*")
            .eq("song_id", songId)
            .eq("user_id", user.id)
            .single();
            if (!error && data) {
                setIsLiked(true);
            }
        }
        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user?.id) {
            return authModal.onOpen();
        }
        if (isLiked) {
            // unlike the song
            const { error } = await supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId);
        if (error) {
            toast.error(error.message);
        } else {
            const { error } = await supabaseClient.
            from('liked_songs')
            .insert({
                song_id: songId,
                user_id: user.id
            });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Cancion añadida a favoritos');
        }
    }
    router.refresh();
    };

    return (
        <button onClick ={handleLike} className="hover:placeholder-opacity-75 transition">
            <Icon color="isLiked ? 'custom-color' : 'custom-color-2'" size={25}/>
        </button>
    );
    }
}
export default LikeButton;

