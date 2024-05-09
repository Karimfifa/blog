import { createClient } from "@/lib/supabase/config";
export async function POST(req){
    const supabase = createClient();
    // Get all the data in the table "from_api"
    const title = await req.headers.get('title')
    const content = await req.headers.get('content')
    const author = await req.headers.get('author')

    const  {data, error} = await supabase.from('blogs').insert({
        title: title,
        author:author,
        content: content
    }); 
    if (error) throw new Error(error.message);
    return Response.json({status:'ok'})
}