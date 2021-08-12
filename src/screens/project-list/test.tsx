import { useEffect, useState } from "react"
//import { useMount } from "utils"

const test = () => {
    let num = 0;
  
    const effect = () => {
        num += 1
        const message = `num value in message：${num}`;
        return function unmount() {
            console.log(message);
            console.log(num);
        }
    }
   return effect
}
//參考影片8-2
// 执行test，返回effect函数
const add = test();

// 执行effect函数，返回引用了message1的unmount函数
const unmount = add();

// 再一次执行effect函数，返回引用了message2的unmount函数
add();

// message3
add();
unmount(); // 在这里message会打印什么呢？按照直觉似乎应该打印3,实际上打印了1 
           //因為unmount()只會執行message1的值,也就是第1次執行的值
           //num確實打印3
           //****結論function1(effect)包含function2(unmount),function1有const(message)或let時function2(unmount)有用到要注意,
           //因為const(message)或let都是一個全新的值,最後調用function2(unmount)時只會使用第一次產生的const(message)的值 ****/
           //hook和function一樣


// react hook 与 闭包，hook 与 闭包经典的坑
export const Test = () => {
    const [num, setNum] = useState(0)
    const  add = () => {
        setNum(num+1)
    }
    
    // useMount(() => {
    //     setInterval(() => {
    //       console.log('num in setInterval:',num)          
    //     },1000)
    // })
    //  useEffect(() => {
    //   const id = setInterval(() => {
    //       console.log('num in setInterval:',num)          
    //     },1000)
    //     return () => clearInterval(id)
    // },[num])

    //重要當useEffect 後面是[] 時代表頁面載入或卸載時觸發,例如切換其他頁面或reflesh
    //但若[num]時表示num改變時觸發
    useEffect(() => {
        console.log(num)
    },[num])

    return <div>
    <button onClick={add}>add</button>
    <p>
        number: {num}
    </p>
   </div>

}

