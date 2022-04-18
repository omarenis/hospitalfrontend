import {AnxityTroubleParent} from './parent/anxity.trouble.parent';
import {BehaviorTroubleParent} from './parent/behaviorTroubleParent';
import {ExtraTroubleParent} from './parent/extra.trouble.parent';
import {HyperactivityTroubleParent} from './parent/hyperactivity.trouble.parent';
import {ImpulsivityTroubleParent} from './parent/impulsivity.trouble.parent';
import {LearningTroubleParent} from './parent/learning.trouble.parent';
import {SomatisationTroubleParent} from './parent/somatisation.trouble.parent';
import {BehaviorTroubleTeacher} from './teacher/behaviorTroubleTeacher';
import {ExtraTroubleTeacher} from './teacher/extra.trouble.teacher';
import {HyperactivityTroubleTeacher} from './teacher/hyperactivity.trouble.teacher';
import {ImpulsivityTroubleTeacher} from './teacher/impulsivity.trouble.teacher';
import {InattentionTroubleTeacher} from './teacher/inattention.trouble.teacher';
import {Person} from './person';
import {Supervise} from './supervise';


export interface Patient {
    name: string;
    familyName: string;
    birthdate: Date | string;
    sick?: boolean;
    supervise?: Supervise;
    doctor_id?: number;
    id?: number;
    parent?: Person;
    teacher?: Person;
    behaviortroubleparent?: BehaviorTroubleParent;
    impulsivitytroubleparent?: ImpulsivityTroubleParent;
    learningtroubleparent?: LearningTroubleParent;
    anxitytroubleparent?: AnxityTroubleParent;
    somatisationtroubleparent?: SomatisationTroubleParent;
    hyperactivitytroubleparent?: HyperactivityTroubleParent;
    extratroubleparent?: ExtraTroubleParent;
    behaviorTroubleTeacher?: BehaviorTroubleTeacher;
    extraTroubleTeacher?: ExtraTroubleTeacher;
    hyperActivityTroubleTeacher?: HyperactivityTroubleTeacher;
    impulsivityTroubleTeacher?: ImpulsivityTroubleTeacher;
    inattentionTroubleTeacher?: InattentionTroubleTeacher;
    scoreParent: number;
    isSupervised: boolean;
    scoreTeacher: number;
}
