function demo1 (a,b){
    return a + b;
}

function demo2 (a,b){
    return a * b;
}

function demo3 (a,b){
    return a - b;
};

let obj = {
    name:'zly',
    age:22
}

// 统一暴露
export {obj as newObj};
export {demo1,demo2,demo3};