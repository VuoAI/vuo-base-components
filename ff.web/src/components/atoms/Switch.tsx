import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

function Switch({ checked, onChange, disabled = false, size = 'medium' }: SwitchProps) {
  const rootStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    width: size === 'small' ? 'var(--space-32)' : 'var(--space-48)',
    height: size === 'small' ? 'var(--space-16)' : 'var(--space-32)',
    padding: 0,
    cursor: disabled ? 'default' : 'pointer',
  };

  const inputStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1,
    margin: 0,
    cursor: 'inherit',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'block',
    backgroundColor: '#fff',
    width: size === 'small' ? 'var(--space-16)' : 'var(--space-24)',
    height: size === 'small' ? 'var(--space-16)' : 'var(--space-24)',
    borderRadius: 'var(--radius-32)',
    top: '50%',
    transform: checked 
      ? `translateX(${size === 'small' ? 'var(--space-16)' : 'var(--space-24)'}) translateY(-50%)`
      : 'translateY(-50%)',
    left: checked 
    ? `${size === 'small' ? '0' : '-2px'}`
    : `${size === 'small' ? '0' : '2px'}`,
    
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  };

  const trackStyle: React.CSSProperties = {
    backgroundColor: checked ? 'var(--surface-brand-blue)' : 'var(--surface-secondary)',
    opacity: 1,
    borderRadius: size === 'small' ? '7px' : '11px',
    width: '100%',
    height: '100%',
    display: 'block',
  };

  return (
    <span style={rootStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={inputStyle}
      />
      <span style={trackStyle} />
      <span style={thumbStyle} />
    </span>
  );
}

export default Switch;



