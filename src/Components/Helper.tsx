export function handleKeyPress(
    event: any,
    handleSubmit: any,
    key: string,
    different?: string | string[]
) {
    const differentArray = Array.isArray(different) ? different : [different];

    if (event.key === key && !differentArray.includes(event.target.name)) {
        handleSubmit();
    }
}

export const capitalizeWords = (str?: string): string => {
    if (!str) {
        return '';
    }

    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};
export const formatBoolean = (value: boolean): string =>
    value === true ? 'Normal' : 'Afastado';

export const formatData = (data: string[]) => data.map(capitalizeWords);

export const normalizeString = (str: string) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};

export const columns = [
    { title: '', property: 'image'},
    { title: 'Funcionário(a)', property: 'name' },
    { title: 'Município', property: 'city' },
    { title: 'Unidade organizacional', property: 'team' },
    { title: 'Cargo', property: 'role' },
    { title: 'Status', property: 'is_active' },
    { title: 'Ingresso', property: 'start_date' },
    { title: 'Regresso', property: 'return_date' },
    { title: 'Telefone', property: 'phone' },
    { title: 'Email', property: 'email' },
    { title: 'Sexo', property: 'gender' },
    { title: 'Info', property: 'description' },
];

export const columnsUsers = [
    { title: '', property: 'image' },
    { title: 'Usuário', property: 'email' },
    { title: 'Criado', property: 'created' },
    { title: 'Último login', property: 'last_login' },
    { title: 'Excluir', property: 'delete' },
];

export const columnTitles = columns.reduce((acc, { title, property }) => {
    acc[property] = title;
    return acc;
}, {} as { [key: string]: string });

export const options = ['PDF', 'XLSX', 'Aniversários'];

export const ptLocale = {
    months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],

    weekDays: [
        {
            name: 'Domingo',
            short: 'D',
            isWeekend: true,
        },
        {
            name: 'Segunda-feira',
            short: 'S',
        },
        {
            name: 'Terça-feira',
            short: 'T',
        },
        {
            name: 'Quarta-feira',
            short: 'Q',
        },
        {
            name: 'Quinta-feira',
            short: 'Q',
        },
        {
            name: 'Sexta-feira',
            short: 'S',
        },
        {
            name: 'Sábado',
            short: 'S',
            isWeekend: true,
        },
    ],

    weekStartingIndex: 0,

    getToday(gregorainTodayObject: any) {
        return gregorainTodayObject;
    },

    toNativeDate(date: any) {
        return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: any) {
        return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: any) {
        return digit;
    },

    nextMonth: 'Próximo Mês',
    previousMonth: 'Mês Anterior',
    openMonthSelector: 'Abrir Selecionador de Mês',
    openYearSelector: 'Abrir Selecionador de Ano',
    closeMonthSelector: 'Fechar Selecionador de Mês',
    closeYearSelector: 'Fechar Selecionador de Ano',
    defaultPlaceholder: 'Selecionar...',

    from: 'de',
    to: 'até',

    digitSeparator: ',',

    yearLetterSkip: 0,

    isRtl: false,
};

export const actionLabels: Record<'create' | 'update' | 'delete', string> = {
    create: 'Criado',
    update: 'Atualizado',
    delete: 'Excluído',
};

    
export const describeChanges = (changes: string[]) => {
    if (changes.length === 0) {
        return 'nenhuma alteração.';
    }

    return changes
        .map((field) => {
            switch (field) {
                case 'name':
                    return 'nome';
                case 'role':
                    return 'cargo';
                case 'start_date':
                    return 'data de início';
                case 'city':
                    return 'município';
                case 'team':
                    return 'unidade organizacional';
                case 'email':
                    return 'email';
                case 'phone':
                    return 'telefone';
                case 'description':
                    return 'descrição';
                case 'gender':
                    return 'sexo';
                case 'is_active':
                    return 'status';
                case 'return_date':
                    return 'regresso';
                case 'image':
                    return 'imagem';
                default:
                    return field;
            }
        })
        .join(', ');
};
