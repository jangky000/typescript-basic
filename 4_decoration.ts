// 데코레이션 사용

function Component(constructorFn?: Function){
    /**
     * 클래스를 꾸며주는 로직
     * Component, HTML, CSS
     */
    return constructorFn
}

// tsconfig.json에서 "experimentalDecorators": true, 설정 -> 안됨
// restrict 주석 처리
// tsc 4_decoration.ts --experimentalDecorators "true"
@Component()
class AppComponent{

    // @Input() height: number; // 변수나 함수에도 데코레이션 사용 가능

    constructor(){
        //
    }
}