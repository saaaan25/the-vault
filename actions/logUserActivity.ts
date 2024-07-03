import { SupabaseClient } from '@supabase/supabase-js';

const logUserActivity = async (supabaseClient: SupabaseClient, userId: string, songId: number) => {
    const { error } = await supabaseClient
        .from('user_activity')
        .insert([{ user_id: userId, song_id: songId }]);
    
    if (error) {
        console.error('Error logging user activity:', error);
    }
}

export default logUserActivity