import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// --- CSV Download ---
export const downloadCSV = (data, columns, filename = "data") => {
  if (!data || !data.length) {
    console.warn("No data to download");
    return;
  }

  const headers = columns.map((col) => col.title).join(",");
  const rows = data.map((row) =>
    columns
      .map((col) => {
        let value = row[col.key];

        if (typeof value === "object" && value !== null) {
          if (value.name) return `"${value.name}"`;
          return "";
        }

        return `"${String(value || "").replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- PDF Download ---
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 5, fontSize: 8 },
  header: { fontWeight: "bold", backgroundColor: "#f0f0f0" },
  title: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});

const MyDocument = ({ data, columns, title }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <Text style={styles.title}>{title}</Text>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableRow}>
          {columns.map((col, index) => (
            <View
              style={[
                styles.tableCol,
                styles.header,
                { width: `${100 / columns.length}%` },
              ]}
              key={index}
            >
              <Text style={styles.tableCell}>{col.title}</Text>
            </View>
          ))}
        </View>
        {/* Rows */}
        {data.map((row, rowIndex) => (
          <View style={styles.tableRow} key={rowIndex}>
            {columns.map((col, colIndex) => {
              let value = row[col.key];
              // Basic object handling similar to CSV
              if (typeof value === "object" && value !== null) {
                if (value.name) value = value.name;
                else value = "";
              }

              return (
                <View
                  style={[
                    styles.tableCol,
                    { width: `${100 / columns.length}%` },
                  ]}
                  key={colIndex}
                >
                  <Text style={styles.tableCell}>{String(value || "")}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const downloadPDF = async (data, columns, filename = "data") => {
  if (!data || !data.length) return;

  const blob = await pdf(
    <MyDocument data={data} columns={columns} title={filename} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
