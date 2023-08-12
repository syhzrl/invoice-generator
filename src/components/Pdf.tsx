import React, { FunctionComponent } from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

import { format } from 'date-fns';
import Inter from '../assets/fonts/Inter-Regular.ttf';
import InterBold from '../assets/fonts/Inter-Bold.ttf';
import { IInvoice } from '../entities/invoice';
import PdfTable from './PdfTable';

Font.register({ family: 'Inter', src: Inter });
Font.register({ family: 'InterBold', src: InterBold });

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 48,
        gap: 18,
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 27,
        fontFamily: 'InterBold',
        color: 'black',
    },
    invoiceId: {
        fontSize: 12,
        color: '#5E6470',
    },
    topRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '1px solid #D7DAE0',
        borderBottom: '1px solid #D7DAE0',
    },
    topRowColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    topRowColumnTitle: {
        fontSize: 12,
        fontFamily: 'InterBold',
    },
    topRowColumnDesc: {
        fontSize: 12,
        color: '#5E6470',
    },
});

interface PdfDocumentProps {
    data: IInvoice;
}

// 1 rem = 12 pt

const PdfDocument: FunctionComponent<PdfDocumentProps> = (props: PdfDocumentProps) => {
    const { data } = props;

    const { issuedDate, dueDate, from, billedTo, tableData, subTotal, tax, total } = data;

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Text style={styles.title}>
                        INVOICE
                    </Text>

                    <Text style={styles.invoiceId}>
                        #AB2324-01
                    </Text>
                </View>

                <View style={styles.topRow}>
                    <View
                        style={{
                            width: '33.333333%',
                            paddingTop: 12,
                            paddingBottom: 12,
                            gap: 18,
                        }}
                    >
                        <View
                            style={styles.topRowColumn}
                        >
                            <Text
                                style={styles.topRowColumnTitle}
                            >
                                Issued
                            </Text>

                            <Text
                                style={styles.topRowColumnDesc}
                            >
                                {format(issuedDate, 'dd MMM, yyyy')}
                            </Text>
                        </View>

                        <View
                            style={styles.topRowColumn}
                        >
                            <Text style={styles.topRowColumnTitle}>
                                Due
                            </Text>

                            <Text style={styles.topRowColumnDesc}>
                                {format(dueDate, 'dd MMM, yyyy')}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: '33.333333%',
                            padding: 12,
                            borderLeft: '1px solid #D7DAE0',
                            borderRight: '1px solid #D7DAE0',
                            gap: 3,
                        }}
                    >
                        <Text style={styles.topRowColumnTitle}>
                            Billed to
                        </Text>

                        <Text style={styles.topRowColumnDesc}>
                            {billedTo}
                        </Text>
                    </View>

                    <View style={{ width: '33.333333%', padding: 12, gap: 3 }}>
                        <Text style={styles.topRowColumnTitle}>
                            From
                        </Text>

                        <Text style={styles.topRowColumnDesc}>
                            {from}
                        </Text>
                    </View>
                </View>

                <PdfTable
                    tableData={tableData}
                    subTotal={subTotal}
                    tax={tax}
                    total={total}
                />
            </Page>
        </Document>
    );
};

export default PdfDocument;
