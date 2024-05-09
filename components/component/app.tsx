'use client'
import { useState  , useEffect } from "react"
import { createClient } from "@/lib/supabase/config";
import { useUser } from "@clerk/nextjs";
interface Name{
  firstName:string,
  lastName: string
}
export default function App() {
  const supabase = createClient();
  // State to store our user data.
  const [title , setTitle] = useState('');
  const [content , setContent ]= useState("");
  const [blogs , setBlogs] = useState([])
  const [refresh , setRefresh] = useState(false);
  const {user} =  useUser();
  const currentUser:any =  user?.fullName;

      
  useEffect( ()=>{
    const fetchdata = async ()=>{
      fetchBlogs();
      if(refresh){
        setRefresh(false)
      }
      
    }
    fetchdata();
  },[refresh])
  //-------------
 
  //get blogs
  async function fetchBlogs() {
   try {  
      const {data,error}:any = await supabase.from('blogs').select().order('id',{ascending:false});
      data ? setBlogs(data) : console.log("Error in Fetching Blogs");
   } catch (error) {
    alert(error)
   }
  }
  
  // Submit the form data to api

  async function handlesubmit(e:any){
    e.preventDefault();
    const request = await fetch('https://blog-sigma-lyart-46.vercel.app/api/blogs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        title:title,
        content:content,
        author:currentUser
      },
    })
    request ? setRefresh(true)  : console.log("Error In Adding Data");
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Create a New Post</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
              Title
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-indigo-500"
              id="title"
              name="title"
              type="text"
              onChange={(e:any)=>setTitle(e.target.value)}
            />
          </div>
         
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300" htmlFor="content">
              Content
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-indigo-500"
              id="content"
              name="content"
              rows={4}
              onChange={(e:any)=>setContent(e.target.value)}
            />
          </div>
          <button
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
      <div className="space-y-8">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-200">
          <h2 className="mb-4 text-2xl font-bold">Recent Blog Posts</h2>
          <div className="space-y-6">
            {
              blogs.map((blog:any)=>(
                <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  <img
                    alt="Blog Post Image"
                    className="h-32 w-full rounded-lg object-cover sm:h-40 sm:w-64"
                    src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=600"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold">{blog.title}</h3>
                  <div className="mb-2 text-gray-500 dark:text-gray-400">
                    <span>{blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.created_at}</span>
                  </div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    {blog.content}
                  </p>
                  {/* <a
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    href="#"
                  >
                    Read More
                  </a> */}
                </div>
              </div>
              ))
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}
