import {AlignmentType, Document, HeadingLevel, Paragraph, Table, TableCell, TableRow, WidthType,} from "docx";
import {Income} from "../../common/income";
import {TotalRecords} from "../../common/totalRecords";

function createIncomeTable(income: Income[]) {
    return new Table({
        columnWidths: [6005, 3005],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Month")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${income[0].value}`)],
                    }),
                ],
            }),

            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Annual")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${income[1].value}`)],
                    }),
                ],
            }),
        ],
    });
}


function createEntitiesTable(statistics: TotalRecords) {
    return new Table({
        columnWidths: [6005, 3005],
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Companies")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${statistics.companies}`)],
                    }),
                ],
            }),

            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Students")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${statistics.students}`)],
                    }),
                ],
            }),

            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Courses")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${statistics.courses}`)],
                    }),
                ],
            }),

            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph("Instructors")],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${statistics.instructors}`)],
                    }),
                ],
            })
        ],
    });
}

export class DocumentCreator {

    public create(income: Income[], statistics: TotalRecords): Document {
        return new Document({
            styles: {
                default: {
                    heading1: {
                        run: {
                            size: 28,
                            bold: true,
                        }
                    }
                }
            },
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: "Statistics - " + new Date().toLocaleDateString(),
                            alignment: AlignmentType.CENTER,
                            heading: HeadingLevel.HEADING_1
                        }),

                        new Paragraph({text: "Income"}),
                        createIncomeTable(income),

                        new Paragraph({text: ""}),
                        new Paragraph({text: "Entities"}),
                        createEntitiesTable(statistics),
                    ],
                },
            ],

        });
    }
}