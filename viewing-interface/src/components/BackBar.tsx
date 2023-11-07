import { motion } from 'framer-motion'
import { ArrowLeftFromLine } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Share } from 'lucide-react';

const animations = {
  initial: {opacity: 0, x: -120},
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0, x: -120},
}

interface BtnBarProps {
  backFunc: () => void; 
}

export const BtnBar = ({backFunc}: BtnBarProps) => {
  return (
    <motion.div
      className='absolute top-[5vh] left-[25.5vw] flex flex-col gap-1' 
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"

      >
      <button className='w-20 h-20 btn-bar hover:scale-[1.004] flex items-center justify-center' onClick={backFunc}><ArrowLeftFromLine className='icon w-20 h-16'/></button>
      <button className='w-20 h-20 btn-bar hover:scale-[1.004] flex items-center justify-center'><MessageCircle className='icon w-20 h-16'/></button>
      <button className='w-20 h-20 btn-bar hover:scale-[1.004] flex items-center justify-center'><Share className='icon w-20 h-16'/></button>
    </motion.div>
   
  )
}