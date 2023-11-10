import axios from "axios"

import { Comment } from "./ui/comment"
import { Card, CardContent, CardTitle, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send } from "lucide-react"


export function CommentSection(){
  

  return (
    <>
      <Card className="w-[30vw] h-[75vh] py-2 flex flex-col">
        <CardTitle className="comment-title text-center mt-3 mb-2">Comments</CardTitle>
        <CardContent className="w-full h-[55vh]">
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