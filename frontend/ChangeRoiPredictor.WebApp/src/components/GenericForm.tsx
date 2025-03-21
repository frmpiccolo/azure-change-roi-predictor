import React, { ReactNode, FormEvent } from 'react';

export interface FormField {
  name: string;
  type: 'string' | 'number' | 'date' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface GenericFormProps<T> {
  fields: FormField[];
  initialData: T;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  buttonLabel: string;
  children?: ReactNode;
}

const GenericForm = <T,>({
  fields,
  initialData,
  onChange,
  onSubmit,
  buttonLabel,
  children,
}: GenericFormProps<T>) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== 'select' ? (
            <input
              type={field.type}
              name={field.name}
              value={initialData[field.name as keyof T] as string}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="input input-bordered w-full"
              required={field.required}
            />
          ) : (
            <select
              name={field.name}
              value={initialData[field.name as keyof T] as string}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="select select-bordered w-full"
              required={field.required}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary md:col-span-2">
        {buttonLabel}
      </button>
      {children}
    </form>
  );
};

export default GenericForm;
