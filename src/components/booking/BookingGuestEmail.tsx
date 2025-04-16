import { useState, FormEvent } from 'react';

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
    if (!value) return 'Please confirm your email';
    if (value !== email) return 'Emails do not match';
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
      // Handle form submission
      onEmailSubmit(email);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    maxWidth: '400px'
  };

  const inputStyle = {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  };

  if (editMode) {
    return (
      <div style={formStyle}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="confirmEmail">Confirm Email</label>
          <input
            id="confirmEmail"
            type="email"
            style={inputStyle}
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm your email"
          />
          {errors.confirmEmail && <div style={errorStyle}>{errors.confirmEmail}</div>}
        </div>
        <div>
          <button onClick={handleSubmit} style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #007BFF', backgroundColor: '#007BFF', color: '#fff' }}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span
      > {submittedEmail}</span>
      <button onClick={() => onEmailSubmit('')}>
        Edit</button></div>
  );


};

export default BookingGuestEmail;
