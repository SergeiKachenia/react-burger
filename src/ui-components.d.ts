import React, { SyntheticEvent } from 'react';
export declare const Button: React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children?: any;
}>;

export declare const Tab: React.FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children?: any;
}>;