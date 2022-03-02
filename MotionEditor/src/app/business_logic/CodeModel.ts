export class CodeModel
{
    method: string;
    arguments: Array<number>;

    constructor(method: string, arguments_: Array<number>)
    {
        this.method = method;
        this.arguments = arguments_;
    }
} 