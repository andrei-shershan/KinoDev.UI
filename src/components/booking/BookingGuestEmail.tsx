import { useState, FormEvent } from 'react';
import Button from '../../ui/Button';
import { Input } from '../../ui/Input';
import { InputType, StyleType } from '../../ui/types';
import { EditOutlined } from '@ant-design/icons';
import { CancelBooking } from './CancelBooking';

const BookingGuestEmail = ({
  editMode = false,
  submittedEmail,
  onEmailSubmit
}: {
  editMode: boolean;
  submittedEmail?: string;
  onEmailSubmit: (email: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [errors, setErrors] = useState({ email: '', confirmEmail: '' });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateEmail = (value: string): string => {
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validateConfirmEmail = (value: string): string => {
    if (!value) {
      return 'Please confirm your email';
    }
    if (value !== email) {
      return 'Emails do not match';
    }
    return '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const confirmError = validateConfirmEmail(confirmEmail);

    setErrors({
      email: emailError,
      confirmEmail: confirmError
    });

    if (!emailError && !confirmError) {
      onEmailSubmit(email);
    }
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  };

  if (editMode) {
    return (
      <>
        <div>
          <Input
            id="email"
            type={InputType.Email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            labelText='Email*'
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
          <Input
            id="confirmEmail"
            type={InputType.Email}
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm your email"
            labelText='Confirm Email*'
          />
          {errors.confirmEmail && <div style={errorStyle}>{errors.confirmEmail}</div>}
          <div>
            <Button
              onClick={handleSubmit}
              text='Continiue'
              disabled={!email || !confirmEmail}
            />
            <CancelBooking />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <span> {submittedEmail}</span>
      <Button
        style={StyleType.Icon}
        onClick={() => onEmailSubmit('')}
      >
        <EditOutlined style={{ fontSize: '20px' }} />
        Edit
      </Button>
    </div >
  );
};

export default BookingGuestEmail;
