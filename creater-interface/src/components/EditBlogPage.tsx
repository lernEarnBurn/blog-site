import { PageAnimation } from "./PageAnimation";
import { BtnBar } from './BackBar';

import { useEffect, useState } from "react";
import axios from "axios";

import { Blog } from "./MyBlogMenu";
import { useNavigate } from 'react-router-dom';

const useUpdateBlogOnDb = (blogData: Blog, titleValue: string, contentValue: string) => {
  const [loadingSave, setLoadingSave] = useState(false);

  const saveBlog = async () => {
    setLoadingSave(true);
    const token = localStorage.getItem('token');

    try {
      console.log('saving blog...');
      await axios.put(
        `http://localhost:3000/posts/${blogData._id}`,
        { newTitle: titleValue, newContent: contentValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingSave(false);
    } catch (err) {
      console.log(err);
    }
  };

  return { loadingSave, saveBlog };
};


const useUpdateBlogLocally = (titleValue: string, contentValue: string, blogData) => {
  useEffect(() => {
    return () => {
      const myBlogs = localStorage.getItem('myBlogs');
      const storedBlogs = JSON.parse(myBlogs) || [];

      const indexToUpdate = storedBlogs.findIndex((blog) => blog._id === blogData._id);

      storedBlogs[indexToUpdate].title = titleValue;
      storedBlogs[indexToUpdate].content = contentValue;

      localStorage.setItem('myBlogs', JSON.stringify(storedBlogs));
    };
  }, [titleValue, contentValue, blogData]);
};

export function EditBlogPage() {

  //this is done to ensure to ensure a clean aimation transition and avoid another query
  const storedBlogData = localStorage.getItem('selectedMyBlog');
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate = useNavigate()
  
  const handleGoBack = async() => {
    navigate(-1);
    await saveBlog()
  }

  const [titleValue, setTitleValue] = useState(blogData?.title)
  const [contentValue, setContentValue] = useState(blogData?.content)

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value)
  }

  
  useUpdateBlogLocally(titleValue, contentValue, blogData);

  //have a saved thing pop up (shadcn might have an easy out of the box solution)
  const { loadingSave, saveBlog } = useUpdateBlogOnDb(blogData, titleValue, contentValue);

  


  return (
    <div className="scroller h-[100.01vh]">
      <section className="h-[100vh] w-[100vw] grid place-items-center">
        <PageAnimation>
            <div className="flex flex-col z-10 rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">      
              <textarea rows={1} maxLength={25} spellCheck="false" onChange={handleTitleChange} value={titleValue} className="w-[25vw] blue mx-auto text-2xl font-bold text-center ghost-input"/>
              <h3 className="text-center text-sm">By Me</h3>
              <textarea spellCheck="false" onChange={handleContentChange} rows={21} maxLength={1000} value={contentValue} className="w-[30vw] mt-2 mx-auto ghost-input"/>
            </div>
           <BtnBar loadingSave={loadingSave} backFunc={handleGoBack} saveFunc={saveBlog}></BtnBar>
        </PageAnimation>
      </section>
    </div>
  ) 
}