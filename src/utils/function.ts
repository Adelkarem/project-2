export function textSlicer (text:string, max:number=70){
    if(text.length > max) return `${text.slice(0,max) }...` 
    else text
}