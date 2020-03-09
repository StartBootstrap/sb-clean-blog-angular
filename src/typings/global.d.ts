declare global {
        
    interface Dictionary<T> {
        [key: string]: T;
    }

    type Email = string;
    type UUID = string;
    type URLString = string;
    type DateString = string;
    type HASH = string;
    type ISOLang = string;


    interface Error {
        status?: number;
    }
    
}

export {}