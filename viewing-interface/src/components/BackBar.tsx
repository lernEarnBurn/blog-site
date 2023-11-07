import { motion } from 'framer-motion'

const animations = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  exit: {opacity: 0}

}

interface BtnBarProps {
  backFunc: () => void; 
}

export const BtnBar = ({backFunc}: BtnBarProps) => {
  return (
    <motion.div
      className='absolute top-[5vh] left-[25vw] flex flex-col gap-1' 
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{duration: 5.15, type: "tween", ease: "easeInOut"}}
      >
      <button className='w-20 h-20 btn-bar hover:scale-[1.004]' onClick={backFunc}></button>
      <button className='w-20 h-20 btn-bar hover:scale-[1.004]'></button>
      <button className='w-20 h-20 btn-bar hover:scale-[1.004]'></button>
    </motion.div>
   
  )
}