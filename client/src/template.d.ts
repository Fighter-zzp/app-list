declare function template(id:string,list:any):any;
declare namespace YDUI{
    namespace dialog{
        function alert(msg:string):void;
    }
}
//jquery 扩展方法声明
declare interface JQuery<TElement = HTMLElement>{
     actionSheet(action:string):void;
}