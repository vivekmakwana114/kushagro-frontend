import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 50,
    objectFit: "contain",
  },
  headerSubTitle: {
    fontSize: 10,
    color: "#6B7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  col: {
    flexGrow: 1,
  },
  label: {
    width: 100,
    color: "#6B7280",
    fontSize: 10,
  },
  value: {
    color: "#111827",
    fontSize: 10,
    fontWeight: "medium",
  },
  gridTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  addressBlock: {
    width: "48%",
  },
  addressName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  addressText: {
    fontSize: 10,
    color: "#4B5563",
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#F3F4F6",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  tableCell: {
    fontSize: 10,
    color: "#4B5563",
  },
  totalsSection: {
    marginTop: 20,
    alignSelf: "flex-end",
    width: "50%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  totalLabel: {
    fontSize: 10,
    color: "#4B5563",
  },
  totalValue: {
    fontSize: 10,
    color: "#111827",
    fontWeight: "bold",
    textAlign: "right",
  },
  finalTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#111827",
  },
  finalTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  finalTotalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
});

const OrderInvoicePDF = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Image
          style={styles.logo}
          src="/assets/logo/KushAgro.png"
          alt="KushAgro Logo"
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>INVOICE</Text>
          <Text style={styles.headerSubTitle}>
            #{order.invoice?.invoiceId || order.orderId}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.headerSubTitle}>Date: {order.date}</Text>
          <Text style={styles.headerSubTitle}>Status: {order.status}</Text>
          <Text style={styles.headerSubTitle}>
            Payment Method: {order.paymentMethod}
          </Text>
          <Text style={styles.headerSubTitle}>
            Payment Status: {order.invoice?.paymentStatus}
          </Text>
          <Text style={styles.headerSubTitle}>
            Transaction ID: {order.transactionId}
          </Text>
        </View>
      </View>

      {/* Cancellation Reason (if applicable) */}
      {order.cancellationReason && (
        <View
          style={[
            styles.section,
            { padding: 10, backgroundColor: "#FEF2F2", borderRadius: 4 },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: "#BC0D10", borderBottomWidth: 0, marginBottom: 4 },
            ]}
          >
            Cancellation Reason
          </Text>
          <Text style={{ fontSize: 10, color: "#991B1B" }}>
            {order.cancellationReason}
          </Text>
        </View>
      )}

      {/* Bill To / Seller Info */}
      <View style={[styles.section, styles.gridTwo]}>
        <View style={styles.addressBlock}>
          <Text style={styles.sectionTitle}>Buyer (Bill To)</Text>
          <Text style={styles.addressName}>{order.buyer?.name}</Text>
          <Text style={styles.addressText}>{order.buyer?.email}</Text>
        </View>
        <View style={styles.addressBlock}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <Text style={styles.addressName}>{order.seller?.name}</Text>
          <Text style={styles.addressText}>{order.seller?.email}</Text>
        </View>
      </View>

      {/* Product Details Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text style={styles.tableCellHeader}>Product / Category</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCellHeader}>Quantity</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCellHeader}>Price</Text>
            </View>
            <View
              style={[styles.tableCol, { width: "20%", borderRightWidth: 1 }]}
            >
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>

          {/* Table Body - Single Product assumed based on object structure, map if array */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text style={styles.tableCell}>{order.product?.name}</Text>
              <Text style={{ fontSize: 9, color: "#9CA3AF" }}>
                {order.product?.category}
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>{order.product?.quantity}</Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>{order.product?.price}</Text>
            </View>
            <View
              style={[styles.tableCol, { width: "20%", borderRightWidth: 1 }]}
            >
              <Text style={styles.tableCell}>{order.product?.subtotal}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Item Total</Text>
          <Text style={styles.totalValue}>
            {order.invoice?.itemTotal || order.product?.subtotal}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Taxes</Text>
          <Text style={styles.totalValue}>{order.invoice?.taxes}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Platform Fees</Text>
          <Text style={styles.totalValue}>{order.invoice?.platformFee}</Text>
        </View>
        <View style={styles.finalTotal}>
          <Text style={styles.finalTotalLabel}>Total Payable</Text>
          <Text style={styles.finalTotalValue}>
            {order.invoice?.totalPayable || order.totalAmount}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 60,
          right: 60,
          textAlign: "center",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 10, color: "#9CA3AF" }}>
          Thank you for your business!
        </Text>
        <Text style={{ fontSize: 9, color: "#D1D5DB", marginTop: 5 }}>
          Transaction ID: {order.transactionId}
        </Text>
      </View>
    </Page>
  </Document>
);

export default OrderInvoicePDF;
