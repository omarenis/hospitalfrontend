import {Person} from './person';
import {Diagnostic} from './diagnostic';

export interface RendezVous {
    parent_id: number;
    doctor_id: number;
    date: Date | string;
    accepted: boolean;
    parent?: Person;
    doctor?: Person;
    id?: number;
    diagnostic?: Diagnostic;
}
