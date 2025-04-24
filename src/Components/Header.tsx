import React, { useState, useEffect } from 'react';
import styles from '../Styles/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../Auth/Auth';
import image from '../Assets/rect6.png';

const Header = () => {
    const navigate = useNavigate();
    const [isResponsive, setIsResponsive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 940);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.greenContainer} />
            <div className={styles.container}>
                <img
                    src={image}
                    className={styles.logo}
                    alt="Logo"
                    onClick={() => navigate('/sorteio/')}
                />
                <div
                    className={
                        isResponsive
                            ? styles.buttonContainer
                            : styles.navigation
                    }
                >
                    {isResponsive ? (
                        <div>
                            <button
                                className={styles.responsiveButton}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                            </button>
                            {isDropdownOpen && (
                                <div className={styles.modal}>
                                    <ul>
                                        {isLoggedIn() && (
                                            <>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        logout(navigate);
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem} logout`}
                                                        id="logout"
                                                    >
                                                        Sair
                                                    </span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        navigate(
                                                            '/siclop/password-reset/'
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem}`}
                                                    >
                                                        Redefinir Senha
                                                    </span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        navigate('/siclop/');
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem}`}
                                                    >
                                                        Pesquisar Funcionários
                                                    </span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        navigate(
                                                            '/outsourced/'
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem}`}
                                                    >
                                                        Terceirizados
                                                    </span>
                                                </li>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        navigate('/history/');
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem}`}
                                                    >
                                                        Histórico
                                                    </span>
                                                </li>
                                                {isAdmin && (
                                                    <li
                                                        onClick={() => {
                                                            setIsDropdownOpen(
                                                                false
                                                            );
                                                            navigate('/admin/');
                                                        }}
                                                    >
                                                        <span
                                                            className={`${styles.route} ${styles.modalItem}`}
                                                        >
                                                            Usuários
                                                        </span>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.navigation}>
                            {isLoggedIn() && (
                                <>
                                    <span
                                        className={`${styles.route} ${styles.logout}`}
                                        id="logout"
                                        onClick={() => logout(navigate)}
                                    >
                                        Sair
                                    </span>
                                    <span
                                        className={`${styles.route}`}
                                        onClick={() =>
                                            navigate('/siclop/password-reset/')
                                        }
                                    >
                                        Redefinir Senha
                                    </span>
                                    <span
                                        className={`${styles.route}`}
                                        onClick={() => navigate('/siclop/')}
                                    >
                                        Pesquisar Funcionários
                                    </span>
                                    <span
                                        className={`${styles.route}`}
                                        onClick={() =>
                                            navigate('/siclop/outsourced/')
                                        }
                                    >
                                        Terceirizados
                                    </span>
                                    <span
                                        className={`${styles.route}`}
                                        onClick={() =>
                                            navigate('/siclop/history/')
                                        }
                                    >
                                        Histórico
                                    </span>
                                    {isAdmin && (
                                        <span
                                            className={`${styles.route}`}
                                            onClick={() =>
                                                navigate('/siclop/admin/')
                                            }
                                        >
                                            Usuários
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
