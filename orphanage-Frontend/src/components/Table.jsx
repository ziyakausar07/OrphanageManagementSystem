import React from "react";

const Table = ({ columns, data, actions }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={styles.th}>{col}</th>
          ))}
          {actions && <th style={styles.th}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, cidx) => (
              <td key={cidx} style={styles.td}>
                {row[col.toLowerCase()] ?? row[col]}
              </td>
            ))}
            {actions && <td style={styles.td}>{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20
  },
  th: { border: "1px solid #ddd", padding: 8, textAlign: "left" },
  td: { border: "1px solid #ddd", padding: 8 }
};
