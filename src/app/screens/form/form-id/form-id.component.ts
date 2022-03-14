import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Question} from '../../../models/question';
import {QuestionService} from '../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractRestService, saveDataToLocalhost} from '../../../services/genericservice';
import {Patient} from '../../../models/patient';
import {environment} from '../../../../environments/environment';
import {SecureStorageService} from 'src/app/services/secure-storage.service';

@Component({
    selector: 'app-form-id',
    templateUrl: './form-id.component.html',
    styleUrls: ['./form-id.component.css']
})
export class FormIdComponent implements OnInit {
    formGroup !: FormGroup;
    questions !: Question[];
    typeUser !: string;
    step !: number;

    constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute,
                private patientService: AbstractRestService<Patient>, private secureStorageService: SecureStorageService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(() => {
            this.step = Number(this.activatedRoute.snapshot.params.id);
            this.typeUser = this.activatedRoute.snapshot.params.typeUser;
            const index = this.typeUser === 'parent' ? 16 : 14;
            const templateForm = this.questionService.generateFormGroup(this.typeUser, (this.step - 1) * index, this.step * index);
            this.questions = templateForm.questions;
            this.formGroup = templateForm.formGroup;
        });
    }

    async submit(event: Event): Promise<void> {
        event.preventDefault();
        saveDataToLocalhost(this.formGroup.value);
        console.log(this.formGroup.value);
        if (this.typeUser === 'teacher' && this.step === 2 || this.typeUser === 'parent' && this.step === 3) {
            const patientData = localStorage.getItem('patient');
            console.log(patientData);
            if (patientData !== null) {
                const patient: Patient = JSON.parse(patientData);
                const dreamer = localStorage.getItem('dreamer');
                const poutSulkEasily = localStorage.getItem('poutSulkEasily');
                const moody = localStorage.getItem('moody');
                const troubleFinishingThings = localStorage.getItem('troubleFinishingThings');
                const immature = localStorage.getItem('immature');
                const denyMistakesBlameOthers = localStorage.getItem('denyMistakesBlameOthers');
                const hasLearningDifficulties = localStorage.getItem('hasLearningDifficulties');
                const chewMibThings = localStorage.getItem('chewMibThings');
                const insolentWithGrownUps = localStorage.getItem('chewMibThings');
                const troubleMakeKeepFriends = localStorage.getItem('troubleMakeKeepFriends');
                const excitableImpulsive = localStorage.getItem('excitableImpulsive');
                const wantDominate = localStorage.getItem('wantDominate');
                const suckChewThings = localStorage.getItem('suckChewThings');
                const cryOftenEasily = localStorage.getItem('cryOftenEasily');
                const feelsAttackedDefensive = localStorage.getItem('feelsAttackedDefensive');
                const squirms = localStorage.getItem('squirms');
                const afraidNewThings = localStorage.getItem('afraidNewThings');
                const restlessNeedsDoSomething = localStorage.getItem('restlessNeedsDoSomething');
                const destructive = localStorage.getItem('destructive');
                const lieMadeUpStories = localStorage.getItem('lieMadeUpStories');
                const shy = localStorage.getItem('shy');
                const getTroublesMoreThanOthers = localStorage.getItem('getTroublesMoreThanOthers');
                const speakLikeBabyStutters = localStorage.getItem('speakLikeBabyStutters');
                const quarrelsomeGetInvolvedFight = localStorage.getItem('quarrelsomeGetInvolvedFight');
                const stealThings = localStorage.getItem('stealThings');
                const disobeyReluctantlyObey = localStorage.getItem('disobeyReluctantlyObey');
                const worryMuch = localStorage.getItem('worryMuch');
                const easilyWrinkledEasilyAngry = localStorage.getItem('easilyWrinkledEasilyAngry');
                const bullyIntimidateComrades = localStorage.getItem('bullyIntimidateComrades');
                const troubleFinishRepetitiveActivity = localStorage.getItem('troubleFinishRepetitiveActivity');
                const cruel = localStorage.getItem('cruel');
                const easilyBeingDistracted = localStorage.getItem('easilyBeingDistracted');
                const headaches = localStorage.getItem('headaches');
                const breakRules = localStorage.getItem('breakRules');
                const constantlyFight = localStorage.getItem('constantlyFight');
                const notGetAlongWithBrothers = localStorage.getItem('notGetAlongWithBrothers');
                const enabilityFinishWhenDoEffort = localStorage.getItem('enabilityFinishWhenDoEffort');
                const disturbOtherChildren = localStorage.getItem('disturbOtherChildren');
                const unhappy = localStorage.getItem('unhappy');
                const feedingProblems = localStorage.getItem('feedingProblems');
                const upsetStomach = localStorage.getItem('upsetStomach');
                const sleepingProblems = localStorage.getItem('sleepingProblems');
                const physicalAches = localStorage.getItem('physicalAches');
                const vomitingNausea = localStorage.getItem('vomitingNausea');
                const feelWrongedCryOutInjustice = localStorage.getItem('feelWrongedCryOutInjustice');
                const bragsBoastful = localStorage.getItem('bragsBoastful');
                const beingCrashedManipulated = localStorage.getItem('beingCrashedManipulated');
                const bowelMovementProblems = localStorage.getItem('bowelMovementProblems');
                const restlessSquirmsChair = localStorage.getItem('restlessSquirmsChair');
                const inappropriateNoises = localStorage.getItem('inappropriateNoises');
                const arrogantImpolite = localStorage.getItem('arrogantImpolite');
                const immediatelySatisfiedNeeds = localStorage.getItem('immediatelySatisfiedNeeds');
                const angryUnexpectedBehavior = localStorage.getItem('angryUnexpectedBehavior');
                const sensitiveCriticism = localStorage.getItem('sensitiveCriticism');
                const distracted = localStorage.getItem('distracted');
                const annoyStudents = localStorage.getItem('annoyStudents');
                const brawler = localStorage.getItem('brawler');
                const submissiveAttitudeTowardsAuthority = localStorage.getItem('submissiveAttitudeTowardsAuthority');
                const goesLeftRight = localStorage.getItem('goesLeftRight');
                const easilyTurnOnImpulsive = localStorage.getItem('easilyTurnOnImpulsive');
                const excessiveAttentionFromTeacher = localStorage.getItem('excessiveAttentionFromTeacher');
                const lessAcceptedByGroup = localStorage.getItem('lessAcceptedByGroup');
                const beLedByOthers = localStorage.getItem('beLedByOthers');
                const refuseDefeat = localStorage.getItem('unacceptDefeat');
                const troubleGuidingOthers = localStorage.getItem('troubleGuidingOthers');
                const troubleIntegratingWithOtherStudents = localStorage.getItem('troubleIntegratingWithOtherStudents');
                const lessCooperateWithOthers = localStorage.getItem('lessCooperateWithOthers');
                const upsetEasilyMakeEffort = localStorage.getItem('upsetEasilyMakeEffort');
                const lessAskTeacherHelp = localStorage.getItem('lessAskTeacherHelp');
                if (this.typeUser === 'parent') {
                    patient.behaviortroubleparent = {
                        insolentWithGrownUps, feelsAttackedDefensive, destructive, denyMistakesBlameOthers, quarrelsomeGetInvolvedFight,
                        bullyIntimidateComrades, constantlyFight, unhappy
                    };
                    patient.anxitytroubleparent = {
                        afraidNewThings, beingCrashedManipulated, shy, worryMuch
                    };
                    patient.extratroubleparent = {
                        chewMibThings, troubleMakeKeepFriends, suckChewThings, dreamer, lieMadeUpStories, getTroublesMoreThanOthers,
                        speakLikeBabyStutters, poutSulkEasily, stealThings, disobeyReluctantlyObey, easilyWrinkledEasilyAngry,
                        troubleFinishRepetitiveActivity, cruel, immature, breakRules, notGetAlongWithBrothers, feedingProblems,
                        sleepingProblems, feelWrongedCryOutInjustice, bragsBoastful, bowelMovementProblems
                    };
                    patient.hyperactivitytroubleparent = {
                        excitableImpulsive, cryOftenEasily, squirms, restlessNeedsDoSomething, destructive, troubleFinishingThings,
                        easilyBeingDistracted, moody, enabilityFinishWhenDoEffort, disturbOtherChildren
                    };
                    patient.somatisationtroubleparent = {headaches, upsetStomach, physicalAches, vomitingNausea};
                    patient.impulsivitytroubleparent = {
                        excitableImpulsive,
                        wantDominate,
                        squirms,
                        restlessNeedsDoSomething
                    };
                    patient.learningtroubleparent = {
                        hasLearningDifficulties,
                        troubleFinishingThings,
                        enabilityFinishWhenDoEffort,
                        easilyBeingDistracted
                    };
                } else if (this.typeUser === 'teacher') {
                    patient.behaviorTroubleTeacher =
                        {
                            immediatelySatisfiedNeeds, angryUnexpectedBehavior, sensitiveCriticism, poutSulkEasily, moody, brawler,
                            denyMistakesBlameOthers, lessAskTeacherHelp
                        }
                    ;
                    patient.extraTroubleTeacher = {
                        submissiveAttitudeTowardsAuthority,
                        lessAcceptedByGroup,
                        unacceptDefeat: refuseDefeat,
                        troubleIntegratingWithOtherStudents,
                        lessCooperateWithOthers
                    };
                    patient.inattentionTroubleTeacher = {
                        distracted, dreamer, beLedByOthers, troubleFinishingThings,
                        troubleGuidingOthers, immature, upsetEasilyMakeEffort, hasLearningDifficulties
                    };
                    patient.hyperActivityTroubleTeacher = {
                        restlessSquirmsChair, angryUnexpectedBehavior, distracted, annoyStudents, poutSulkEasily, moody, goesLeftRight,
                        easilyTurnOnImpulsive, troubleFinishingThings, upsetEasilyMakeEffort
                    };
                    patient.impulsivityTroubleTeacher = {
                        restlessSquirmsChair,
                        inappropriateNoises,
                        arrogantImpolite,
                        annoyStudents,
                        goesLeftRight,
                        easilyTurnOnImpulsive,
                        excessiveAttentionFromTeacher
                    };
                }
                let access = localStorage.getItem('access');
                if (access) {
                    access = this.secureStorageService.getToken(access);
                }
                this.patientService.create(`${environment.url}/api/patients`, patient, {headers: {Authorization: `Bearer ${access}`}}
                ).then(async (response: Patient) => {
                    const userId = localStorage.getItem('userId');
                    access = localStorage.getItem('access');
                    const refresh = localStorage.getItem('refresh');
                    const name = localStorage.getItem('name');
                    const typeUser = localStorage.getItem('typeUser');
                    localStorage.clear();
                    if (userId !== null && access !== null && refresh !== null && typeUser !== null && name !== null) {
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('access', access);
                        localStorage.setItem('refresh', refresh);
                        localStorage.setItem('name', name);
                        localStorage.setItem('typeUser', typeUser);
                    }
                    await this.router.navigate([`/landing/orientation/${response.id}`]);
                })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            await this.router.navigate([`/form/${this.typeUser}/${this.step + 1}`]);
        }
    }
}
