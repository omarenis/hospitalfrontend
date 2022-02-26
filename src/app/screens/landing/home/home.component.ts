import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    specialities = [
        {
            id: 1,
            title: 'طب الاطفال',
            description: ' هو أحد فروع الطب الذي يتعامل مع الرعاية الطبية للأطفال الذين يعانون من مرض حاد أو مزمن ولكن أيضًا خدمات صحية وقائية للأطفال الأصحاء أيضا، و ذلك في كل مرحلة من مراحل النمو سواء مرحلة الرضاعة أو الطفولة أو مرحلة المراهقة',
            image: '/assets/image.jpg'
        },
        {
            id: 2,
            title: 'الطب النفسي للأطفال',
            description: 'هو فرع من فروع الطب النفسي المخصص للأطفال ، منذ الولادة الى سن ال18. ويقوم على دراسة وتشخيص وعلاج والوقاية من الاضطرابات النفسية التي تصيب الاطفال و الشباب',
            image: '/assets/img.png'
        },
        {
            id: 3,
            title: 'الطب العام',
            description: 'هو الإلمام الكامل بالأمراض التي تصيب جسم الإنسان والأعراض المصاحبة لهذه الأمراض. و تقوم على تقديم الرعاية الصحية الأولية للمرضى ',
            image: '/assets/img_1.png'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}
