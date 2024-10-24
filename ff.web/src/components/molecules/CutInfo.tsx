import React from 'react';
import { observer } from 'mobx-react-lite';
import { Cut } from '@vuo/components/organisms/CutGuessr';

interface CutInfoProps {
    cut: Cut;
}

const CutInfo: React.FC<CutInfoProps> = observer(({ cut }) => (
    <div>
      <h3>{cut.name}</h3>
      <div style={{ width: '100%', height: '20vh', overflow: 'hidden', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src={cut.image} 
          alt={cut.name} 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>
      <p>{cut.description}</p>
      <p><strong>Cooking Tip:</strong> {cut.cookingTip}</p>
      <p><strong>Cost:</strong> {cut.cost}</p>
    </div>
  ));

export default CutInfo;