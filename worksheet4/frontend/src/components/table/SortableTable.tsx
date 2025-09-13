import React from "react";

interface SortableTableProps {
  headers: { key: string; label: string }[]; // 表格表头（key：数据字段名，label：显示文本）
  data: any[]; // 表格数据（数组对象）
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table>
    <thead>
      <tr>
        {/* 渲染表头 */}
        {headers.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {/* 渲染表格数据 */}
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td key={header.key}>{row[header.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;