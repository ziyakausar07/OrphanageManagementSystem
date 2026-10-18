import React from "react";

const formatCellValue = (val) => {
  if (val === null || val === undefined) return "-";
  
  const str = String(val).trim().toLowerCase();
  if (["approved", "active", "completed", "received"].includes(str)) {
    return <span className="badge badge-approved">{val}</span>;
  }
  if (["pending"].includes(str)) {
    return <span className="badge badge-pending">{val}</span>;
  }
  if (["rejected", "inactive"].includes(str)) {
    return <span className="badge badge-rejected">{val}</span>;
  }
  if (["available"].includes(str)) {
    return <span className="badge badge-available">{val}</span>;
  }

  return val;
};

const Table = ({ columns = [], data = [], actions }) => {
  if (!data || data.length === 0) {
    return (
      <div className="empty-table-state">
        <div className="empty-table-icon">📂</div>
        <p className="empty-table-text">No records found to display.</p>
        <style>{`
          .empty-table-state {
            background: #ffffff;
            border: 1px dashed #fdba74;
            border-radius: 16px;
            padding: 40px 20px;
            text-align: center;
            margin-top: 20px;
          }
          .empty-table-icon {
            font-size: 36px;
            margin-bottom: 8px;
          }
          .empty-table-text {
            color: #94a3b8;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
              {actions && <th style={{ textAlign: "right" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, cidx) => {
                  const rawVal = row[col.toLowerCase()] ?? row[col];
                  return (
                    <td key={cidx}>
                      {formatCellValue(rawVal)}
                    </td>
                  );
                })}
                {actions && (
                  <td style={{ textAlign: "right" }}>
                    <div className="action-buttons-wrapper">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .action-buttons-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }
        .action-buttons-wrapper button {
          padding: 6px 14px;
          font-size: 13px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default Table;
