import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type PageAnimationProps = {
  children: ReactNode; 
};

const animations = {
  initial: {scale: 1},
  animate: {scale: 1.02},
  exit: {scale: 1}
}

export const PageAnimation = ({children}: PageAnimationProps) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      >
      {children}
    </motion.div>
  )
}