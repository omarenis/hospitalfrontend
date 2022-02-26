import {Localisation} from './localisation';

export interface Person {
    name: string;
    telephone: string;
    loginNumber: string;
    typeUser: string;
    school_id ?: string | null;
    familyName ?: string | null;
    speciality?: string;
    email?: string;
    password?: string;
    id?: number;
    localisation?: Localisation;
}
