/* 
模块暴露
*/

export function demo(a,b){
    return a + b;
};

let a = 100;
export {a};

let [b,c,d] = [1,2,3];

export {
    b,
    c,
    d
};

let str = `我是一个字符串需要进行暴露`

export {str as string};
