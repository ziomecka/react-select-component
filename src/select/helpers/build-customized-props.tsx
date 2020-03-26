import { merge, cloneDeep } from 'lodash-es';

import { defaultProps, defaultStyles, defaultTheme } from '../defaults/';

// Merge components' props with theme and components' style props
export const buildCustomizedProps: BuildCustomizedProps = (
  componentsProps = defaultProps,
  componentsStyles = defaultStyles,
  theme = defaultTheme,
) => {
  const customizedProps: ComponentsPropsMap = new Map();

  defaultProps.forEach((defaults, component) => {
    const { isThemed, ...otherProps } = cloneDeep(
      componentsProps.get(component) || defaults,
    );
    const style =
      componentsStyles.get(component) || defaultStyles.get(component);

    const withThemeProps = isThemed
      ? merge(otherProps, { style: theme })
      : otherProps;

    const withStyleProps = merge(withThemeProps, { style });

    customizedProps.set(component, withStyleProps);
  });

  return customizedProps;
};

type BuildCustomizedProps = (
  componentsProps: ComponentsPropsMap,
  componentsStyles: ComponentsStyles,
  themeStyle: Theme,
) => ComponentsPropsMap;
