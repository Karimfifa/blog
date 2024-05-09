'use client'
import { useState  , useEffect } from "react"

export default function App() {
  const [title , setTitle] = useState('');
  const [content , setContent ]= useState("");
  const [author, setAuthor]= useState("") ;
  // Submit the form data to api

  //get blogs
  async function fetchBlogs() {
    const resp = await fetch("http://localhost:3000/api/blogs",{
      method : "GET",
      headers:{
        "Accept":"application/json",
        "Content-Type": "application/json",
    }
    })
    const blogs = await resp.json();
  }


  useEffect(()=>{
    fetchBlogs();
  },[])
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
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300" htmlFor="author">
              Author
            </label>
            <input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-indigo-500"
              id="author"
              name="author"
              type="text"
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
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <img
                  alt="Blog Post Image"
                  className="h-32 w-full rounded-lg object-cover sm:h-40 sm:w-64"
                  src="/placeholder.svg"
                />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold">The Future of Web Development</h3>
                <div className="mb-2 text-gray-500 dark:text-gray-400">
                  <span>By John Doe</span>
                  <span className="mx-2">•</span>
                  <span>May 7, 2024</span>
                </div>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  In this blog post, we explore the latest trends and technologies that are shaping the future of web
                  development. From the rise of serverless architectures to the increasing importance of accessibility
                  and performance, we dive into the key areas that will define the web of tomorrow.
                </p>
                <a
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  href="#"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <img
                  alt="Blog Post Image"
                  className="h-32 w-full rounded-lg object-cover sm:h-40 sm:w-64"
                  src="/placeholder.svg"
                />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold">Mastering React Hooks</h3>
                <div className="mb-2 text-gray-500 dark:text-gray-400">
                  <span>By Jane Smith</span>
                  <span className="mx-2">•</span>
                  <span>April 15, 2024</span>
                </div>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  In this comprehensive guide, we dive deep into the world of React Hooks, exploring how they can
                  simplify your code, improve performance, and unlock new possibilities in your React applications. From
                  state management to custom hooks, we cover everything you need to become a React Hooks master.
                </p>
                <a
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  href="#"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
