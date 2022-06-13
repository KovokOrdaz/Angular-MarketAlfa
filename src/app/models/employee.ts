export class Employee 
{
    static Fill(obj: Employee)
    {
        return new Employee(
            obj['id'],
            obj['name'],
            obj['nationality'],
            obj['dni'],
            obj['dateOfBirth'],
            obj['phone'],
            obj['socialSecurity'],
            obj['job'], 
            obj['input'],
            obj['output'],
            obj['salary'], 
            obj['datePay'],
            obj['status'],
            obj['isUser'],
            obj['date'],
        );
    }

    constructor(
        public id: number, 
        public name: string, 
        public nationality: string, 
        public dni: string, 
        public dateOfBirth: string, 
        public phone: string, 
        public socialSecurity: string, 
        public job: string, 
        public input: string, 
        public output: string, 
        public salary: number, 
        public datePay: number, 
        public status: boolean, 
        public isUser: boolean, 
        public date: string)
    {}
}