export function textSlicer (text:string, max:number=70){
    if(text.length > max) return `${text.slice(0,max) }...` 
    else text
}
export function numberWithCommas(x: string): string {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }