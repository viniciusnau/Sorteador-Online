export interface FilterEmployee {
    email?: string;
    name?: string;
    city?: string;
    team?: string;
    is_active?: string;
    is_outsourced?: string;
    role?: string;
    return_date?: string;
    start_date?: string;
    end_date?: string;
    image?: string;
}

export interface FilterHistory {
    email?: string;
    name?: string;
    city?: string;
    team?: string;
    is_active?: string;
    is_outsourced?: string;
    role?: string;
    return_date?: string;
    start_date?: string;
    end_date?: string;
}

export interface Employee {
    id?: number;
    name?: string;
    email: string;
    city?: string;
    team?: string;
    is_active?: string;
    is_outsourced?: string;
    role?: string;
    return_date?: string;
    phone?: number;
    description?: string;
    start_date?: string;
    gender?: string;
    image?: string;
    birth_date?: string;
}

export interface Change {
    id: string;
    name: string;
    property: string;
    value: any;
}

export interface DateDetail {
    day: number;
    month: number;
    year: number;
}

export interface FormState {
    date: {
        from: DateDetail | null;
        to: DateDetail | null;
    };
}

export interface FilterUserProfile {
    start_date?: string;
    end_date?: string;
    email?: string;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
    created: string;
    last_login?: string; 
}

export interface DateDetail {
    day: number;
    month: number;
    year: number;
}

export interface FormState {
    date: {
        from: DateDetail | null;
        to: DateDetail | null;
    };
}
