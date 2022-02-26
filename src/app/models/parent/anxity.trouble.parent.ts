import {Form} from '../form';

export interface AnxityTroubleParent extends Form{
    afraidNewThings: string | null;
    shy: string | null;
    worryMuch: string | null;
    beingCrashedManipulated: string | null;
}
