import { PicGo } from 'picgo';
declare const _default: (ctx: PicGo) => {
    register: () => void;
    config: (ctx: any) => ({
        name: string;
        type: string;
        alias: string;
        message: string;
        required: boolean;
        default?: undefined;
    } | {
        name: string;
        type: string;
        alias: string;
        message: string;
        default: string;
        required: boolean;
    })[];
};
export = _default;
