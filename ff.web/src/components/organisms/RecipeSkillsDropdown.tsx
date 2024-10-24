import React, { useEffect, useState } from 'react';

export interface SkillDropdownItem {
  id: string;
  name: string;
}

interface SkillsDropdownProps {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

function SkillsDropdown(props: SkillsDropdownProps) {
  const { selectedSkills, setSelectedSkills } = props;
  const [skillsList, setSkillsList] = useState<SkillDropdownItem[]>([]);

  useEffect(() => {
    setSkillsList([
      { id: '1', name: 'Skill 1' },
      { id: '2', name: 'Skill 2' },
    ])
  }, [])

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedSkills(selectedOptions);
  };

  return (
    <div>
      <div>Skills</div>
      <select multiple value={selectedSkills} onChange={handleSkillChange}>
        {skillsList.map((skill: SkillDropdownItem) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkillsDropdown;
