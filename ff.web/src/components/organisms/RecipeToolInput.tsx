import React, { useState } from 'react';
import { RecipeTool } from '@vuo/models/Step';

interface RecipeToolInputProps {
  tools: RecipeTool[];
  setTools: React.Dispatch<React.SetStateAction<RecipeTool[]>>;
}

function RecipeToolInput(props: RecipeToolInputProps) {
  const { tools, setTools } = props;
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const addTool = () => {
    setTools([...tools, { name, icon }]);
    setName('');
    setIcon('');
  };

  const removeTool = (tool: RecipeTool) => {
    setTools(tools.filter(t => t.name !== tool.name))
  }

  return (
    <div>
      <div>Tools</div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={icon} onChange={e => setIcon(e.target.value)} placeholder="Icon URL" />
      <button type="button" onClick={addTool}>Add Tool</button>
      <ul>
        {tools.map((tool) => (
          <li key={tool.name}>
            {tool.name} - {tool.icon}
            <button style={{ maxWidth: '200px' }} type="button" onClick={() => removeTool(tool)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeToolInput;
