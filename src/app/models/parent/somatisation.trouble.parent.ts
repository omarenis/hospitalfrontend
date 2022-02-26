import {Form} from '../form';


export interface SomatisationTroubleParent extends Form {
    headaches: string | null;
    upsetStomach: string | null;
    physicalAches: string | null;
    vomitingNausea: string | null;
}
