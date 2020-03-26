import React, {
  ComponentPropsWithRef,
  FunctionComponent,
  ReactElement,
} from 'react';
import { Components } from '../consts';

const DefaultComponent: (
  element: HTMLTags,
) => FunctionComponent<DefaultComponentPropsWithRef> = element => (
  props,
): ReactElement => {
  const { children = null, forwardedRef, ...otherProps } = props;

  const componentProps = otherProps || {};
  forwardedRef && (componentProps.ref = forwardedRef);

  return React.createElement(element, componentProps, children);
};

export const components = new Map<
  Components,
  FunctionComponent<ComponentsProps>
>([
  [Components.ButtonsContainer, DefaultComponent('div')],
  [Components.ClearButton, DefaultComponent('button')],
  [Components.DropDownButton, DefaultComponent('button')],
  [Components.Input, DefaultComponent('div')],
  [Components.InputContainer, DefaultComponent('div')],
  [Components.Option, DefaultComponent('option')],
  [Components.OptionsContainer, DefaultComponent('div')],
  [Components.OptionGroup, DefaultComponent('optgroup')],
  [Components.Placeholder, DefaultComponent('p')],
  [Components.Select, DefaultComponent('div')],
  [Components.SelectContainer, DefaultComponent('div')],
  [Components.Tag, DefaultComponent('div')],
  [Components.TagClearButton, DefaultComponent('button')],
]);

type DefaultComponentProps = ComponentsProps;

type DefaultComponentPropsWithRef = ComponentPropsWithRef<
  FunctionComponent<
    DefaultComponentProps & { forwardedRef: unknown; ref: unknown }
  >
>;
