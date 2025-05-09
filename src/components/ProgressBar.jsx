// Create ProgressBar component for skills
import { motion, AnimatePresence } from 'framer-motion';

const ProgressBar = ({ value }) => {
  return (
    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-yellow-400"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;