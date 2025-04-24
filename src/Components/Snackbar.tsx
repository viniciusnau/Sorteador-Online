import React, { useState, useEffect } from 'react';
import styles from '../Styles/Snackbar.module.css';
import { MdErrorOutline } from 'react-icons/md';
import { snackbarConsts } from '../Components/Consts';

interface iSnackbar {
    type?: keyof typeof snackbarConsts;
    title?: string;
    description?: string;
    setShowSnackbar?: (value: any) => void;
    onClose?: () => void;
}

const Snackbar: React.FC<iSnackbar> = ({
    type,
    title,
    description,
    setShowSnackbar,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isVisible) {
            const timeoutId = setTimeout(() => {
                setIsVisible(false);
                if (setShowSnackbar) setShowSnackbar(null);
                onClose && onClose();
            }, 1000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isVisible, setShowSnackbar, onClose]);

    const snackbarTitle = title || (type ? snackbarConsts[type].title : '');
    const snackbarDescription =
        description || (type ? snackbarConsts[type].description : '');

    return (
        <div className={styles.snackbarContainer}>
            <div
                className={`${styles.snackbar} ${
                    isVisible ? styles.visible : ''
                }`}
            >
                <div className={styles.title}>
                    <h3 className={styles.text}>{snackbarTitle}</h3>
                </div>

                {snackbarDescription && (
                    <p className={styles.description}>{snackbarDescription}</p>
                )}
            </div>
        </div>
    );
};

export default Snackbar;
