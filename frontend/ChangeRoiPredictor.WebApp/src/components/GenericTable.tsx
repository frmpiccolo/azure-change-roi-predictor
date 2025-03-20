import React from 'react';

export interface AdditionalAction<T> {
  label: string;
  className?: string;
  action: (item: T) => void;
}
export interface Column<T> {
  label: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
}

export interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  additionalActions?: AdditionalAction<T>[];
}

const GenericTable = <T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  additionalActions,
}: GenericTableProps<T>) => (
  <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
    <table className="table w-full">
      <thead className="bg-primary text-white">
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          {(onEdit || onDelete) && <th className="text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-base-200">
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(item) : (item[col.key] as any)}
              </td>
            ))}
            <td className="space-x-2">
              {additionalActions?.map((act, idx) => (
                <button
                  key={idx}
                  className={act.className || 'btn btn-xs'}
                  onClick={() => act.action(item)}
                >
                  {act.label}
                </button>
              ))}
              {onEdit && (
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GenericTable;
