/// <reference types="vite/client" />

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "rc-form" {
  import { ComponentType } from "react";

  interface FormInstance {
    getFieldProps: (name: string, options?: any) => any;
    getFieldDecorator: (
      name: string,
      options?: any
    ) => (node: React.ReactNode) => React.ReactNode;
    getFieldsValue: (fieldNames?: string[]) => any;
    getFieldValue: (fieldName: string) => any;
    validateFields: (callback: (errors: any, values: any) => void) => void;
    validateFieldsAndScroll: (
      callback: (errors: any, values: any) => void
    ) => void;
    setFieldsValue: (obj: object) => void;
    setFields: (obj: object) => void;
    resetFields: (fieldNames?: string[]) => void;
    isFieldsTouched: (fieldNames?: string[]) => boolean;
    isFieldTouched: (fieldName: string) => boolean;
    isFieldValidating: (fieldName: string) => boolean;
    getFieldError: (fieldName: string) => string[];
    getFieldsError: (fieldNames?: string[]) => object;
  }

  interface FormProps {
    form: FormInstance;
  }

  export function createForm<T>(): (
    component: ComponentType<T & FormProps>
  ) => ComponentType<T>;
  export function createFormField(): any;
}

declare module "react-captcha-code" {
  import { Component } from "react";
  export default class Captcha extends Component<{
    charNum?: number;
    onChange?: (captcha: string) => void;
  }> {}
}

interface Window {
  echarts: any;
}
