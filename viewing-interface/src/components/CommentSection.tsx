import axios from "axios"

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import type { RefObject } from 'react';

import { Comment } from "./ui/comment"
import { Card, CardContent, CardTitle, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

interface CommentSectionProps {
  postId: string
}

interface User {
  _id: string;
  username: string;
  password: string;
}

type Comment = {
  id: string;
  author: User;
  post: string;
  content: string;
};

export function CommentSection(props: CommentSectionProps){
  const [loading, setLoading] = useState(false)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.postId]);  


  const contentRef: RefObject<HTMLInputElement> = useRef(null);
  const navigate = useNavigate()

  async function createComment(){
    if(localStorage.getItem('token') && contentRef.current?.value.trim() !== "" && contentRef.current?.value){
      try {
        setLoading(true)
        const config =  { headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        } }

        const data = {
          author: localStorage.getItem('username'),
          post: props.postId,
          content: contentRef.current?.value.trim() || "",
        };

        const response = await axios.post(`http://localhost:3000/posts/${props.postId}/comments`, data, config)
        setLoading(false)

        const newComment: Comment = {
          id: 'sdabidusbadiubsudadbisdbusa',
          author: {_id: '', username: localStorage.getItem('username'), password: ''},
          post: props.postId,
          content: contentRef.current?.value.trim() || "",
        }
        setComments((prevComments: Comment[]) => [...prevComments, newComment])
        contentRef.current.value = ""


      } catch (err){
        console.log(err)
      }
    }else{
      navigate('/')
    }
  }
  
  return (
    <>
      <Card className="w-[30vw] h-[75vh] py-2 flex flex-col">
        <CardTitle className="comment-title text-center mt-3 mb-2">Comments</CardTitle>
        <CardContent className="w-full h-[55vh] flex flex-col items-center overflow-y-scroll overflow-x-hidden">
          {comments.map((comment, index) => (
            <Comment key={index} author={comment.author.username} content={comment.content}/>
          ))}
        </CardContent>
        <CardFooter className="flex gap-3 items-center justify-center border-t">
          <Input ref={contentRef} className="mt-8"  type="text" placeholder="Add a comment..."/>
          {!loading ? ( <Button onClick={createComment} size="icon" className=" mt-8 rounded-full h-9 w-9 comment-button hover:scale-[1.03]">
                          <Send className="icon"/>
                        </Button>) 
                        : 
                      ( <Button disabled onClick={createComment} size="icon" className=" mt-8 rounded-full h-9 w-9 comment-button hover:scale-[1.03]">
                    
                          <Send className="icon"/>
                        </Button>
                        //fix icon 
          )}
        </CardFooter>
      </Card>
    </>
  )
}