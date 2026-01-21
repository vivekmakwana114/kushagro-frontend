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
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#F3F4F6",
  },
  tableCol: {
    width: "11%", // Adjusted for 8 columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    padding: 5,
  },
  tableColLarge: {
    width: "23%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  tableCell: {
    fontSize: 9,
    color: "#4B5563",
  },
  statusBadge: {
    padding: "2 6",
    borderRadius: 4,
    fontSize: 8,
    textAlign: "center",
  },
});

const OrderPDFDocument = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Order Report</Text>
        <Text style={styles.subtitle}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Head */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Order ID</Text>
          </View>
          <View style={styles.tableColLarge}>
            <Text style={styles.tableCellHeader}>Product</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Category</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Buyer</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Seller</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Payment Status</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>
        </View>

        {/* Table Body */}
        {orders.map((order, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.orderId?.value || order.orderNumber || "N/A"}
              </Text>
            </View>
            <View style={styles.tableColLarge}>
              <Text style={styles.tableCell}>
                {order.product?.name || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.product?.category || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.buyer?.name || "N/A"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.seller?.name || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                ${order.amount || order.totalAmount || "0"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.payment_status || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.status || "N/A"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default OrderPDFDocument;
