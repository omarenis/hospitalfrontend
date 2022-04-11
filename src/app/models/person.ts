import {Localisation} from './localisation';

export interface Person {
    name: string;
    telephone: string;
    loginNumber: string;
    typeUser: string;
    school_id ?: string | null;
    familyName ?: string | null;
    speciality?: string;
    is_super ?: boolean;
    email?: string;
    super_doctor_id ?: string | null;
    password?: string;
    id?: number;
    localisation: Localisation | null;
}
