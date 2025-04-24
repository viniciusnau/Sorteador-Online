import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import Pagination from 'rc-pagination';
import styles from '../Styles/Table.module.css';
import { RootState, AppDispatch } from '../Services/StoreConfig';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    fetchEmployee,
    setCurrentPage,
} from '../Services/Slices/getEmployeeSlice';
import { uploadImage } from '../Services/Slices/supervisorSlice';
import Button from '../Components/Button';
import Loading from './Loading';
import EditableTextField from '../Components/EditableTextField';
import {
    updateEmployee,
    setTotalUpdates,
    resetCounters,
    markUpdatesEnd,
} from '../Services/Slices/updateEmployeeSlice';
import {
    capitalizeWords,
    formatBoolean,
    formatDate,
} from '../Components/Helper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import ModalDocs from './ModalDocs';
import Snackbar from './Snackbar';
import { Change } from '../Types/Types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import {
    createEmployee,
    deleteEmployee,
} from '../Services/Slices/createEmployeeSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchDeleteUser } from '../Services/Slices/deleteUserSlice';
import { uploadUserImage, resetUploadState } from '../Services/Slices/updateUserSlice';

interface FormValues {
    name: string;
    team: string;
    role: string;
    city: string;
    description: string;
    phone: string;
    email: string;
    start_date: string;
    gender: string;
}

interface CreateDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateDialog: React.FC<CreateDialogProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        team: '',
        role: '',
        city: '',
        description: '',
        phone: '',
        email: '',
        start_date: '',
        gender: '',
    });

    const defaultCity = ['FLORIANÓPOLIS'];
    const defaultRole = [
        'PROGRAMADOR',
        'SERVENTE',
        'MOTORISTA',
        'RECEPCIONISTA',
        'TÉCNICO DE INFORMÁTICA',
        'TELEFONISTA',
        'ZELADOR',
        'SUPERVISOR TERCEIRIZADO',
    ];
    const defaultTeam = [
        'GERÊNCIA DE TECNOLOGIA DA INFORMAÇÃO',
        'NÚCLEO DA CAPITAL',
    ];

    const sortedCities = defaultCity;
    const sortedRoles = defaultRole;
    const sortedTeams = defaultTeam;

    const handleTextFieldChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const shouldUppercase = ['name', 'role', 'team', 'city'].includes(name);
        const newValue = shouldUppercase ? value.toUpperCase() : value;
        const numericValue = value.replace(/[^0-9]/g, '');
        if (name === 'phone') {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: numericValue,
            }));
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: newValue,
            }));
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateChange = (newValue: any) => {
        setSelectedDate(newValue);
        setFormValues((prevValues) => ({
            ...prevValues,
            start_date: newValue.format('YYYY-MM-DD'),
        }));
    };

    const isEmailValid = (email: any) => {
        if (email) {
            return email.endsWith('@defensoria.sc.gov.br');
        } else {
            return true;
        }
    };

    const handleSubmit = async () => {
        if (formValues) {
            try {
                await dispatch(createEmployee(formValues));
            } catch (error) {
                console.error('Failed to create employee:', error);
            } finally {
                window.location.reload();
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Criar Funcionário</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome"
                    name="name"
                    value={formValues.name}
                    onChange={handleTextFieldChange}
                    fullWidth
                    margin="normal"
                />
                <Select
                    className={styles.roleInput}
                    name="role"
                    value={formValues.role}
                    onChange={handleSelectChange}
                    displayEmpty
                    aria-label="Selecionar cargo"
                >
                    <MenuItem value="" disabled>
                        <em className={styles.menuItemPlaceholder}> Cargo </em>
                    </MenuItem>
                    {sortedRoles.map((role: any) => (
                        <MenuItem
                            sx={{ whiteSpace: 'normal' }}
                            className={styles.menuItem}
                            key={role}
                            value={role}
                        >
                            {role}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    className={styles.selectInput}
                    name="team"
                    value={formValues.team}
                    onChange={handleSelectChange}
                    displayEmpty
                    aria-label="Selecionar unidade organizacional"
                >
                    <MenuItem value="" disabled>
                        <em className={styles.menuItemPlaceholder}>
                            {' '}
                            Unidade Organizacional{' '}
                        </em>
                    </MenuItem>
                    {sortedTeams.map((team: any) => (
                        <MenuItem
                            sx={{ whiteSpace: 'normal' }}
                            className={styles.menuItem}
                            key={team}
                            value={team}
                        >
                            {team}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    className={styles.selectInput}
                    name="city"
                    value={formValues.city}
                    onChange={handleSelectChange}
                    displayEmpty
                    aria-label="Selecionar município"
                >
                    <MenuItem value="" disabled>
                        <em className={styles.menuItemPlaceholder}>
                            {' '}
                            Município{' '}
                        </em>
                    </MenuItem>
                    {sortedCities.map((city: any) => (
                        <MenuItem
                            sx={{ whiteSpace: 'normal' }}
                            className={styles.menuItem}
                            key={city}
                            value={city}
                        >
                            {city}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Telefone"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleTextFieldChange}
                    fullWidth
                    margin="normal"
                    inputProps={{
                        maxLength: 15,
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleTextFieldChange}
                    fullWidth
                    margin="normal"
                    type="email"
                />
                <TextField
                    label="Info"
                    name="description"
                    value={formValues.description}
                    onChange={handleTextFieldChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    inputProps={{
                        maxLength: 96,
                    }}
                />
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Sexo</FormLabel>
                    <RadioGroup
                        name="gender"
                        value={formValues.gender}
                        onChange={handleTextFieldChange}
                    >
                        <FormControlLabel
                            value="masculino"
                            control={<Radio />}
                            label="Masculino"
                        />
                        <FormControlLabel
                            value="feminino"
                            control={<Radio />}
                            label="Feminino"
                        />
                    </RadioGroup>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data de Início"
                        slotProps={{
                            textField: {
                                style: {
                                    marginTop: '3.3rem',
                                    marginLeft: '1.5rem',
                                },
                                sx: { backgroundColor: 'white' },
                            },
                        }}
                        format="DD/MM/YYYY"
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <DialogActions>
                    <Button
                        disabled={!isEmailValid(formValues.email)}
                        onClick={handleSubmit}
                    >
                        Salvar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

interface Column {
    title: string;
    property: string;
}

interface TableProps {
    title?: string;
    columns: Column[];
    data: any[];
    total?: number;
    isEmpty?: boolean;
    loading?: boolean;
    error?: boolean;
    className?: string;
    filter?: any;
    isRowClickable?: boolean;
    isEditable?: boolean;
    SizePagination?: boolean;
    generateDocs?: boolean;
    onGenerateXlsx?: () => void;
    onGeneratePDF?: () => Promise<void>;
    onGenerateBirthday?: (employees: any[]) => void;
    isVisibleGenerateBirthday?: boolean;
}

const Table: React.FC<TableProps> = ({
    title,
    columns,
    data,
    total,
    isEmpty,
    loading,
    error,
    className,
    filter,
    isRowClickable,
    isEditable,
    SizePagination,
    generateDocs,
    onGenerateXlsx,
    onGeneratePDF,
    onGenerateBirthday,
    isVisibleGenerateBirthday,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isResponsive, setIsResponsive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isColorInverted, setIsColorInverted] = useState<boolean>(false);
    const [editableFields, setEditableFields] = useState<
        Map<string, { [key: string]: string }>
    >(new Map());
    const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);
    const [displayedColumns, setDisplayedColumns] = useState<Column[]>(columns);
    const [showEditButton, setShowEditButton] = useState<boolean>(false);

    const [uploadingEmployeeId, setUploadingEmployeeId] = useState<
        number | null
    >(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [pageSize, setPageSize] = useState(5);
    const currentPage = useSelector(
        (state: RootState) => state.employee.currentPage
    );

    const originalFields = useSelector(
        (state: RootState) => state.updateEmployee.initialData
    );
    const [changes, setChanges] = useState<Change[]>([]);
    const {
        snackbarMessages,
        errorDetails,
        showErrorSnackbar,
        showSuccessSnackbar,
    } = useSelector((state: RootState) => state.updateEmployee);

    const [showErrorDialog, setShowErrorDialog] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/siclop/admin/');
    const [spinningRowId, setSpinningRowId] = useState(null);
    const [uploadingUserId, setUploadingUserId] = useState<number | null>(null);
    const {errorUploadImageUser} = useSelector((state: RootState) => state.updateUser )

    const formatCellValue = (row: any, column: any) => {
        const cellValue = row[column.property] || '-';

        if (column.property === 'is_active') {
            return formatBoolean(cellValue);
        }

        if (
            column.property === 'return_date' ||
            column.property === 'start_date'
        ) {
            return cellValue !== '-' ? formatDate(cellValue) : '-';
        }

        return isAdminPage ? cellValue : capitalizeWords(cellValue);
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleDeleteEmployeeClick = (id: any) => {
        setSpinningRowId(id);
        dispatch(deleteEmployee({ id }))
            .unwrap()
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error('Failed to delete employee:', error);
            });
    };

    const handleDeleteUserClick = (id: any) => {
        setSpinningRowId(id);
        dispatch(fetchDeleteUser(id))
            .unwrap()
            .then(() => {
                window.location.reload();
            })
            .catch((error: any) => {
                console.error('Failed to delete user:', error);
            });
    };

    const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSize(newSize);
        dispatch(setCurrentPage(1));
    };

    const handleDetailsClick = (team: string) => {
        navigate(`/siclop/team/${team}`);
    };

    const paginatedData = Array.isArray(data)
        ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : [];

    const handleCreateClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const booleanToString = (value: any) => (value ? 'Normal' : 'Afastado');
    const stringToBoolean = (value: any) => value === 'Normal';

    const customItemRender = (current: number, type: string) => {
        if (type === 'page') {
            return (
                current === currentPage && (
                    <span
                        className={styles.currentPage}
                        style={{ color: isColorInverted ? 'white' : 'initial' }}
                    >
                        {data?.length > 0 ? currentPage : '0'}
                    </span>
                )
            );
        }

        if (type === 'prev') {
            return (
                <Button className={styles.backButton} title="Voltar">
                    Voltar
                </Button>
            );
        }

        if (type === 'next') {
            return (
                <Button className={styles.backButton} title="Avançar">
                    Avançar
                </Button>
            );
        }

        return null;
    };

    const handleInputChange = (
        rowId: any,
        name: string,
        property: string,
        value: any
    ) => {
        setEditableFields((prev) => {
            const updatedFields = new Map(prev);

            if (!updatedFields.has(rowId)) {
                updatedFields.set(rowId, {});
            }

            const rowFields = updatedFields.get(rowId)!;
            const originalRowFields = originalFields.get(rowId) || {};

            if (property === 'return_date' && value === 'Invalid Date') {
                value = null;
            }

            if (originalRowFields[property] !== value) {
                rowFields[property] = value;

                setChanges((prevChanges) => {
                    const existingChangeIndex = prevChanges.findIndex(
                        (change) =>
                            change.id === rowId && change.property === property
                    );

                    if (existingChangeIndex !== -1) {
                        const updatedChanges = [...prevChanges] as Change[];
                        updatedChanges[existingChangeIndex] = {
                            id: rowId,
                            name,
                            property,
                            value,
                        };
                        return updatedChanges;
                    } else {
                        return [
                            ...prevChanges,
                            { id: rowId, name, property, value } as Change,
                        ];
                    }
                });
            } else {
                setChanges((prevChanges) =>
                    prevChanges.filter(
                        (change) =>
                            !(
                                change.id === rowId &&
                                change.property === property
                            )
                    )
                );
                delete rowFields[property];

                if (Object.keys(rowFields).length === 0) {
                    updatedFields.delete(rowId);
                }
            }

            return updatedFields;
        });
    };

    const handleBlur = (rowId: any, property: string) => {
        setEditableFields((prev) => {
            const updatedFields = new Map(prev);

            if (!updatedFields.has(rowId)) {
                return prev;
            }

            const rowFields = updatedFields.get(rowId)!;

            if (
                rowFields[property] === undefined ||
                rowFields[property] === null
            ) {
                rowFields[property] = '';
            }

            return updatedFields;
        });
    };

    const handleSaveClick = async () => {
        if (isEditingEnabled) {
            if (Array.isArray(changes) && changes.length > 0) {
                setIsLoading(true);
                dispatch(setTotalUpdates(changes.length));

                const updatePromises = changes.map((change) =>
                    dispatch(
                        updateEmployee({
                            id: change.id,
                            name: change.name,
                            property: change.property,
                            [change.property]: change.value,
                        })
                    )
                );

                await Promise.all(updatePromises);
                dispatch(markUpdatesEnd());

                setEditableFields(new Map());
                setChanges([]);
                setIsEditingEnabled(false);
                setIsLoading(false);
            }
        }
    };

    const handleEditClick = () => {
        setIsEditingEnabled(true);
        const initialEditableFields = new Map(
            data.map((row) => [
                row.id,
                {
                    description: row.description || '',
                    phone: row.phone || '',
                    email: row.email || '',
                    team: row.team || '',
                    role: row.role || '',
                    is_active: row.is_active || false,
                    return_date: row.return_date || '',
                    start_date: row.start_date || '',
                },
            ])
        );
        setEditableFields(initialEditableFields);
    };

    const handleCancelClick = () => {
        setIsEditingEnabled(false);
    };

    const formatImageUrl = (image: string | null) => {
        const imageUrl =
            image && image.includes('/media/')
                ? image.replace('/media/', '/api/media/')
                : 'https://img.icons8.com/?size=100&id=98957&format=png&color=000000';

        const finalImageUrl = imageUrl.startsWith('http')
            ? imageUrl
            : `https://siclop.defensoria.sc.def.br${imageUrl}`;

        return finalImageUrl;
    };

    const handleFileChangeEmployee = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (uploadingEmployeeId !== null) {
                try {
                    await handleImageUpload(uploadingEmployeeId, file);
                } catch (error) {
                    console.error('Failed to upload image:', error);
                } finally {
                    setUploadingEmployeeId(null);
                }
            }
        }
    };

    const handleImageUpload = async (employeeId: number, file: File) => {
        if (employeeId !== null && file) {
            try {
                await dispatch(
                    uploadImage({
                        employeeId: employeeId.toString(),
                        image: file,
                    })
                );
            } catch (error) {
                console.error('Failed to upload image:', error);
            } finally {
                window.location.reload();
            }
        }
    };

    const handleFileChangeUser = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (uploadingUserId !== null) {
                try {
                    await handleImageUploadUser(uploadingUserId, file);
                } catch (error) {
                    console.error('Failed to upload image:', error);
                } finally {
                    setUploadingUserId(null); 
                }
            }
        }
    };

    const handleImageUploadUser = async (userId: number, file: File) => {
        if (userId !== null && file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                await dispatch(
                    uploadUserImage({
                        userId: userId.toString(),
                        image: formData,
                    })
                ).unwrap(); 

                window.location.reload();
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };
    
    const sortedTeams = [
        'GERÊNCIA DE TECNOLOGIA DA INFORMAÇÃO',
        'NÚCLEO DA CAPITAL',
    ];
    const isActiveOptions = ['Normal', 'Afastado'];
    const sortedRoles = [
        'PROGRAMADOR',
        'SERVENTE',
        'MOTORISTA',
        'RECEPCIONISTA',
        'TÉCNICO DE INFORMÁTICA',
        'TELEFONISTA',
        'ZELADOR',
        'SUPERVISOR TERCEIRIZADO',
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 750);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const hasCredential = sessionStorage.getItem('credentials');
        if (hasCredential) {
            setDisplayedColumns(columns);
            setShowEditButton(true);
        } else {
            const filteredColumns = columns.filter(
                (column) =>
                    !['blood_type', 'gender', 'start_date'].includes(
                        column.property
                    )
            );
            setDisplayedColumns(filteredColumns);
            setShowEditButton(false);
        }
    }, [columns]);

    useEffect(() => {
        showErrorSnackbar && snackbarMessages.error && setShowErrorDialog(true);
    }, [showErrorSnackbar]);

    useEffect(() => {
        if (showLoading) {
            dispatch(fetchEmployee(filter, 1));
            dispatch(setCurrentPage(1));
            setShowLoading(false);
        }
    }, [showLoading]);

    return (
        <div id="table" className={styles.content}>
            {errorUploadImageUser && (
                <Snackbar
                    type="errorUpdate"
                    onClose={() => dispatch(resetUploadState())}
                />
            )}
            {showSuccessSnackbar && snackbarMessages.success && (
                <Snackbar
                    type="successUpdate"
                    description={snackbarMessages.success}
                    onClose={() => {
                        if (!showErrorDialog) {
                            dispatch(resetCounters());
                            setShowLoading(true);
                        }
                    }}
                />
            )}
            {showErrorDialog && (
                <Dialog
                    open={showErrorDialog}
                    onClose={() => {
                        setShowErrorDialog(false);
                        dispatch(resetCounters());
                        setShowLoading(true);
                    }}
                >
                    <DialogTitle> Erros de Atualização: </DialogTitle>
                    <DialogContent>
                        <ul>
                            {errorDetails.map((error) => {
                                let fieldName;

                                switch (error.property) {
                                    case 'phone':
                                        fieldName = 'telefone';
                                        break;
                                    case 'email':
                                        fieldName = 'email';
                                        break;
                                    case 'description':
                                        fieldName = 'info';
                                        break;
                                    default:
                                        fieldName = error.property;
                                        break;
                                }

                                return (
                                    <li key={error.id}>
                                        {error.name} - no campo {fieldName}.
                                    </li>
                                );
                            })}
                        </ul>
                        {errorDetails.some(
                            (error) => error.property === 'email'
                        ) && (
                            <p className={styles.explanatoryText}>
                                Certifique-se de que os formatos de e-mail estão
                                corretos:
                                <br />
                                <strong>nome@defensoria.sc.gov.br</strong>
                            </p>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={() => {
                                setShowErrorDialog(false);
                                dispatch(resetCounters());
                                setShowLoading(true);
                            }}
                        >
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <div className={styles.header}>
                {title && (
                    <div className={styles.contentTitle}>
                        {SizePagination && (
                            <Select
                                value={pageSize.toString()}
                                onChange={handlePageSizeChange}
                                displayEmpty
                                aria-label="Selecione a paginação"
                                className={styles.paginationSize}
                            >
                                {[5, 10, 25, 50, 100].map((size) => (
                                    <MenuItem
                                        key={size}
                                        value={size.toString()}
                                    >
                                        {size} por página
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        <div
                            className={styles.title}
                            style={{
                                color: isColorInverted ? '#fafafa' : 'initial',
                            }}
                        >
                            {title}
                        </div>
                        {generateDocs && (
                            <ModalDocs
                                onGenerateXlsx={onGenerateXlsx}
                                onGeneratePDF={onGeneratePDF}
                                onGenerateBirthday={() =>
                                    onGenerateBirthday?.(data)
                                }
                                isVisibleGenerateBirthday={
                                    isVisibleGenerateBirthday
                                }
                            />
                        )}
                    </div>
                )}
            </div>
            <div className={styles.container}>
                <div className={styles.tableHeader}>
                    {displayedColumns.map((column, index) => (
                        <div
                            key={index}
                            className={styles.columnHeader}
                            style={{
                                flex:
                                    column.property === 'description'
                                        ? 1.25
                                        : column.property === 'name'
                                        ? 1.25
                                        : column.property === 'is_active'
                                        ? 0.5
                                        : column.property === 'image' && location.pathname === '/siclop/outsourced/'
                                        ? 0.6
                                        : column.property === 'image'
                                        ? 0.5
                                        : column.property === 'email' && location.pathname === '/siclop/admin/'
                                        ? 1.25
                                        : 1,
                            }}
                        >
                            <div className={styles.columnTitle}>
                                {column.title}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    {loading || isLoading ? (
                        <div style={{ marginBottom: '3rem' }}>
                            <Loading size="4rem" type="spin" />
                        </div>
                    ) : (
                        <>
                            {isEmpty || error ? (
                                <div
                                    className={styles.empty}
                                    style={{
                                        color: isColorInverted
                                            ? '#fafafa'
                                            : 'initial',
                                    }}
                                >
                                    {isEmpty
                                        ? 'Não foi encontrado nenhum conteúdo!'
                                        : 'Não foi possível carregar as informações!'}
                                </div>
                            ) : (
                                <>
                                    {paginatedData?.map((row, rowIndex) => (
                                        <div
                                            key={rowIndex}
                                            className={`${
                                                isRowClickable
                                                    ? styles.tableRow
                                                    : styles.tableRowNormal
                                            }`}
                                            onClick={() =>
                                                isRowClickable &&
                                                !isEditingEnabled &&
                                                handleDetailsClick(row.team)
                                            }
                                        >
                                            {displayedColumns.map(
                                                (column, columnIndex) => (
                                                    <div
                                                        key={columnIndex}
                                                        className={styles.row}
                                                        style={{
                                                            flex:
                                                                column.property === 'description'
                                                                    ? 1.25
                                                                    : column.property === 'name'
                                                                    ? 1.25
                                                                    : column.property === 'is_active'
                                                                    ? 0.5
                                                                    : column.property === 'image'
                                                                    ? 0.5
                                                                    : column.property === 'email' && location.pathname === '/siclop/admin/'
                                                                    ? 1.25
                                                                    : 1,
                                                        }}
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            if (
                                                                column.property ===
                                                                'delete'
                                                            ) {
                                                            } else {
                                                                if (
                                                                    !isEditingEnabled &&
                                                                    isRowClickable
                                                                ) {
                                                                    handleDetailsClick(
                                                                        row.team
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    > 
                                                    {column.property === "image" ? (
                                                        <>
                                                            <img
                                                                src={formatImageUrl(row.image)}
                                                                alt={row.name}
                                                                className={`${styles.nameImage} ${isEditingEnabled ? styles.nameEditImage : ''}`}
                                                                onClick={(event) => {
                                                                    if (isEditingEnabled) {
                                                                        event.stopPropagation();
                                                                        if (location.pathname === '/siclop/admin/') {
                                                                            setUploadingUserId(row.id); 
                                                                        } else {
                                                                            setUploadingEmployeeId(row.id);
                                                                        }
                                                                        fileInputRef.current?.click();
                                                                    }
                                                                }}
                                                            />
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                style={{ display: 'none' }}
                                                                onChange={location.pathname === '/siclop/admin/' ? handleFileChangeUser : handleFileChangeEmployee}
                                                            />
                                                        </>
                                                        ) : isEditingEnabled &&
                                                          location.pathname !==
                                                              '/siclop/admin/' &&
                                                          [
                                                              'description',
                                                              'phone',
                                                              'email',
                                                          ].includes(
                                                              column.property
                                                          ) ? (
                                                            column.property ===
                                                            'phone' ? (
                                                                <EditableTextField
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        const numericValue =
                                                                            value.replace(
                                                                                /[^0-9]/g,
                                                                                ''
                                                                            );
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            numericValue
                                                                        );
                                                                    }}
                                                                    onBlur={() =>
                                                                        handleBlur(
                                                                            row.id,
                                                                            column.property
                                                                        )
                                                                    }
                                                                    property="phone"
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <EditableTextField
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) =>
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            value
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        handleBlur(
                                                                            row.id,
                                                                            column.property
                                                                        )
                                                                    }
                                                                    property={
                                                                        column.property
                                                                    }
                                                                    autoFocus
                                                                />
                                                            )
                                                        ) : location.pathname ===
                                                              '/siclop/outsourced/' &&
                                                          isEditingEnabled &&
                                                          [
                                                              'description',
                                                              'phone',
                                                              'email',
                                                              'team',
                                                              'role',
                                                              'is_active',
                                                              'return_date',
                                                              'start_date',
                                                          ].includes(
                                                              column.property
                                                          ) ? (
                                                            column.property ===
                                                            'phone' ? (
                                                                <EditableTextField
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        const numericValue =
                                                                            value.replace(
                                                                                /[^0-9]/g,
                                                                                ''
                                                                            );
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            numericValue
                                                                        );
                                                                    }}
                                                                    onBlur={() =>
                                                                        handleBlur(
                                                                            row.id,
                                                                            column.property
                                                                        )
                                                                    }
                                                                    property="phone"
                                                                    autoFocus
                                                                />
                                                            ) : column.property ===
                                                                  'start_date' ||
                                                              column.property ===
                                                                  'return_date' ? (
                                                                <LocalizationProvider
                                                                    dateAdapter={
                                                                        AdapterDayjs
                                                                    }
                                                                >
                                                                    <DatePicker
                                                                        value={dayjs(
                                                                            editableFields?.get(
                                                                                row.id
                                                                            )?.[
                                                                                column
                                                                                    .property
                                                                            ]
                                                                        )}
                                                                        className={
                                                                            styles.selectDateTable
                                                                        }
                                                                        slotProps={{
                                                                            textField:
                                                                                {
                                                                                    style: {
                                                                                        height: '-1rem',
                                                                                    },
                                                                                    sx: {
                                                                                        backgroundColor:
                                                                                            'transparent',
                                                                                    },
                                                                                    size: 'small',
                                                                                    error: false,
                                                                                },
                                                                        }}
                                                                        format="DD/MM/YYYY"
                                                                        label={
                                                                            column.property ===
                                                                            'start_date'
                                                                                ? 'Ingresso'
                                                                                : 'Regresso'
                                                                        }
                                                                        onChange={(
                                                                            value
                                                                        ) => {
                                                                            const formattedDate =
                                                                                dayjs(
                                                                                    value
                                                                                ).format(
                                                                                    'YYYY-MM-DD'
                                                                                );
                                                                            handleInputChange(
                                                                                row.id,
                                                                                row.name,
                                                                                column.property,
                                                                                formattedDate
                                                                            );
                                                                        }}
                                                                    />
                                                                </LocalizationProvider>
                                                            ) : column.property ===
                                                              'team' ? (
                                                                <Select
                                                                    className={
                                                                        styles.selectInputTable
                                                                    }
                                                                    name="team"
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    displayEmpty
                                                                    aria-label="Selecionar unidade organizacional"
                                                                    autoFocus
                                                                >
                                                                    <MenuItem
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        <em
                                                                            className={
                                                                                styles.menuItemPlaceholder
                                                                            }
                                                                        >
                                                                            Unidade
                                                                            Organizacional
                                                                        </em>
                                                                    </MenuItem>
                                                                    {sortedTeams.map(
                                                                        (
                                                                            team: any
                                                                        ) => (
                                                                            <MenuItem
                                                                                sx={{
                                                                                    whiteSpace:
                                                                                        'normal',
                                                                                }}
                                                                                className={
                                                                                    styles.menuItem
                                                                                }
                                                                                key={
                                                                                    team
                                                                                }
                                                                                value={
                                                                                    team
                                                                                }
                                                                            >
                                                                                {
                                                                                    team
                                                                                }
                                                                            </MenuItem>
                                                                        )
                                                                    )}
                                                                </Select>
                                                            ) : column.property ===
                                                              'role' ? (
                                                                <Select
                                                                    className={
                                                                        styles.selectRoleInputTable
                                                                    }
                                                                    name="role"
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    displayEmpty
                                                                    aria-label="Selecionar cargo"
                                                                    autoFocus
                                                                >
                                                                    <MenuItem
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        <em
                                                                            className={
                                                                                styles.menuItemPlaceholder
                                                                            }
                                                                        >
                                                                            Cargo
                                                                        </em>
                                                                    </MenuItem>
                                                                    {sortedRoles.map(
                                                                        (
                                                                            role: any
                                                                        ) => (
                                                                            <MenuItem
                                                                                sx={{
                                                                                    whiteSpace:
                                                                                        'normal',
                                                                                }}
                                                                                className={
                                                                                    styles.menuItem
                                                                                }
                                                                                key={
                                                                                    role
                                                                                }
                                                                                value={
                                                                                    role
                                                                                }
                                                                            >
                                                                                {
                                                                                    role
                                                                                }
                                                                            </MenuItem>
                                                                        )
                                                                    )}
                                                                </Select>
                                                            ) : column.property ===
                                                              'is_active' ? (
                                                                <Select
                                                                    className={
                                                                        styles.selectIsActiveTable
                                                                    }
                                                                    name="is_active"
                                                                    value={booleanToString(
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ]
                                                                    )}
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        const value =
                                                                            event
                                                                                .target
                                                                                .value;
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            stringToBoolean(
                                                                                value
                                                                            )
                                                                        );
                                                                    }}
                                                                    displayEmpty
                                                                    aria-label="Status"
                                                                    autoFocus
                                                                >
                                                                    <MenuItem
                                                                        value=""
                                                                        disabled
                                                                    >
                                                                        <em
                                                                            className={
                                                                                styles.menuItemPlaceholder
                                                                            }
                                                                        >
                                                                            Status
                                                                        </em>
                                                                    </MenuItem>
                                                                    {isActiveOptions.map(
                                                                        (
                                                                            is_active: any
                                                                        ) => (
                                                                            <MenuItem
                                                                                sx={{
                                                                                    whiteSpace:
                                                                                        'normal',
                                                                                }}
                                                                                className={
                                                                                    styles.menuItem
                                                                                }
                                                                                key={
                                                                                    is_active
                                                                                }
                                                                                value={
                                                                                    is_active
                                                                                }
                                                                            >
                                                                                {
                                                                                    is_active
                                                                                }
                                                                            </MenuItem>
                                                                        )
                                                                    )}
                                                                </Select>
                                                            ) : (
                                                                <EditableTextField
                                                                    value={
                                                                        editableFields?.get(
                                                                            row.id
                                                                        )?.[
                                                                            column
                                                                                .property
                                                                        ] || ''
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) =>
                                                                        handleInputChange(
                                                                            row.id,
                                                                            row.name,
                                                                            column.property,
                                                                            value
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        handleBlur(
                                                                            row.id,
                                                                            column.property
                                                                        )
                                                                    }
                                                                    property={
                                                                        column.property
                                                                    }
                                                                    autoFocus
                                                                />
                                                            )
                                                        ) : column.property ===
                                                          'delete' ? (
                                                            <Button
                                                                onClick={() => {
                                                                    if (
                                                                        location.pathname.startsWith(
                                                                            '/siclop/admin/'
                                                                        )
                                                                    ) {
                                                                        handleDeleteUserClick(
                                                                            row.id
                                                                        );
                                                                    } else if (
                                                                        location.pathname.startsWith(
                                                                            '/siclop/outsourced/'
                                                                        )
                                                                    ) {
                                                                        handleDeleteEmployeeClick(
                                                                            row.id
                                                                        );
                                                                    }
                                                                }}
                                                                className={
                                                                    styles.button
                                                                }
                                                            >
                                                                <DeleteOutlineIcon
                                                                    className={
                                                                        spinningRowId ===
                                                                        row.id
                                                                            ? styles.spinning
                                                                            : ''
                                                                    }
                                                                />
                                                            </Button>
                                                        ) : (
                                                            <div
                                                                className={
                                                                    column.property ===
                                                                    'is_active'
                                                                        ? styles.isActive_cell
                                                                        : column.property ===
                                                                          'name'
                                                                        ? styles.nameCell
                                                                        : styles.tableCell
                                                                }
                                                                style={{
                                                                    color: isColorInverted
                                                                        ? '#fafafa'
                                                                        : 'initial',
                                                                }}
                                                            >
                                                                {formatCellValue(
                                                                    row,
                                                                    column
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={styles.displayButtons}>
                <div className={styles.pagination}>
                    <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        total={total}
                        pageSize={pageSize}
                        className={styles.customPagination}
                        itemRender={customItemRender}
                    />
                </div>
                <div className={styles.optionsButtons}>
                    {isEditable && isEditingEnabled && showEditButton ? (
                        <>
                            {location.pathname === '/siclop/admin/' ? (
                                <Button
                                    className={styles.buttonAdminSave}
                                    onClick={() => {
                                        setIsEditingEnabled(false);
                                    }}
                                >
                                    <SaveIcon />
                                </Button>
                            ) : (
                                <Button
                                    className={styles.buttonAdminSave}
                                    onClick={handleSaveClick}
                                >
                                    <SaveIcon />
                                </Button>
                            )}

                            <Button
                                className={styles.buttonAdmin}
                                onClick={handleCancelClick}
                            >
                                <CloseIcon />
                            </Button>
                        </>
                    ) : isEditable && !isEditingEnabled && showEditButton ? (
                        <>
                            <Button
                                className={styles.buttonAdmin}
                                onClick={handleEditClick}
                            >
                                <ModeEditOutlineIcon />
                            </Button>
                            {location.pathname === '/siclop/outsourced/' && (
                                <Button
                                    className={styles.outsourced}
                                    onClick={handleCreateClick}
                                >
                                    <AddIcon />
                                </Button>
                            )}
                            <CreateDialog
                                open={dialogOpen}
                                onClose={handleCloseDialog}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Table;
