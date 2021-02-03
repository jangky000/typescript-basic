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

let myObj = {size: 10, label: "Size 10 Object"};
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





// 초과 프로퍼티 검사 인터페이스

/**
 * 인터페이스의 첫 번째 기본 예제에서 { label: string; }을 기대해도 { size: number; label: string; }를 허용
 * 
 */




//





//





