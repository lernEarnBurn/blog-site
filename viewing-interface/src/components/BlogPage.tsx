import { PageAnimation } from "./PageAnimation";
import { BtnBar } from './BackBar';


import { useNavigate } from 'react-router-dom';

export function BlogPage() {
  //this is done to ensure to ensure a clean transition and avoid another query
  const storedBlogData = localStorage.getItem('selectedBlog');
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate  = useNavigate()
  //needs some work
  const handleGoBack = () => {
    navigate(-1); 
  }


  return (
    <div className="overflow-hidden">
      <PageAnimation>
        
        <div className="flex flex-col gap-4 overflow-y-auto h-auto min-w-[99vw] items-center">
          
          <div className="mb-16 z-10 rounded-lg dark:bg-opacity-90 mt-[4.5vh] py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">
            <h2 className="text-center text-2xl">
              <strong>{blogData?.title || 'No Title'}</strong>
            </h2>
            <h3 className="text-center text-sm">
              By {blogData?.author?.username || 'changeWhenCanCreateBlogs'}
            </h3>
            <p className="mt-2 text-md">{blogData?.content || 'No Content'}</p>
          </div>
        </div>   
        <BtnBar backFunc={handleGoBack}></BtnBar>
      </PageAnimation>
      
    </div>
  ) 
}