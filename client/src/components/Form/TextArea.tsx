import {
  TextareaProps as ChakraTextareaProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  Textarea as ChakraTextarea,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

import { capitalize } from '../../util/capitalize';

const allowed_types = ['text'] as const;

type AllowedTypes = (typeof allowed_types)[number];

export interface TextAreaProps extends Omit<ChakraTextareaProps, 'type'> {
  label?: string;
  noLabel?: boolean;
  error?: string;
  name: string;
  type?: AllowedTypes | string;
  outerProps?: FormControlProps;
}

export const TextArea = forwardRef<any, TextAreaProps>((props, ref) => {
  const {
    name,
    isInvalid,
    isRequired,
    label,
    placeholder,
    outerProps,
    noLabel,
    ...rest
  } = props;

  return (
    <FormControl
      isInvalid={isInvalid || !!props.error}
      isRequired={isRequired}
      {...outerProps}
    >
      {!noLabel && (
        <FormLabel htmlFor={name}>{label || capitalize(name)}</FormLabel>
      )}
      <ChakraTextarea
        id={name}
        name={name}
        ref={ref as any}
        isRequired={isRequired}
        placeholder={placeholder || label || capitalize(name)}
        {...rest}
      />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
  );
});
