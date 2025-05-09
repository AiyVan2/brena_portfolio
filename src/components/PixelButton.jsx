import { motion, AnimatePresence } from 'framer-motion';

const PixelButton = ({ href, children, onClick, className = "" }) => {
  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Component
        href={href}
        onClick={onClick}
        className={`border-2 border-yellow-400 px-6 py-3 text-yellow-400 font-bold tracking-wider 
        hover:bg-yellow-400 hover:text-black transition-colors ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}

export default PixelButton;