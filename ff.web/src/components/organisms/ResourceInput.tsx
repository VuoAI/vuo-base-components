import React, { useState } from 'react';
import { Resource } from '@vuo/models/Resource';

interface ResourceInputProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

function ResourceForm({ resource, onUpdate, onRemove }: { resource: Resource; onUpdate: (resource: Resource) => void; onRemove: () => void }) {
  const [name, setName] = useState(resource.name);
  const [quantity, setQuantity] = useState(resource.quantity);
  const [unit, setUnit] = useState(resource.unit);

  const handleUpdate = () => {
    onUpdate({ name, quantity, unit });
  };

  return (
    <div className='flex flex-row gap-small'>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" onBlur={handleUpdate} />
      <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" onBlur={handleUpdate} />
      <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="Unit" onBlur={handleUpdate} />
      <button type="button" onClick={onRemove}>Remove</button>
    </div>
  );
}

function ResourceInput(props: ResourceInputProps) {
  const { resources, setResources } = props;
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const addResource = () => {
    setResources([...resources, { name: newName, quantity: newQuantity, unit: newUnit }]);
    setNewName('');
    setNewQuantity('');
    setNewUnit('');
  };

  const updateResource = (index: number, updatedResource: Resource) => {
    const updatedResources = resources.map((resource, i) => (i === index ? updatedResource : resource));
    setResources(updatedResources);
  };

  const removeResource = (index: number) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  };

  return (
    <div className='flex flex-col'>
      <div>Resources</div>
      <div className='flex flex-row gap-small'>
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name" />
        <input value={newQuantity} onChange={e => setNewQuantity(e.target.value)} placeholder="Quantity" />
        <input value={newUnit} onChange={e => setNewUnit(e.target.value)} placeholder="Unit" />
      </div>
      <button className='mt16' style={{ maxWidth: '200px' }} type="button" onClick={addResource}>Add Resource</button>
      <div>Current resources:</div>
      <ul>
        {resources.map((resource, index) => (
          <li style={{ color: 'black' }} key={`${resource.name}-${resource.quantity}`}>
            <ResourceForm
              resource={resource}
              onUpdate={(updatedResource) => updateResource(index, updatedResource)}
              onRemove={() => removeResource(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceInput;
