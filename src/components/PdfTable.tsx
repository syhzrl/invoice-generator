import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import Inter from '../assets/fonts/Inter-Regular.ttf';
import InterBold from '../assets/fonts/Inter-Bold.ttf';
import { IInvoiceTable } from '../entities/invoice';

Font.register({ family: 'Inter', src: Inter });
Font.register({ family: 'InterBold', src: InterBold });

const styles = StyleSheet.create({
    columnTitle: {
        fontSize: 12,
        fontFamily: 'InterBold',
    },
    columnDesc: {
        fontSize: 12,
        color: '#5E6470',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    smallColumn: {
        width: '13.3333%',
        paddingTop: 6,
        paddingBottom: 6,
    },
    bigColumn: {
        width: '60%',
        paddingTop: 6,
        paddingBottom: 6,
    },
    bottomRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        borderTop: '1px solid #D7DAE0',
        marginTop: 18,
    },
    totalsRow: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: '1px solid #D7DAE0',
    },
});

const PdfTableRow: FunctionComponent<IInvoiceTable> = (props: IInvoiceTable) => {
    const {
        title,
        description,
        quantity,
        rate,
    } = props;

    return (
        <View
            style={styles.row}
        >
            <View
                style={{ ...styles.bigColumn, display: 'flex', flexDirection: 'column', gap: 4 }}
            >
                <Text style={styles.columnTitle}>
                    {title}
                </Text>

                <Text style={styles.columnDesc}>
                    {description}
                </Text>
            </View>

            <View
                style={styles.smallColumn}
            >
                <Text style={styles.columnDesc}>
                    {quantity}
                </Text>
            </View>

            <View
                style={styles.smallColumn}
            >
                <Text style={styles.columnDesc}>
                    {rate}
                </Text>
            </View>

            <View
                style={styles.smallColumn}
            >
                <Text style={styles.columnDesc}>
                    {quantity * rate}
                </Text>
            </View>
        </View>
    );
};

interface PdfTableProps {
    tableData: IInvoiceTable[];
    subTotal: number;
    tax: number;
    total: number;
}

const PdfTable: FunctionComponent<PdfTableProps> = (props: PdfTableProps) => {
    const { tableData, subTotal, tax, total } = props;

    return (
        <>
            <View
                style={{ ...styles.row, marginTop: 18, borderBottom: '1px solid #D7DAE0' }}
            >
                <View
                    style={styles.bigColumn}
                >
                    <Text style={styles.columnTitle}>
                        Service
                    </Text>
                </View>

                <View
                    style={styles.smallColumn}
                >
                    <Text style={styles.columnTitle}>
                        Qty
                    </Text>
                </View>

                <View
                    style={styles.smallColumn}
                >
                    <Text style={styles.columnTitle}>
                        Rate
                    </Text>
                </View>

                <View
                    style={styles.smallColumn}
                >
                    <Text style={styles.columnTitle}>
                        Line Total
                    </Text>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column' }}>
                {tableData.map(item => {
                    const { id, title, description, quantity, rate } = item;

                    return (
                        <PdfTableRow
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            quantity={quantity}
                            rate={rate}
                        />
                    );
                })}
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.totalsRow}>
                    <Text style={styles.columnTitle}>
                        Subtotal
                    </Text>

                    <Text style={styles.columnDesc}>
                        {subTotal}
                    </Text>
                </View>

                <View style={styles.totalsRow}>
                    <Text style={styles.columnTitle}>
                        Tax(%)
                    </Text>

                    <Text style={styles.columnDesc}>
                        {tax}
                    </Text>
                </View>

                <View style={styles.totalsRow}>
                    <Text style={styles.columnTitle}>
                        Total
                    </Text>

                    <Text style={styles.columnDesc}>
                        {total}
                    </Text>
                </View>

                <View style={{ ...styles.totalsRow, borderTop: '2px solid #7C4DFF', borderBottom: '2px solid #7C4DFF' }}>
                    <Text style={styles.columnTitle}>
                        Amount Due
                    </Text>

                    <Text style={styles.columnDesc}>
                        {total}
                    </Text>
                </View>
            </View>
        </>
    );
};

export default PdfTable;
