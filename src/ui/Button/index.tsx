import { FormEvent } from 'react';
import { SizeType, StyleType } from '../types';
import { getStyleClass } from '../utils';
import './index.css';

const Button = ({
  children,
  onClick,
  text,
  style = StyleType.Primary,
  size = SizeType.Medium
}: {
  children?: React.ReactNode;
  onClick?: (e: FormEvent) => void;
  text?: string;
  style?: StyleType,
  size?: SizeType;
}) => {
  return (
    <button onClick={onClick} className={getStyleClass('kd-button', style, size)}>
      {text ? text : children}
    </button>
  );
}

export default Button;