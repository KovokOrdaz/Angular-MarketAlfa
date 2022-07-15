export interface Users
{
    id: number;
    name: string;
    pseudomyn: string;
    password: string;
    privilege: boolean;
    status: boolean;
    salt: string;
    question: string;
    answer: string;
}