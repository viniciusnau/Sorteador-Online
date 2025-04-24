import React from 'react';
import TextField from '@mui/material/TextField';
import Button from './Button';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import styles from '../Styles/CreateUser.module.css';
import Loading from './Loading'; 

interface CreateUserProps {
    email: string;
    loadingCreation: boolean; 
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({
    email,
    loadingCreation,
    handleEmailChange,
    handleInputKeyDown,
    onSubmit,
}) => {
    const isEmailValid = email.endsWith('@defensoria.sc.gov.br');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        handleInputKeyDown(event);
        if (event.key === 'Enter' && isEmailValid && !loadingCreation) {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <TextField
                    className={styles.inputText}
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Criar usuário"
                    InputProps={{
                        style: {
                            height: '2.25rem',
                            width: '17rem',
                        },
                        classes: {
                            input: styles.inputText,
                        },
                    }}
                    variant="outlined"
                />
                <Button
                    className={`${styles.button} ${!isEmailValid || loadingCreation ? styles.disabledButton : ''}`}
                    onClick={onSubmit}
                    disabled={!isEmailValid || loadingCreation}
                >
                    {loadingCreation ? (
                        <div className={styles.loadingContainer}>
                            <Loading size="1.5rem" type="spin" />
                        </div>
                    ) : (
                        <GroupAddOutlinedIcon />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CreateUser;
