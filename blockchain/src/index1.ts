// console.log("hello")


// const name = "jangky000",
//     age = 28,
//     gender = "male";

// const sayHi = (name: string, age: number, gender?: string): string =>{
//     return `Hello ${name}, you are ${age} years old, you are a ${gender}`
// }

// console.log(sayHi(person));

// -------------------------------------------------------------------------------

// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }

// const person = {
//     name: "jangky000",
//     age: 28,
//     gender: "male"
// }


// const sayHi = (person: Human): string =>{
//     return `Hello ${person.name}, you are ${person.age} years old, you are a ${person.gender}`
// }

// console.log(sayHi(person));

// -------------------------------------------------------------------------------

class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender?: string){ 
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const jky = new Human("jangky000", 28);

const sayHi = (person: Human): string =>{
    return `Hello ${person.name}, you are ${person.age} years old, you are a ${person.gender}`
}

console.log(sayHi(jky));

export {};