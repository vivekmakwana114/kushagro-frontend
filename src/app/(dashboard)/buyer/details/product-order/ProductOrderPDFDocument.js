import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f4f6", // Light gray background for headers
  },
  tableCol: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
});

const ProductOrderPDFDocument = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Orders</Text>
        <Text style={styles.subtitle}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Order ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Product</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Seller</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>
        </View>

        {/* Table Rows */}
        {orders.map((order, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.product_order_id || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.product?.name || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.seller?.name || "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {order.date_time
                  ? new Date(order.date_time).toLocaleDateString()
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${order.amount || 0}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} Kushagro. All rights reserved.
      </Text>
    </Page>
  </Document>
);

export default ProductOrderPDFDocument;
