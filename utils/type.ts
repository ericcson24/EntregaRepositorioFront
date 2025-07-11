export type Character={
    id:string,
    status:string,
    name:string,
    species:string,
    gender:string,
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image:string,
}