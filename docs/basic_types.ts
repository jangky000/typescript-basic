// 공식 문서 상의 기본 타입 정리

/*
    number, string, boolean, object and symbol 타입 소문자 사용
    (use the types number, string, boolean, object and symbol)
*/

/*
    1. 기본 자료형 Primitive Type (javaScript)
        1. boolean
        2. number
        3. string, Template String
        4. undefined & null
    2. 참조타입 (javaScript)
        1. Array
        2. symbol
    3. 타입스크립트에서 추가로 제공하는 타입
        1. tuple
        2. enum
        3. unknown
        4. any 
        5. void
        6. never

*/


//=====================================================================================================


// boolean 타입
let isDone: boolean = false;

/*
    소문자 boolean 과 대문자 Boolean
    소문자 boolean 은 프리미티브 타입의 불린 , 대문자 Boolean 은 Wrapper 오브젝트의 생성자 class
    자바스크립트에서는 두 가지의 차이가 크게 없지만, 타입스크립트에서는 소문자를 권장
    ‘boolean’ is a primitive, but ‘Boolean’ is a wrapper object.
    Prefer using ‘boolean’ when possible.
*/


//=====================================================================================================

// number 타입
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n; // tsconfis.json -> "target": "es2020" 이상이 되어야 사용 가능함

/*
    JavaScript의 Number는 부동 소수점으로 표시됨 -> 이는 정밀도가 제한적
    Number.MAX_SAFE_INTEGER 상수는 안전하게 증가 할 수있는 가능한 최대 정수를 제공 =  2 ** 53-1

    BigInt를 사용하면 오버플로없이 정수 연산을 올바르게 수행 할 수 있다.
    BigInt는 임의의 정밀도로 정수를 나타낼 수있는 JavaScript의 새로운 숫자 데이터 형 
    BigInt를 사용하면 숫자에 대한 안전한 정수 제한을 초과하여 큰 정수를 안전하게 저장하고 조작 할 수 있다. 
    BigInt를 만들려면 모든 정수 리터럴에 n 접미사를 추가
*/

//=====================================================================================================

// string 타입

/*
    "", '' 모두 사용 가능
*/

let color: string = "blue";
color = 'red';

// template strings
/*
    backtick/backquote (`) 사용
    multiple lines를 표현 가능하다.
    embedded expressions: ${ expr }을 `` 내부에서 사용 가능하다.
*/
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

//=====================================================================================================

// Array 타입
/* 
    두 가지 방식으로 사용 가능
    1. 기본 타입 + []: number[]
    2. Array 타입(첫자 대문자) + 제네릭<>: Array<number>
 */
let list: number[] = [1, 2, 3];
// 또는 let list: Array<number> = [1, 2, 3];

//=====================================================================================================

// Tuple 타입
/*
    튜플: 타입이 정해진 n개로 고정된 배열
*/

// Declare a tuple type
let x: [string, number];

// example 1
/*
    선언된 타입에 맞게 초기화 할 수 있다.
*/

// Initialize it
x = ["hello", 10]; // OK

// Initialize it incorrectly
// x = [10, "hello"]; // Error
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.

// example 2
/*
    해당 인덱스의 타입에 따라 내장 메소드를 검증할 수 있다.
*/

// OK
console.log(x[0].substring(1));

// console.log(x[1].substring(1));
// Property 'substring' does not exist on type 'number'.

// example 3
/*
    인덱스 집합 외부 요소 접근 시 오류 발생한다.
*/

// x[3] = "world";
// Tuple type '[string, number]' of length '2' has no element at index '3'.

// console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.

//=====================================================================================================

// Enum 타입
/*
    열거형
    열거 형은 숫자 값 집합에 더 친숙한 이름을 제공하는 방법
    디폴트로 멤버의 시작 number는 0부터 시작한다.
    enum 멤버에 직접 값을 선언함으로 시작 number를 바꿀 수 있다.
*/

// ex 1
enum Color {
    Red,
    Green,
    Blue,
  }
let c: Color = Color.Green;

// ex 2
enum Color2 {
    Red = 1,
    Green,
    Blue,
  }
let colorName: string = Color2[2];

// Displays 'Green'
console.log(colorName);

//=====================================================================================================

// unknown 타입

/*
  응용 프로그램을 작성할 때 모르는 변수 유형을 사용할 수도 있다.
  이러한 값은 동적 콘텐츠 (예 : 사용자)에서 가져 오거나 API의 모든 값을 의도적으로 받을 수도 있다.
  이 경우 컴파일러와 미래의 독자에게이 변수가 무엇이든 될 수 있음을 알려주는 유형을 제공하기 위해 
  unknown 타입을 사용
*/

// example 1
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;

// example 2
// typeof 검사를 통해 unknown를 사용할 수 있음
declare const maybe: unknown;

if (typeof maybe === "string") {
    // TypeScript knows that maybe is a string
    const aString: string = maybe;
    // So, it cannot be a boolean
    // const aBoolean: boolean = maybe;
//   Type 'string' is not assignable to type 'boolean'.
  }

//=====================================================================================================

// any 타입

/*
    모든 타입
    최대한 쓰지 않는 것을 추천
    그 이유는 컴파일 타임에 타입 체크가 정상적으로 이뤄지지 않기 때문
    컴파일 옵션 중 any 를 쓰면 오류를 뱉도록 하는 옵션 = noImplicitAny
*/

// ex1
// declare 키워드는 타입스크립트 컴파일러에게 특정한 변수가 있다고 선언하는 키워드
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");

// ex2
/*
  looselyTyped 변수는 number 타입이기 때문에 toFixed 메소드를 사용할 수 있다.
  컴파일러 단계에서 any 타입의 속성 메소드를 체크하지 않는다. = 자바스크립트 변수와 같다.
  반면 unknown 타입은 엄격하게 검사한다. -> 해당 타입의 변수로 할당해서 속성 메소드를 사용해야 한다.
*/
let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
// strictlyTyped.toFixed();
// Object is of type 'unknown'.

//=====================================================================================================

// void 타입

/*
  any의 반대 타입
  주로 함수의 리턴이 없을 때 사용
  변수에 타입으로 void를 사용하는 것은 유용하지 않다. 
  그 이유는 그 변수에는 null 또는 undefined만 할당 가능하기 때문이다.( --strictNullChecks 옵션일 때)
*/

function warnUser(): void {
    console.log("This is my warning message");
}

//=====================================================================================================

// null and undefined 타입

/*
    선언에 유용하지는 않음
    이 밖에 이 변수들에 할당할 수 있는 값이 없음
    null 과 undefined는 다른 모든 타입의 하위 타입
    --strictNullChecks를 사용하면, null과 undefined는 오직 any와 각자 자신들 타입에만 할당 가능
    가능한 경우 --strictNullChecks를 사용할 것을 권장
*/

let u: undefined = undefined;
let n: null = null;

//=====================================================================================================

// never 타입

/*
    never 타입은 절대 발생할 수 없는 타입을 나타냅니다.
    주로 함수 리턴에 사용됨
    error 관련
    무한 루프 관련
    예를 들어, never는 
        함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 
        절대 반환하지 않는 반환 타입으로 쓰입니다.
    never타입은 모든 타입에 할당 가능한 하위 타입입니다. 
    하지만 어떤 타입도 never에 할당할 수 있거나, 하위 타입이 아닙니다.(never 자신은 제외) 
    심지어 any 도 never에 할당할 수 없습니다.
*/

// Function returning never must not have a reachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
    while (true) {}
}

//=====================================================================================================

// object 타입

/*
    object는 원시 타입이 아닌 타입을 말함
    예를 들어, number, string, boolean, bigint, symbol, null, 또는 undefined 가 아닌 나머지를 의미
*/
declare function create(o: object | null): void;

create({ prop: 0 }); // 성공
create(null); // 성공

// create(42); // 오류
// create("string"); // 오류
// create(false); // 오류
// create(undefined); // 오류 // Remember, undefined is a subtype of null

//=====================================================================================================

// Type assertions: 타입 단언

/*
    타입 단언은 다른 언어의 타입 변환(형 변환)과 유사하지만, 
    다른 특별한 검사를 하거나 데이터를 재구성하지는 않음 -> 실제 형변환이 일어나지 않음 
    이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용

    2가지 방식
    1. "angle-bracket" 문법
    2. as-문법
*/

// ex1
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// ex2
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;