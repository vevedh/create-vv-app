import type { FormKitSchemaDefinition, FormKitSchemaNode } from '@formkit/core';
import { fieldTypes } from '~/constants';
import { ComponentsTypes } from '~/types';

export function nameExists(
  name: string,
  array: Array<FormKitSchemaDefinition>,
) {
  return array.some(
    (el) => typeof el === 'object' && 'name' in el && el.name === name,
  );
}

export function generateUniqueName(
  name: string,
  formFields: Array<FormKitSchemaDefinition>,
): string {
  const formLength = formFields.length;

  return (
    [...new Array(formLength + 1).keys()]
      .map((counter) => (counter === 0 ? name : `${name}_${counter}`))
      .find((uniqueName) => !nameExists(uniqueName, formFields)) || name
  );
}

export function isEmptyObject(value: any): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  );
}

export function hasOnlyOneKeyWithName(
  obj: Record<string, any>,
  keyName: string,
): boolean {
  const keys = Object.keys(obj);
  return keys.length === 1 && keys[0] === keyName;
}

export function contains(
  input: string | number | any[],
  value: string | number,
): boolean {
  if (
    input === undefined ||
    input === null ||
    value === undefined ||
    value === null
  )
    return false;

  // Handle arrays
  if (Array.isArray(input)) {
    return input.includes(value);
  }

  // Handle strings
  if (typeof input === 'string') {
    return input.includes(String(value)); // Check if the string representation of `value` is in `input`
  }

  // Handle numbers
  if (typeof input === 'number') {
    if (typeof value === 'number') {
      return input === value; // Exact match
    }
    return String(input).includes(String(value)); // Check if `value` as a string is part of `input`
  }

  return false;
}

export function getTypesBasedOnFieldType(
  fieldType: ComponentsTypes,
): { label: string; value: string }[] {
  if (!fieldType) return [];

  return fieldTypes[fieldType] || [];
}

export function getLengthLimitsFromValidation(
  validation: string | { if: string; then: string; else: string },
  startsWith: string,
): { min?: number | string; max?: number | string; exact?: number | string } {
  if (!validation) return { min: '', max: '', exact: '' };

  // Determine the validation rule to use based on the type of validation
  const validationRule =
    typeof validation === 'string' ? validation : validation.then;

  // Find the specific rule that starts with the given prefix
  const rule = validationRule
    .split('|')
    .find((rule) => rule.startsWith(`${startsWith}:`));

  // If the rule is found, process it
  if (rule) {
    const extracted = rule.replace(`${startsWith}:`, '');

    if (startsWith !== 'length' && startsWith !== 'between')
      return { [startsWith]: extracted };

    // For length rules, extract the min and max values
    const [min, max] = extracted.split(',').map(Number);

    // If min and max are the same, return as exact length
    if (min === max) {
      return { min: '', max: '', exact: min };
    }

    // Otherwise, return the min and max values
    return { min, max, exact: '' };
  }

  // Return empty values if no matching rule is found
  return { min: '', max: '', exact: '' };
}
