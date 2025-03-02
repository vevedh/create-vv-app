import type { FormKitSchemaNode } from '@formkit/core';

export interface ElementType {
  type: string;
  inputType?: string;
  label?: string;
  description?: string;
  rules?: string[];
  autocomplete?: string;
  allowIncomplete?: boolean;
  unmask?: boolean;
  placeholder?: string;
  floating?: boolean;
  text?: string;
  items?: Array<{
    value: number | string;
    label: string;
    description?: string;
  }>;
  view?: string;
  search?: boolean;
  native?: boolean;
  closeOnSelect?: boolean;
  time?: boolean;
  date?: boolean;
  mode?: string;
  default?: number | string | number[] | File | File[];
  orientation?: string;
  accept?: string;
  file?: { rules?: string[] };
}

export type ColumnsType = {
  container?: number | null;
  default?: { container: number } | null;
  sm?: { container: number } | null;
  lg?: { container: number } | null;
};

export type FormSettingsType = {
  formName?: string;
  preview: { width?: string | number | null; isFullWidth: boolean };
  previewMode: 'editing' | 'previewing';
  columns: FormViewportType;
};

export type ActiveFieldType =
  | (FormKitSchemaNode & { columns: ColumnsType })
  | null;

export type FormViewportType = 'default' | 'sm' | 'lg';

export type LogicField = {
  name: string;
  operator: string;
  value: string;
  values: string[];
  or?: LogicField[] | null;
};

export type ComponentsTypes = 'q-input' | undefined;
