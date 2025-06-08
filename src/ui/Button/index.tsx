import { FormEvent } from 'react';
import { SizeType, StyleType } from '../types';
import { getStyleClass } from '../utils';
import './index.css';

const Button = ({
  children,
  onClick,
  text,
  style = StyleType.Primary,
  size = SizeType.Medium,
  type = undefined,
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: (e: FormEvent) => void;
  text?: string;
  style?: StyleType,
  size?: SizeType;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={getStyleClass('kd-button', style, size, disabled)} >
      {text ? text : children}
    </button>
  );
}

export default Button;