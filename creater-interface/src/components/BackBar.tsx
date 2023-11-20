import { motion } from 'framer-motion'
import { ArrowLeftFromLine } from 'lucide-react';
import { Share } from 'lucide-react';
import { FileX } from 'lucide-react';
import { Save } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from './ui/button';


const animations = {
  initial: {opacity: 0, x: -120},
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0, x: -120},
}

interface BtnBarProps {
  backFunc: () => void; 
  saveFunc: () => void;
  deleteFunc: () => void;
  loadingSave: boolean;
}

export const BtnBar = ({backFunc, deleteFunc, saveFunc, loadingSave}: BtnBarProps) => {
  return (
    <motion.div
      className='absolute top-0 left-[-5.3vw] flex flex-col gap-1 whitespace-nowrap w-fit' 
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      >
      <button className='w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center' onClick={backFunc}>
        <ArrowLeftFromLine className='icon'/>
      </button>
      
      {loadingSave ? (
        <button disabled className='w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center' onClick={saveFunc}>
          <Save className='icon'/>
        </button>
      ): (
        <button className='w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center' onClick={saveFunc}>
          <Save className='icon'/>
        </button>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <button className='w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center'>
            <FileX className='icon'/>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? Once deleted, your precious work will be gone forever.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button className='btn-bar hover:bg-indigo-600 hover:bg-opacity-80'>Cancel</Button>
            </DialogClose>
            <Button onClick={deleteFunc} variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <button className='w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center'>
        <Share className='icon'/>
      </button>
    </motion.div>
   
  )
}