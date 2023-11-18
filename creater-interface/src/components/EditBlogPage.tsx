import { PageAnimation } from "./PageAnimation";
import { BtnBar } from './BackBar';

import { useEffect, useRef, useState } from "react";
import { RefObject } from "react";
import { useNavigate } from 'react-router-dom';

export function EditBlogPage() {

  //this is done to ensure to ensure a clean aimation transition and avoid another query
  const storedBlogData = localStorage.getItem('selectedMyBlog');
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate  = useNavigate()
  
  const handleGoBack = () => {
    navigate(-1);
  }

  const [titleValue, setTitleValue] = useState(blogData?.title)
  const [contentValue, setContentValue] = useState(blogData?.content)

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value)
  }

  //const titleRef: RefObject<HTMLInputElement> = useRef(null);

  //when updating blog on backend need to change the objs in localStorage
  


  return (
    <div className="scroller h-[100.01vh]">
      <section className="h-[100vh] w-[100vw] grid place-items-center">
        <PageAnimation>
            <div className="flex flex-col z-10 rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">      
              <textarea rows={1} maxLength={25} spellCheck="false" onChange={handleTitleChange} value={titleValue} className="w-[25vw] blue mx-auto text-2xl font-bold text-center ghost-input"/>
              <h3 className="text-center text-sm">By Me</h3>
              <textarea spellCheck="false" onChange={handleContentChange} rows={21} maxLength={1000} value={contentValue} className="w-[30vw] mt-2 mx-auto ghost-input"/>
            </div>
           <BtnBar backFunc={handleGoBack}></BtnBar>
        </PageAnimation>
      </section>
    </div>
  ) 
}