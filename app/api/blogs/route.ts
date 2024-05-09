import { createClient } from "@/lib/supabase/config";
export async function GET(req: Request){
    const supabase = createClient();
    // Get all the data in the table "from_api"

    const  {data, error} = await supabase.from('blogs').select(); 

    return Response.json({msg: 'Blogs retrieved successfully', data})
}