import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface EmployeeI {
    EmployeeID: number;
    LastName: string;
    FirstName: string;
    Title: string;
    TitleOfCourtesy: string;
    BirthDate: string;
    HireDate: string;
    Address: string;
    City: string;
    Region: string | null;
    PostalCode: number | string;
    Country: string;
    HomePhone: string;
    Extension: number;
    Notes: string;
    ReportsTo: number | null;
}

export const employeesParse = async (): Promise<EmployeeI[]> => {
    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Employees.csv');

    return new Promise((resolve, reject) => {
        const records: EmployeeI[] = [];
        let id6UserData = [];
        let id7UserData = [];
        let rowCount = 0

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                rowCount++
                switch (rowCount) {
                    case 1:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region,
                            PostalCode: Number(row.PostalCode),
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: row.Notes.slice(0, -2),
                            ReportsTo: Number(row.Notes.slice(-1))
                        })
                        break
                    case 2:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: `${row.Title},${row.TitleOfCourtesy}`,
                            TitleOfCourtesy: row.BirthDate,
                            BirthDate: row.HireDate,
                            HireDate: row.Address,
                            Address: row.City,
                            City: row.Region,
                            Region: row.PostalCode,
                            PostalCode: Number(row.Country),
                            Country: row.HomePhone,
                            HomePhone: row.Extension,
                            Extension: Number(row.Notes),
                            Notes: `${row.ReportsTo}, ${row._16}, ${row._17}, ${row._18}`,
                            ReportsTo: (Number(row._19) ==  0) ? null : row._19
                        })
                        break
                    case 3:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region,
                            PostalCode: Number(row.PostalCode),
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: row.Notes,
                            ReportsTo: Number(row.ReportsTo)
                        })
                        break
                    case 4:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region,
                            PostalCode: Number(row.PostalCode),
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: row.Notes,
                            ReportsTo: Number(row.ReportsTo)
                        })
                        break
                    case 5:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region == '' ? null : row.Region,
                            PostalCode: row.PostalCode,
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: `${row.Notes},${row.ReportsTo},${row._16},${row._17.slice(0, -2)}`,
                            ReportsTo: Number(row._17.slice(-1))
                        })
                        break
                    case 6:
                        id6UserData.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: `${row.Address}, `,
                        })
                        break
                    case 7:
                        id6UserData[0].Address += `${row.EmployeeID}`
                        id6UserData[0] = ({
                            ...id6UserData[0],
                            City: row.LastName,
                            Region: row.FirstName == '' ? null : row.FirstName,
                            PostalCode: row.Title,
                            Country: row.TitleOfCourtesy,
                            HomePhone: row.BirthDate,
                            Extension: Number(row.HireDate),
                            Notes: `${row.Address},${row.Region},${row.PostalCode},${row.Country.slice(0, -2)}`,
                            ReportsTo: Number(row.Country.slice(-1))
                        })
                        records.push(id6UserData[0])
                        break
                    case 8:
                        id7UserData.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: `${row.Address}, `,
                        })
                        break
                    case 9:
                        id7UserData[0].Address += `${row.EmployeeID}`
                        id7UserData[0] = ({
                            ...id7UserData[0],
                            City: row.LastName,
                            Region: row.FirstName == '' ? null : row.FirstName,
                            PostalCode: row.Title,
                            Country: row.TitleOfCourtesy,
                            HomePhone: row.BirthDate,
                            Extension: Number(row.HireDate),
                            Notes: `${row.Address},${row.City.slice(0, -2)}`,
                            ReportsTo: Number(row.City.slice(-1))
                        })
                        records.push(id7UserData[0])
                        break
                    case 10:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region,
                            PostalCode: Number(row.PostalCode),
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: row.Notes,
                            ReportsTo: Number(row.ReportsTo)
                        })
                        break
                    case 11:
                        records.push({
                            EmployeeID: Number(row.EmployeeID),
                            LastName: row.LastName,
                            FirstName: row.FirstName,
                            Title: row.Title,
                            TitleOfCourtesy: row.TitleOfCourtesy,
                            BirthDate: row.BirthDate,
                            HireDate: row.HireDate,
                            Address: row.Address,
                            City: row.City,
                            Region: row.Region,
                            PostalCode: row.PostalCode,
                            Country: row.Country,
                            HomePhone: row.HomePhone,
                            Extension: Number(row.Extension),
                            Notes: row.Notes,
                            ReportsTo: Number(row.ReportsTo)
                        })
                        break
            }})
            .on('end', () => {
                // console.log(records);
                resolve(records)})
            .on('error', (error) => reject(error));
    });
};
