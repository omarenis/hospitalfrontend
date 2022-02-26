import {Injectable} from '@angular/core';
import {Question} from '../models/question';
import {FormControl, FormGroup, Validators} from '@angular/forms';
export interface TemplateForm {
    questions: Question[];
    formGroup: FormGroup;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    private parentQuestions: Question[] = [
        {
            id: 1,
            label: 'يقرض الاشياء اظافره - شعره - اصابعه - ثيابه',
            formControlName: 'chewMibThings'
        },
        {
            id: 2,
            label: 'لا يحترم من هو اكبر منه سنا',
            formControlName: 'insolentWithGrownUps'
        },
        {
            id: 3,
            label: 'يجد صعوبة قي اقامة علاقات مع اترابه و المحافظة عليها',
            formControlName: 'troubleMakeKeepFriends'
        },
        {
            id: 4,
            label: 'سريع الانفعال و الاستثارة',
            formControlName: 'excitableImpulsive'
        },
        {
            id: 5,
            label: 'يريد ان يتحكم',
            formControlName: 'wantDominate'
        },
        {
            id: 6,
            label: 'يمص او يمضغ ابهامه- الثياب- اللحاف',
            formControlName: 'suckChewThings'
        },
        {
            id: 7,
            label: 'يبكي كثيرا و بسهولة',
            formControlName: 'cryOftenEasily'
        },
        {
            id: 8,
            label: 'يشعر بان الاخرين يريدون الاساءة اليه دفاعي',
            formControlName: 'feelsAttackedDefensive'
        },
        {
            id: 9,
            label: 'يميل الى احلام اليقظة ',
            formControlName: 'dreamer'
        },
        {
            id: 10,
            label: 'يجد صعوبة في اكتساب المعلومات ',
            formControlName: 'hasLearningDifficulties'
        },
        {
            id: 11,
            label: 'كثير الحركة لا يستطيع ان يبقى ماكثا في مكانه',
            formControlName: 'squirms',
        },
        {
            id: 12,
            label: 'يخاف من كل ما هو جديد (المواقف-اماكن-اناس-المدرسة)',
            formControlName: 'afraidNewThings'
        },
        {
            id: 13,
            label: 'كثير الحركة يحتاج دوما الى القيام بشي ما',
            formControlName: 'restlessNeedsDoSomething'
        },
        {
            id: 14,
            label: 'متلث مخرب',
            formControlName: 'destructive'
        },
        {
            id: 15,
            label: 'يكذب يختلق الاحاديث',
            formControlName: 'lieMadeUpStories'
        },
        {
            id: 16,
            label: 'محتشم',
            formControlName: 'shy'
        },
        {
            id: 17,
            label: 'يورط نفسه و يضع نفسه في مازق خلافا عن اترابه',
            formControlName: 'getTroublesMoreThanOthers',
        },
        {
            id: 18,
            label: 'لا يستعمل نفس السبل اللغوي الذي يوظفه اترابه ( لغة الطفل . يتلعثم في الكلام.كلام غير واضح)',
            formControlName: 'speakLikeBabyStutters',
        },
        {
            id: 19,
            label: 'ينكر اخطاءه و ينسبها لغيره',
            formControlName: 'denyMistakesBlameOthers',
        },
        {
            id: 20,
            label: 'كثير الخصام و يورط نفسه في المشاجرات',
            formControlName: 'quarrelsomeGetInvolvedFight'
        },
        {
            id: 21,
            label: 'يشتزر يقطب وجهه يكظم غيظه',
            formControlName: 'poutSulkEasily',
        },
        {
            id: 22,
            label: 'يستولى على ممتلكات غيره',
            formControlName: 'stealThings',
        },
        {
            id: 23,
            label: 'عنيد يطيع عن مضض',
            formControlName: 'disobeyReluctantlyObey',
        },
        {
            id: 24,
            label: 'يخاف من المرض الموت الوحدة اكثر من غيره',
            formControlName: 'worryMuch',
        },
        {
            id: 25,
            label: 'يجد صعوبة في اتمام ما شرع في القيام به',
            formControlName: 'troubleFinishingThings',
        },
        {
            id: 26,
            label: 'يغضب بسهولة ',
            formControlName: 'easilyWrinkledEasilyAngry',
        },
        {
            id: 27,
            label: 'يعنف و يشاكس زملاءه',
            formControlName: 'bullyIntimidateComrades',
        },
        {
            id: 28,
            label: 'يجد صعوبة لاتمام نشاط متكرر',
            formControlName: 'troubleFinishRepetitiveActivity'
        },
        {
            id: 29,
            label: 'قاس/طاغ',
            formControlName: 'cruel',
        },
        {
            id: 30,
            label: 'غير ناضج على المستوى العاطفي يستعين بغيره عند القيام باعمال يستطيع القيام بها بمفرده و يحتاج دائما الى ان نطمئنه',
            formControlName: 'immature',
        },
        {
            id: 31,
            label: 'يجد صعوبة في التركيز بسهو بسهولة',
            formControlName: 'easilyBeingDistracted',
        },
        {
            id: 32,
            label: 'يشكو من الصداع',
            formControlName: 'headaches',
        }, {
            id: 33,
            label: 'له مزاج متقلب و بصفة متواصلة ',
            formControlName: 'moody'
        },
        {
            id: 34,
            label: 'لا يتقيد بالقوانين و القواعد الاجتماعية يحب اختراق الممنوعات',
            formControlName: 'breakRules',
        },
        {
            id: 35,
            label: 'يتخاصم بكثرة',
            formControlName: 'constantlyFight',
        },
        {
            id: 36,
            label: 'لا ينسجم مع اخوانه و اخواته',
            formControlName: 'notGetAlongWithBrothers'
        },
        {
            id: 37,
            label: 'عند القيام بمجهود يحس بسرعة بعدم القدرة على ذلك',
            formControlName: 'enabilityFinishWhenDoEffort',
        },
        {
            id: 38,
            label: 'يشوش يزعج الاطفال الاخرين',
            formControlName: 'disturbOtherChildren',
        },
        {
            id: 39,
            label: 'يبدو غير سعيد و مرتاح (حزين المظهر)',
            formControlName: 'unhappy',
        },
        {
            id: 40,
            label: 'يجد صعوبة في الاكل (قليل الشهية كثير الحركة اثناء الاكل يقف بين اللقمة و الاخرى )',
            formControlName: 'feedingProblems',
        },
        {
            id: 41,
            label: 'يشكو من آلام جسدية مختلفة',
            formControlName: 'physicalAches',
        },
        {
            id: 42,
            label: 'يشكو من الام في المعدة',
            formControlName: 'upsetStomach',
        },
        {
            id: 43,
            label: 'يشكو من صعوبات في النوم لا ينام بسهولة يفيق باكرا جدا ينهض اثناء اليل',
            formControlName: 'sleepingProblems',
        },
        {
            id: 44,
            label: 'يتقيأ يشكو من الغثيان',
            formControlName: 'vomitingNausea'
        },
        {
            id: 45,
            label: 'يشعر بالظلم في عائلته و يندد به',
            formControlName: 'feelWrongedCryOutInjustice',
        },
        {
            id: 46,
            label: 'يتباهى يتكلف',
            formControlName: 'bragsBoastful',
        },
        {
            id: 47,
            label: 'انهزامي و ينقاد من قبل الاخرين',
            formControlName: 'beingCrashedManipulated',
        },
        {
            id: 48,
            label: 'يشكو من صعوبة في التفريغ المعوي مرض جريان الجوف او القبض.',
            formControlName: 'bowelMovementProblems',
        }
    ];
    private teacherQuestions: Question[] = [
        {
            id: 1,
            label: 'مضطرب (هائج) يستدير حول نفسه في اتجاهات مختلفة و هو جالس على مقعده',
            formControlName: 'restlessSquirmsChair',
        },
        {
            id: 2,
            label: 'يصدر اصواتا في غير محلها و عندما لا يسمح الظرف بذلك',
            formControlName: 'inappropriateNoises',
        },
        {
            id: 3,
            label: 'يجب تلبية طلباته حالا',
            formControlName: 'immediatelySatisfiedNeeds',
        },
        {
            id: 4,
            label: 'يميل الى الخبث وقح غير مهذب',
            formControlName: 'arrogantImpolite',
        },
        {
            id: 5,
            label: 'تنتابه نوبات غضب و يقوم بتصرفات غير متوقعة',
            formControlName: 'angryUnexpectedBehavior',
        },
        {
            id: 6,
            label: 'له حساسية مفرطة للنقد',
            formControlName: 'sensitiveCriticism',
        },
        {
            id: 7,
            label: 'يبدو شارد الذهن',
            formControlName: 'distracted',
        },
        {
            id: 8,
            label: 'يزعج غيره من التلاميذ',
            formControlName: 'annoyStudents',
        },
        {
            id: 9,
            label: 'يبدو حالما,أحلام اليقظة ',
            formControlName: 'dreamer',
        },
        {
            id: 10,
            label: 'يعبس و يغضب بسهولة',
            formControlName: 'poutSulkEasily',
        },
        {
            id: 11,
            label: 'له مزاج متقلب و بصفة واضحة',
            formControlName: 'moody',
        },
        {
            id: 12,
            label: 'يتشاجر بكثرة',
            formControlName: 'brawler',
        },
        {
            id: 13,
            label: 'يخضع لكل ذي سلطة',
            formControlName: 'submissiveAttitudeTowardsAuthority',
        },
        {
            id: 14,
            label: 'مضطرب (هائج) يتحرك باستمرار',
            formControlName: 'goesLeftRight',
        },
        {
            id: 15,
            label: 'يثور (يهيج) بسهولة مندفع',
            formControlName: 'easilyTurnOnImpulsive',
        },
        {
            id: 16,
            label: 'يستدعي انتباه المدرس بصفة مفرطة',
            formControlName: 'excessiveAttentionFromTeacher',
        },
        {
            id: 17,
            label: 'يبدو غير مقبول من قبل المجموعة',
            formControlName: 'lessAcceptedByGroup',
        },
        {
            id: 18,
            label: 'ينقاد من قبل الآخرين',
            formControlName: 'beLedByOthers',
        },
        {
            id: 19,
            label: 'لا يقبل الهزيمة',
            formControlName: 'unacceptDefeat',
        },
        {
            id: 20,
            label: 'ليست له القدرة على تدريب الاخرين او قيادتهم',
            formControlName: 'troubleGuidingOthers',
        },
        {
            id: 21,
            label: 'يجد صعوبة في اتمام ما شرع القيام فيه',
            formControlName: 'troubleFinishingThings',
        },
        {
            id: 22,
            label: 'صبياني غير ناضج على المستوى العاطفي يتصرف تصرفات من هو اصغر منه سنا',
            formControlName: 'immature',
        },
        {
            id: 23,
            label: 'ينكر اخطاءه و يتهم غيره',
            formControlName: 'denyMistakesBlameOthers',
        },
        {
            id: 24,
            label: 'يجد صعوبة في التفاهم ( المفاهمة مع غيره من التلاميذ)',
            formControlName: 'troubleIntegratingWithOtherStudents',
        },
        {
            id: 25,
            label: 'يتعاون بقلة مع اترابه بالقسم',
            formControlName: 'lessCooperateWithOthers',
        },
        {
            id: 26,
            label: 'يتوتر بسهولة عندما يجب عليه القيام بمجهود ما',
            formControlName: 'upsetEasilyMakeEffort',
        },
        {
            id: 27,
            label: 'يستعين بقلة بمعلمه- يطلب استعانة معلمه بقلة',
            formControlName: 'lessAskTeacherHelp',
        },
        {
            id: 28,
            label: 'يجد صعوبات في التعلم',
            formControlName: 'hasLearningDifficulties',
        }
    ];

    generateFormGroup(typeUser: string, start: number, end: number): TemplateForm {
        let formArray = {};
        let questionArray: Question[];
        if (typeUser === 'teacher') {
            questionArray = this.teacherQuestions.slice(start, end);
        } else {
            questionArray = this.parentQuestions.slice(start, end);
        }
        const pair: any = {};
        questionArray.forEach((question: Question) => {
            Object.assign(pair, {[question.formControlName]: new FormControl('', [Validators.required])});
        });
        formArray = {...pair, ...formArray};
        return {
            questions: questionArray,
            formGroup: new FormGroup(formArray)
        };
    }

    getParentQuestions(): Question[]{
        return this.parentQuestions;
    }
}
