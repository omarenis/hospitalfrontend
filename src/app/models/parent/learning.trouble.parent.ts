import {Form} from '../form';


export interface LearningTroubleParent extends Form {
    hasLearningDifficulties: string | null;
    troubleFinishingThings: string | null;
    easilyBeingDistracted: string | null;
    enabilityFinishWhenDoEffort: string | null;
}
