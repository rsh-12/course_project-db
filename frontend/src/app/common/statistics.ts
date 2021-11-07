export class Statistics {
    totalRecords!: TotalRecords;
    priceInfo!: PriceInfo;
}

class TotalRecords {
    companies: number = 0;
    students: number = 0;
    contracts: number = 0;
    courses: number = 0;
    instructors: number = 0;
    certificates: number = 0;
}

class PriceInfo {
    min: number = 0;
    avg: number = 0;
    max: number = 0;
    sum: number = 0;
}