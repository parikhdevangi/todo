export class Todo{
    [x: string]: any;
    constructor(
        public text:string,
        public completed:boolean =false
    ){}
    
}