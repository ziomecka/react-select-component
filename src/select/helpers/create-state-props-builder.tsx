import { merge, cloneDeep } from 'lodash-es';

// If component,
// is in one of states: isMultiple, isOpen, isSelected, isClearable (StateKeys)
// then merge component's props with component's state's classnames and styles.
export const createStatePropsBuilder: (
  customizedProps: ComponentsPropsMap,
) => CreateStatePropsBuilder = customizedProps => (
  component,
  key,
): StatePropsBuilder => {
  const props = cloneDeep(customizedProps.get(component)) || {
    style: {},
  };

  const {
    stateClassNames = {},
    stateStyles = {},
    style = {},
    ...otherProps
  } = props;

  const stateClassName = stateClassNames[key] || '';
  const stateStyle = stateStyles[key] || {};

  const result: StatePropsBuilder = isState => {
    const { className: actualClassName = '' } = customizedProps.get(component);

    const className = (isState
      ? `${actualClassName} ${stateClassName}`
      : actualClassName.replace(stateClassName, '')
    ).trim();

    customizedProps.get(component).className = className;

    return {
      ...otherProps,
      ...(className ? { className: className } : {}),
      style: isState ? merge(style, stateStyle) : style,
    };
  };

  return result;
};

type StatePropsBuilder = (isState?: boolean) => ComponentsProps;

type CreateStatePropsBuilder = (
  component: Components,
  key?: StateKeys,
) => StatePropsBuilder;
