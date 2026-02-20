import api from './api';

export interface RejectionReason {
    id: number;
    name: string;
    active: boolean;
}

export interface BeneficiaryType {
    id: number;
    name: string;
    code: string;
    active: boolean;
}

export interface School {
    id: number;
    name: string;
    active: boolean;
}

export interface Department {
    id: number;
    name: string;
    active: boolean;
}

export interface EducationLevel {
    id: number;
    name: string;
    active: boolean;
}

export const masterDataService = {
    getRejectionReasons: (): Promise<RejectionReason[]> =>
        api.get('public/master-data/rejection-reasons').then(res => res.data),

    getBeneficiaryTypes: (): Promise<BeneficiaryType[]> =>
        api.get('public/master-data/beneficiary-types').then(res => res.data),

    getSchools: (): Promise<School[]> =>
        api.get('public/master-data/schools').then(res => res.data),

    getDepartments: (): Promise<Department[]> =>
        api.get('public/master-data/departments').then(res => res.data),

    getEducationLevels: (): Promise<EducationLevel[]> =>
        api.get('public/master-data/education-levels').then(res => res.data),
};
