// Fill in types to satisfy the base import of tns-code-modules.d.ts

interface NativeScriptRequire {
    (id: string): any;
}

interface NativeScriptModule {
    id: string;
    filename: string;
    exports: any;
}
