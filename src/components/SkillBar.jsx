import ProgressBar from "./ProgressBar";

const SkillBar = ({ skill, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-yellow-400 font-bold">{skill}</span>
      <span className="text-gray-400">LVL {level}/100</span>
    </div>
    <ProgressBar value={level} />
  </div>
);

export default SkillBar;