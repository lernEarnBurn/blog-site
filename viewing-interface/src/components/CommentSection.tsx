import axios from "axios"
import { useState, useEffect } from "react"

import { Comment } from "./ui/comment"
import { Card, CardContent, CardTitle, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

interface CommentSectionProps {
  postId: string
}

type Comment = {
  id: string;
  author: string;
  post: string;
  content: string;
};

export function CommentSection(props: CommentSectionProps){
  const [loading, setLoading] = useState(false)
  //make a type called comments and then quary
  const [comments, setComments] = useState<Comment[]>([])

  
  useEffect(() => {
    const getAllComments = async () => { 
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/posts/${props.postId}/comments`)
        setComments(response.data);
        setLoading(false);
        console.log(comments)
      } catch (err) {
       console.log(err);
     }
  }

    getAllComments();
  }, [props.postId, comments]);  
  
  return (
    <>
      <Card className="w-[30vw] h-[75vh] py-2 flex flex-col">
        <CardTitle className="comment-title text-center mt-3 mb-2">Comments</CardTitle>
        <CardContent className="w-full h-[55vh] flex flex-col items-center overflow-y-scroll overflow-x-hidden">
          <Comment author="moshe" content="aodnfainfios" />
          <Comment author="moshe" content="aodnfainfios" />
          <Comment author="moshe" content="aodnfainfios" />
          <Comment author="moshe" content="aodnfainfios" />
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-center border-t">
          <Input className="mt-8"  type="text" placeholder="Add a comment..."/>
          <Button size="icon" className=" mt-8 rounded-full h-9 w-9 comment-button hover:scale-[1.03]">
            <Send className="icon"/>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}