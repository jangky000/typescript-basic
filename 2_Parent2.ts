// 접근 제한자

class Parent2 {
    public one = 10;
    protected two = 10;
    private tree = 10;
    constructor(){
        this.one = 1;
        this.two = 1;
        this.tree = 1;
    }
}

class Child2 extends Parent2 {
    constructor(){
        super();
        this.one = 2;
        this.two = 2;
    }
}

let p = new Parent2();
p.one;
