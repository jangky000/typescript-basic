// 공식 문서 상의 인터페이스

/**
 * 값의 형태를 검사하는 것 == 덕 타이핑(duck typing) or 구조적 서브타이핑 (structural subtyping)
 * TypeScript에서, 인터페이스는 이런 타입들의 이름을 짓는 역할
 */








// # 인터페이스 기본 예제

/**
 * myObj 객체가 LabeledValue보다 더 많은 프로퍼티를 갖고 있지만, 
 * 컴파일러는 최소한 필요한 프로퍼티가 있는지와 타입이 잘 맞는지만 검사
 * 
 * 타입 검사는 프로퍼티들의 순서 검사x 
 * 프로퍼티가 반드시 존재해야 한다.
 * 프로퍼티의 타입이 일치해야 한다.
 */

interface LabeledValue
{ 
    label: string
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"}; // 참고. 초과 프로퍼티 검사를 피하는 방법
printLabel(myObj);








 // # 선택적 프로퍼티를 포함한 인터페이스

/**
 * 인터페이스의 모든 프로퍼티는 어떤 조건에서만 존재하거나 없을 수도 있음 
 * 선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 ?를 붙여 표시
 * 
 * 선택적 프로퍼티의 이점은 인터페이스에 속하지 않는 프로퍼티의 사용을 방지하면서, 
 * 사용 가능한 속성을 기술
 * 
 * 해당 프로퍼티가 존재하지 않을 수 있다. 
 * 선언되지 않은 다른 프로퍼티가 존재할 수 없다.
 */

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});








// # 읽기전용 프로퍼티를 포함한 인터페이스

/**
 * 읽기전용 프로퍼티는 객체가 처음 생성될 때만 수정 가능
 */

interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // 오류! -> 할당 후에는 x, y를 수정할 수 없음

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a; // -> ReadonlyArray<T> 타입을 제공 -> 생성 후에 배열을 변경하지 않음을 보장
// ro[0] = 12; // 오류!
// ro.push(5); // 오류!
// ro.length = 100; // 오류!
// a = ro; // 오류!

a = ro as number[]; // 타입 단언(type assertion)으로 오버라이드하는 것은 가능

// readonly vs const 차이

/**
 * 변수는 const를 사용
 * 프로퍼티는 readonly를 사용
 */








// # 초과 프로퍼티 검사

/**
 * 인터페이스의 첫 번째 기본 예제에서 { label: string; }을 기대해도 { size: number; label: string; }를 허용
 * 객체 리터럴({num: 1} 등)은 다른 변수에 할당하거나 인수로 전달시, 특별한 처리를 받고, 초과 프로퍼티 검사를 받음
 * 객체 리터럴이 대상타입이 가지고 있지 않은 프로퍼티를 가지고 있으면 에러 발생
 * 
 */

interface SquareConfig1 {
    color?: string;
    width?: number;
}

function createSquare1(config: SquareConfig1): { color: string; area: number } {
    return {color: '', area: 0};
}

// let mySquare1 = createSquare1({ colour: "red", width: 100 }); // 에러 <- colour는 초과 프로퍼티

/**
 * width 프로퍼티는 적합하고, 
 * color 프로퍼티는 없고, 
 * colour 프로퍼티는 초과 프로퍼티임 -> 에러 발생
 */

 /**
  * 위 에러를 피하는 방법
  * 1. 객체 리터럴에 타입 단언 사용
  * 2. 인터페이스에 문자열 인덱스 서명 추가
  * 3. 객체 리터럴을 다른 변수에 할당 후 사용(공통 프로퍼티가 있는 경우에만 사용 가능)
  */

// 1. 객체 리터럴에 타입 단언 사용
let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// 2. 인터페이스에 문자열 인덱스 서명 추가
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 3. 객체 리터럴을 다른 변수에 할당 후 사용
/**
 * squareOptions가 추가 프로퍼티 검사를 받지 않음
 * squareOptions와 SquareConfig 사이에 공통 프로퍼티가 있는 경우에만 위와 같은 방법을 사용할 수 있음
 * 간단한 경우에는 이 방법을 사용하지 않는 것을 권장 -> 타입 정의를 수정하는 것이 바람직
 */
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);








// # 함수 타입을 정의한 인터페이스

// 함수 타입 인터페이스 정의
// function(source: string, subString: string): boolean {}
interface SearchFunc {
    (source: string, subString: string): boolean;
}

// 인터페이스 사용
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

/**
 * 올바른 함수 타입 검사를 위해, 매개변수의 이름이 같을 필요는 없음
 * 왜냐하면 함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사
 * source, subString 대신 src, sub 등으로 사용 가능
 */

let mySearch1: SearchFunc;
mySearch1 = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

// 타입 추론
/**
 * 함수 할당할 때 매개변수, return 타입 지정하지 않으면, 문맥상 타이핑으로 인수 타입을 추론
 */
let mySearch2: SearchFunc;
mySearch2 = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}







// # 인덱서블 타입
/**
 * 배열이나 Map 구조(혹은 dictionary 구조)의 타입을 인덱스로 정의할 수 있다.
 * 인덱스 시그니처(인덱스 서명): 인덱싱 할 때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술 
 * 인덱스 시그니처는 문자열과 숫자를 지원
 * 두 타입의 인덱서(indexer)를 모두 지원하는 것은 가능하지만, 숫자형 문자열로 인덱싱을 할 경우 주의할 것
 */
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 문자열 인덱스 시그니처는 반환 타입을 강제
/**
 * 문자열 인덱스 시그니처는 Dictionary 패턴 정의에 사용됨, 
 * 이때 모든 프로퍼티들이 반환 타입과 일치하도록 강제
 */
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 성공, length는 숫자입니다
    // name: string;      // 오류, `name`의 타입은 인덱서의 하위타입이 아닙니다
}

// 인덱스 시그니처가 프로퍼티 타입들의 합집합이라면 다른 타입의 프로퍼티들도 허용
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;    // 성공, length는 숫자입니다
    name: string;      // 성공, name은 문자열입니다
}

// 인덱싱한 값에 할당을 막기 위해 인덱스 시그니처를 읽기 전용으로 만들 수 있습니다:
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
// myArray1[2] = "Mallory"; // 오류!









// # 클래스 타입

/**
 * 가장 일반적인 방법
 * C#이나 Java의 인터페이스처럼 메서드를 인터페이스 안에서도 기술할 수 있음
 * implements를 상속 받아 클래스를 생성할 수 있음
 * 인터페이스는 public과 private 모두를 기술하기보다, public을 기술함
 * 클래스 인스턴스의 private에서는 특정 타입이 있는지 검사할 수 없음
 */

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

// 클래스의 스태틱과 인스턴스의 차이점

/**
 * 클래스는 두 가지 타입을 가짐: 1. Static 타입, 2. instance 타입
 * 생성 시그니처 (construct signature)로 인터페이스를 생성하고, 클래스를 생성하려고 한다면, 
 * 인터페이스를 implements 할 때, 에러가 발생
 * 클래스가 인터페이스를 implements 할 때, 클래스의 인스턴스만 검사하기 때문
 * 생성자가 스태틱이기 때문에, 이 검사에 포함되지 않음
 */

// interface ClockConstructor1 {
//     new (hour: number, minute: number);
// }

// class Clock1 implements ClockConstructor1 { // -> Clock1 에러, Type 'Clock1' provides no match for the signature 'new (hour: number, minute: number): any'.ts(2420)
//     currentTime: Date;
//     constructor(h: number, m: number) { }
// }

/**
 * 해결 방법1
 * 클래스의 스태틱 부분을 직접적으로 다룸
 * ClockConstructor 인터페이스는 생성자를 정의
 * ClockInterface 인터페이스는 인스턴스 메서드를 정의
 * 편의를 위해, 전달된 타입의 인스턴스를 생성하는 createClock 생성자 함수를 정의
 */

interface ClockConstructor2 {
    new (hour: number, minute: number): ClockInterface2;
}
interface ClockInterface2 {
    tick(): void;
}

function createClock2(ctor: ClockConstructor2, hour: number, minute: number): ClockInterface2 {
    return new ctor(hour, minute);
}

class DigitalClock2 implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock2 implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock2(DigitalClock2, 12, 17);
let analog = createClock2(AnalogClock2, 7, 32);

/**
 * 해결 방법2
 * 클래스 표현을 사용
 */

interface ClockConstructor3 {
    new (hour: number, minute: number);
  }
  
  interface ClockInterface3 {
    tick();
  }
  
  const Clock3: ClockConstructor3 = class Clock3 implements ClockInterface3 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
  }



// 