export const isFalsy = (value) => value === 0 ? false : !value

//在一個函數裡,改變傳入的對象是不好的,在這裡把它copy一份給result
export const clearnObject = (object) => {
   // Object.assign({},object)
    const result = {...object}
    Object.keys(result).forEach(key => {
        // value= 0 時也會delete .但他是有效數字,我們不想刪除
        const value = result[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
  return result
}