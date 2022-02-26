import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../../models/patient';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractRestService} from '../../../services/genericservice';
import {environment} from '../../../../environments/environment';
@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    @ViewChild('notify') notity !: ElementRef;
    formGroup !: FormGroup;
    validated = true;
    typeUser !: string;
    error !: boolean;

    constructor(private patientService: AbstractRestService<Patient>, private router: Router, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            familyName: new FormControl('', [Validators.required]),
            birthdate: new FormControl('', [Validators.required]),
            school: new FormControl('', [Validators.required]),
            parentName: new FormControl(localStorage.getItem('name') !== null ? localStorage.getItem('name') : ''
                , [Validators.required]),
            parentFamilyName: new FormControl(localStorage.getItem('familyName') !== null ? localStorage.getItem('familyName') : '',
                [Validators.required]),
            parentEmail: new FormControl(localStorage.getItem('email') !== null ? localStorage.getItem('email') : '',
                [Validators.email]),
            parentPhone: new FormControl(localStorage.getItem('telephone') !== null ? localStorage.getItem('telephone') : '',
                [Validators.required]),
            parentCin: new FormControl(localStorage.getItem('cin') !== null ? localStorage.getItem('cin') : ''
                , [Validators.required]),
        });
        this.activeRoute.params.subscribe((params) => {
            this.typeUser = params.typeUser;
            if (this.typeUser === 'teacher') {
                this.formGroup.addControl('teacherName', new FormControl('', [Validators.required]));
                this.formGroup.addControl('teacherFamilyName', new FormControl('', [Validators.required]));
                this.formGroup.addControl('teacherTelephone', new FormControl('', [Validators.required]));
                this.formGroup.addControl('teacherCin', new FormControl('', [Validators.required]));
            }
        });
    }

    submit(event: Event): void {
        this.validated = true;
        event.preventDefault();
        let personId: number | undefined;
        personId = Number(localStorage.getItem('userId'));
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
        const unacceptDefeat = localStorage.getItem('unacceptDefeat');
        const troubleGuidingOthers = localStorage.getItem('troubleGuidingOthers');
        const troubleIntegratingWithOtherStudents = localStorage.getItem('troubleIntegratingWithOtherStudents');
        const lessCooperateWithOthers = localStorage.getItem('lessCooperateWithOthers');
        const upsetEasilyMakeEffort = localStorage.getItem('upsetEasilyMakeEffort');
        const lessAskTeacherHelp = localStorage.getItem('lessAskTeacherHelp');
        const patient: Patient = {
            name: this.formGroup.value.name,
            familyName: this.formGroup.value.familyName,
            birthdate: this.formGroup.value.birthdate,
            school: this.formGroup.value.school,
            parent_id: personId === 0 ? undefined : personId,
            parent: personId !== 0 ? undefined : {
                name: this.formGroup.value.parentName,
                familyName: this.formGroup.value.familyName,
                loginNumber: this.formGroup.value.parentCin,
                telephone: this.formGroup.value.parentPhone,
                email: this.formGroup.value.parentEmail,
                typeUser: 'parent'
            }
        };
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
            patient.teacher = {
                loginNumber: this.formGroup.value.teacherCin,
                name: this.formGroup.value.teacherName,
                telephone: this.formGroup.value.teacherTelephone,
                familyName: this.formGroup.value.teacherFamilyName,
                email: undefined,
                password: undefined,
                typeUser: 'teacher'
            };
            patient.behaviorTroubleTeacher =
                {
                    immediatelySatisfiedNeeds, angryUnexpectedBehavior, sensitiveCriticism, poutSulkEasily, moody, brawler,
                    denyMistakesBlameOthers, lessAskTeacherHelp
                }
            ;
            patient.extraTroubleTeacher = {
                    submissiveAttitudeTowardsAuthority,
                    lessAcceptedByGroup,
                    unacceptDefeat,
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
        this.patientService.create(`${environment.url}/api/patients/`, patient).then(async (response: Patient) => {
            const userId = localStorage.getItem('userId');
            const access = localStorage.getItem('access');
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
            this.validated = false;
            await this.router.navigate([`/landing/orientation/${response.id}`]);
        })
            .catch((error) => {
                this.validated = false;
                console.error(error);
            });
    }
}
