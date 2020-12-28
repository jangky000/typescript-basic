// 상속 및 다형성

class Parent{
    constructor(){
        console.log('Parent!');
    }
}

class Chlid extends Parent {
    constructor(){
        super();
    }
}

const herit: Parent = new Chlid(); // 다형성

interface Person {
    name: string
    age: number
}

class Man implements Person {
    name = 'name'
    age = 10

    constructor(){  
    }
}

const kim: Person = new Man();// 다형성


