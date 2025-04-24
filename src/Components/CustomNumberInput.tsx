import React from 'react';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import styles from '../Styles/CustomNumberInput.module.css';

interface CustomNumberInputProps {
  value: number;
  onChange: (event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent, value: number | null) => void;
  onBlur: () => void;
  autoFocus?: boolean;
  min?: number;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value,
  onChange,
  onBlur,
  autoFocus = false,
  min = 0,
}) => {
  return (
    <NumberInput
      value={value}
      onChange={(event, newValue) => onChange(event, newValue)}
      onBlur={onBlur}
      autoFocus={autoFocus}
      onClick={(e) => e.stopPropagation()}
      min={min}
      slotProps={{
        input: {
          className: styles.customInput,
          onInput: (e: React.FormEvent<HTMLInputElement>) => {
            const inputElement = e.currentTarget;
            if (inputElement.value.length > 15) {
              inputElement.value = inputElement.value.slice(0, 15);
            }
          },
        },
        incrementButton: {
          style: { display: 'none' },
        },
        decrementButton: {
          style: { display: 'none' },
        },
        
      }}
    />
  );
};


export default CustomNumberInput;
