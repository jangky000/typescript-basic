// 멤버 변수 등록 방법

// class Car {
//     age -> 멤버 변수 등록
//     constructor(age: number){
//         this.age= age
//     }
// }


class Car {
    constructor(public age: number){
        this.age= age
    }
}

// const car = new Car();
const car = new Car(10);

