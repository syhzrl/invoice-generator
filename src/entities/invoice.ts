export interface IInvoice {
    billedTo: string;
    from: string;
    issuedDate: Date;
    dueDate: Date;
    tableData: IInvoiceTable[];
    subTotal: number;
    tax: number;
    total: number;
    extraDesc: string;
    accountName: string;
    bankName: string;
    accountNo: string;
}

export interface IInvoiceTable {
    id: string;
    title: string;
    description: string;
    quantity: number;
    rate: number;
}
