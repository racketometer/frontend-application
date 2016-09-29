declare namespace NodeJS {
    export interface Timer {
        ref(): void;
        unref(): void;
    }
}
