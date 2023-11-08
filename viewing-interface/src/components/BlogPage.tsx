import { PageAnimation } from "./PageAnimation";
import { BtnBar } from './BackBar';

import { useEffect } from "react";

import { useNavigate } from 'react-router-dom';

export function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //this is done to ensure to ensure a clean transition and avoid another query
  const storedBlogData = localStorage.getItem('selectedBlog');
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate  = useNavigate()
  //needs some work
  const handleGoBack = () => {
    navigate(-1); 
  }

  return (
    <div className="overflow-y-scroll h-[101vh] snap-y snap-mandatory">
      <section className="h-[100vh] w-[100vw] grid place-items-center snap-start">
        <PageAnimation>
            <div className="flex flex-col gap-4 z-10 rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">
              <h2 className="text-center text-2xl">
                <strong>{blogData?.title || 'No Title'}</strong>
              </h2>
              <h3 className="text-center text-sm">
                By {blogData?.author?.username || 'changeWhenCanCreateBlogs'}
              </h3>
              <p className="mt-2 text-md">{blogData?.content || 'No Content'}</p>
            </div>
           <BtnBar backFunc={handleGoBack}></BtnBar>
        </PageAnimation>
      </section>
      <section className="grid place-items-center h-[100vh] snap-start ">
        <p>Comment Section</p>
      </section>
    </div>
  ) 
}