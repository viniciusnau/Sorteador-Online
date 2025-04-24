import React from 'react';
import TextField from '@mui/material/TextField';
import styles from '../Styles/EditableTextField.module.css';

interface EditableNumberFieldProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    autoFocus: boolean;
    className?: string;
    property?: string;
}

const EditableNumberField: React.FC<EditableNumberFieldProps> = ({
    value,
    onChange,
    onBlur,
    autoFocus,
    property,
}) => {
    const getPropertyLength = (property: string | undefined): number => {
        switch (property) {
            case 'phone':
                return 15;
            default:
                return 96;
        }
    };

    const propertyLength = getPropertyLength(property);

    return (
        <TextField
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            autoFocus={autoFocus}
            onClick={(e) => e.stopPropagation()}
            variant="outlined"
            InputProps={{
                style: {
                    maxHeight: '2.5rem',
                    width: '90%',
                },
                classes: {
                    input: styles.inputText,
                },
            }}
            inputProps={{
                maxLength: propertyLength,
            }}
        />
    );
};

export default EditableNumberField;
