import { PageAnimation } from "./PageAnimation";
import { BtnBar } from './BackBar';

import { useNavigate } from 'react-router-dom';

export function EditBlogPage() {
  //const postId: string = useParams().postId || ""

  //this is done to ensure to ensure a clean transition and avoid another query
  const storedBlogData = localStorage.getItem('selectedMyBlog');
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate  = useNavigate()
  
  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="scroller overflow-y-scroll h-[100.01vh] snap-y snap-mandatory">
      <section className="h-[100vh] w-[100vw] grid place-items-center snap-start">
        <PageAnimation>
            <div className="flex flex-col z-10 rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">
              <h2 className="text-center text-2xl">
                <strong>{blogData?.title || 'No Title'}</strong>
              </h2>
              <h3 className="text-center text-sm">By Me</h3>
              <p className="mt-2 text-md">{blogData?.content || 'No Content'}</p>
            </div>
           <BtnBar backFunc={handleGoBack}></BtnBar>
        </PageAnimation>
      </section>
      <section className="grid place-items-center h-[100vh] snap-start ">
      </section>
    </div>
  ) 
}