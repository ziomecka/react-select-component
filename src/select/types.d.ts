type HTMLAttributes<T> = import('react').HTMLAttributes<T>;
type CSSProperties = import('react').CSSProperties;
type RefObject<T = unknown> = import('react').RefObject<T>;

declare type Components = import('./consts').Components;
declare type StateKeys = import('./consts').StateKeys;

declare type HTMLTags =
  | 'button'
  | 'div'
  | 'input'
  | 'label'
  | 'optgroup'
  | 'option'
  | 'p'
  | 'select';

type AdditionalProps = Partial<{
  stateStyles: Partial<Record<StateKeys, CSSProperties>>;
  stateClassNames: Partial<Record<StateKeys, string>>;
  isThemed: boolean;
  forwardedRef: RefObject;
  // TODO should be only on select
  disabled: boolean;
}>;

type Props<T = HTMLElement> = Omit<HTMLAttributes<T>, 'style'> &
  AdditionalProps;

declare type ButtonsContainerProps<T = HTMLElement> = Props<T>;
declare type ClearButtonProps<T = HTMLButtonElement> = Props<T>;
declare type DropDownButtonProps<T = HTMLButtonElement> = Props<T>;
declare type InputProps<T = HTMLElement> = Props<T>;
declare type InputContainerProps<T = HTMLElement> = Props<T>;
declare type LabelProps<T = HTMLLabelElement> = Props<T>;
declare type OptionProps<T = HTMLOptionElement> = Props<T>;
declare type OptionGroupProps<T = HTMLElement> = Props<T>;
declare type OptionsContainerProps<T = HTMLElement> = Props<T>;
declare type PlaceholderProps<T = HTMLElement> = Props<T>;
declare type SelectProps<T = HTMLSelectElement> = Props<T>;
declare type SelectContainerProps<T = HTMLElement> = Props<T>;
declare type TagProps<T = HTMLElement> = Props<T>;
declare type TagClearButtonProps<T = HTMLButtonElement> = Props<T>;

declare type Theme = Partial<{
  padding: string | number;
  borderRadius: string | number;
  borderColor: string;
  borderWidth: string | number;
}>;

declare type ComponentsPropsMap = Map<Components, Partial<ComponentsProps>>;
declare type ComponentsStyles = Map<Components, CSSProperties>;

declare interface SelectComponentProps {
  options: string[];
  value?: string[];
  clearable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  tagClearable?: boolean;
  optionsHeight?: string;
  placeholder?: string;
  components?: Map<Components, React.FunctionComponent<ComponentsProps>>;
  componentsProps?: ComponentsPropsMap;
  componentsStyles?: ComponentsStyles;
  theme?: Theme;
  label?: string;
}

declare type ComponentsProps =
  | ButtonsContainerProps
  | ClearButtonProps
  | DropDownButtonProps
  | InputProps
  | InputContainerProps
  | OptionProps
  | OptionsContainerProps
  | OptionGroupProps
  | PlaceholderProps
  | SelectProps
  | SelectContainerProps
  | TagProps
  | TagClearButtonProps;

declare type EventHandler<T = HTMLElement> = React.EventHandler<
  React.MouseEvent<T>
>;
