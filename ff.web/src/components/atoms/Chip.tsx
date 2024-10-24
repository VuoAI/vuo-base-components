import { ReactNode } from 'react';
// import Icon from './Icon'; // Adjust the import path according to your project structure

interface ChipProps {
  icon?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  children?: ReactNode;
}

function Chip(props: ChipProps) {
  const {
    // icon,
    color = '',
    backgroundColor = '',
    className = "",
    children,
  } = props

  const style = {
    backgroundColor: `var(--${backgroundColor})`,
    color: `var(--${color})`,
  };

  return (
    <div className={`chip ${className}`} style={style}>
      {/* {icon && <Icon name={icon} size={16} />} */}
      {/* {icon && "icon"} */}
      {children}
    </div>
  );
};

export default Chip;
