import React, { useState, useEffect } from 'react';
import Button from './Button';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Loading from './Loading';
import styles from '../Styles/ModalDocs.module.css';
import { isLoggedIn } from '../Auth/Auth';

interface ModalDocsProps {
    onGenerateXlsx?: () => void;
    onGeneratePDF?: () => Promise<void>;
    onGenerateBirthday?: () => void;
    isVisibleGenerateBirthday?: boolean;
}

const ModalDocs: React.FC<ModalDocsProps> = ({
    onGenerateXlsx,
    onGeneratePDF,
    onGenerateBirthday,
    isVisibleGenerateBirthday,
}) => {
    const [open, setOpen] = useState(false);
    const [loadingPDF, setLoadingPDF] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleGeneratePDF = async () => {
        if (onGeneratePDF) {
            setLoadingPDF(true);
            try {
                await onGeneratePDF();
            } catch (error) {
                console.error('Erro ao gerar PDF:', error);
            } finally {
                handleCloseModal();
                setLoadingPDF(false);
            }
        }
    };

    const options = [];
    if (onGenerateXlsx) options.push('XLSX');
    if (onGeneratePDF) options.push('PDF');
    if (isVisibleGenerateBirthday === true && isLoggedIn()) {
        options.push('Aniversários');
    }

    return (
        <>
            <div className={styles.containerDownload}>
                <div className={styles.divButton}>
                    <Button
                        className={`${styles.buttonAdmin} ${
                            loadingPDF ? styles.disabledButton : ''
                        }`}
                        onClick={handleOpenModal}
                        disabled={loadingPDF}
                    >
                        {loadingPDF ? (
                            <div className={styles.loadingContainer}>
                                <Loading size="1.5rem" type="spin" />
                            </div>
                    ) : (
                        <GetAppRoundedIcon />
                    )}
                    </Button>
                </div>
            </div>
            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Como deseja exportar?</DialogTitle>
                <List>
                    {options.map((option) => (
                        <ListItem key={option} disableGutters>
                            <ListItemButton
                                onClick={() => {
                                    if (option === 'XLSX' && onGenerateXlsx) {
                                        onGenerateXlsx();
                                        handleCloseModal();
                                    } else if (option === 'PDF') {
                                        handleGeneratePDF();
                                        handleCloseModal()

                                    } else if (
                                        option === 'Aniversários' &&
                                        onGenerateBirthday
                                    ) {
                                        onGenerateBirthday();
                                        handleCloseModal();
                                    }
                                }}
                            >
                                <ListItemText primary={option} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </>
    );
};

export default ModalDocs;
