import React, { useState, useRef, RefObject } from 'react';
import { merge, memoize } from 'lodash-es';

import { Components, StateKeys } from './consts';
import { buildCustomizedProps, createStatePropsBuilder } from './helpers/';

import { defaultComponents } from './defaults/';

export const SelectComponent: React.FunctionComponent<SelectComponentProps> = props => {
  /**__________________State__________________ */

  type SelectedOptions = Set<string>;
  type ChangeSelectedOptions = (value: string) => SelectedOptions;

  const [selectedOptions, changeSelectedOptions] = useState<SelectedOptions>(
    new Set(props.value),
  );
  const [isOpen, setIsOpen] = useState(false);

  const removeFromSelected: ChangeSelectedOptions = value => {
    const newSelected = new Set(selectedOptions);
    newSelected.delete(value);

    return newSelected;
  };

  const addToSelected: ChangeSelectedOptions = value => {
    const newSelected = new Set(selectedOptions);
    newSelected.add(value);

    return newSelected;
  };

  const isSelected: (value: string) => boolean = value =>
    selectedOptions.has(value);

  /**__________________Props__________________ */

  const {
    options,
    label,
    multiple,
    clearable,
    tagClearable,
    placeholder = '',
    disabled = false,
    theme,
    components = defaultComponents,
    componentsProps,
    componentsStyles,
  } = props;

  const isClearable =
    clearable === undefined
      ? multiple && selectedOptions.size
      : clearable && selectedOptions.size;

  const isTagClearable = tagClearable === undefined ? multiple : tagClearable;

  const selectRef: RefObject<HTMLElement> = useRef(null);

  const customizedProps = buildCustomizedProps(
    componentsProps,
    componentsStyles,
    theme,
  );

  const statePropsBuilder = createStatePropsBuilder(customizedProps);

  /**__________________Components__________________ */

  const ButtonsContainer =
    components.get(Components.ButtonsContainer) ||
    defaultComponents.get(Components.ButtonsContainer);

  const ClearButton =
    components.get(Components.ClearButton) ||
    defaultComponents.get(Components.ClearButton);

  const DropDownButton =
    components.get(Components.DropDownButton) ||
    defaultComponents.get(Components.DropDownButton);

  const Input =
    components.get(Components.Input) || defaultComponents.get(Components.Input);

  const InputContainer =
    components.get(Components.InputContainer) ||
    defaultComponents.get(Components.InputContainer);

  const Label =
    components.get(Components.Label) || defaultComponents.get(Components.Label);

  const Option =
    components.get(Components.Option) ||
    defaultComponents.get(Components.Option);

  const OptionsContainer =
    components.get(Components.OptionsContainer) ||
    defaultComponents.get(Components.OptionsContainer);

  const OptionGroup =
    components.get(Components.OptionGroup) ||
    defaultComponents.get(Components.OptionGroup);

  const Placeholder =
    components.get(Components.Placeholder) ||
    defaultComponents.get(Components.Placeholder);

  const Select =
    components.get(Components.Select) ||
    defaultComponents.get(Components.Select);

  const SelectContainer =
    components.get(Components.SelectContainer) ||
    defaultComponents.get(Components.SelectContainer);

  const Tag =
    components.get(Components.Tag) || defaultComponents.get(Components.Tag);

  const TagClearButton =
    components.get(Components.TagClearButton) ||
    defaultComponents.get(Components.TagClearButton);

  /**__________________Debugging__________________ */

  ButtonsContainer.displayName = Components.ButtonsContainer;
  ClearButton.displayName = Components.ClearButton;
  DropDownButton.displayName = Components.DropDownButton;
  Input.displayName = Components.Input;
  InputContainer.displayName = Components.InputContainer;
  Label.displayName = Components.Label;
  Option.displayName = Components.Option;
  OptionsContainer.displayName = Components.OptionsContainer;
  OptionGroup.displayName = Components.OptionGroup;
  Placeholder.displayName = Components.Placeholder;
  Select.displayName = Components.Select;
  SelectContainer.displayName = Components.SelectContainer;
  Tag.displayName = Components.Tag;
  TagClearButton.displayName = Components.TagClearButton;

  /**__________________On clicks__________________ */

  const buttonsContainerOnClick: EventHandler = event =>
    event.stopPropagation();
  const selectOnClick: EventHandler = event =>
    disabled && event.stopPropagation();

  const tagClearOnClick: (event: React.MouseEvent, value: string) => void = (
    event,
    value,
  ) => {
    event.stopPropagation();
    return changeSelectedOptions(removeFromSelected(value));
  };

  const dropDownOnClick: EventHandler = event => {
    event.stopPropagation();

    setIsOpen(!isOpen);
    isOpen ? selectRef.current.focus() : selectRef.current.blur();
  };

  const selectContainerOnClick: EventHandler = event => {
    event.stopPropagation();
    dropDownOnClick(event);
  };

  const clearOnClick: EventHandler = event => {
    event.stopPropagation();
    changeSelectedOptions(new Set());
  };

  const singleOptionOnClick: EventHandler<HTMLOptionElement> = event => {
    event.stopPropagation();
    if (!disabled) {
      const {
        currentTarget: { value },
      } = event;

      return changeSelectedOptions(
        isSelected(value) ? new Set([]) : new Set([value]),
      );
    }
  };

  const multipleOptionOnClick: EventHandler<HTMLOptionElement> = event => {
    event.stopPropagation();
    const {
      currentTarget: { value },
    } = event;

    if (isSelected(value)) {
      return changeSelectedOptions(removeFromSelected(value));
    }

    return changeSelectedOptions(addToSelected(value));
  };

  const optionOnClick: (isMultiple: boolean) => EventHandler = isMultiple =>
    isMultiple ? multipleOptionOnClick : singleOptionOnClick;

  /**__________________Components props__________________ */

  const getSelectPropsIsClearable = memoize(
    statePropsBuilder(Components.Select, StateKeys.IsClearable),
  );

  const getSelectPropsIsSelected = memoize(
    statePropsBuilder(Components.Select, StateKeys.IsSelected),
  );

  const getSelectPropsIsMultiple = statePropsBuilder(
    Components.Select,
    StateKeys.IsMultiple,
  );

  const getSelectProps: () => SelectProps = () =>
    merge(
      getSelectPropsIsClearable(isClearable),
      merge(
        getSelectPropsIsMultiple(multiple),
        getSelectPropsIsSelected(
          Boolean(selectedOptions.size),
          customizedProps.get(Components.Select).className,
        ),
      ),
    );

  const getOptionsContainerProps = memoize(
    statePropsBuilder(Components.OptionsContainer, StateKeys.IsOpen),
  );

  const getOptionProps = memoize(
    statePropsBuilder(Components.Option, StateKeys.IsSelected),
  );

  const tagProps = memoize(
    statePropsBuilder(Components.Tag, StateKeys.IsMultiple),
  )(multiple);

  const selectContainerProps = memoize(
    statePropsBuilder(Components.SelectContainer),
  );

  const inputContainerProps = memoize(
    statePropsBuilder(Components.InputContainer),
  );
  const inputProps = memoize(statePropsBuilder(Components.Input));
  const labelProps = memoize(statePropsBuilder(Components.Label));
  const placeholderProps = memoize(statePropsBuilder(Components.Placeholder));
  const tagClearButtonProps = memoize(
    statePropsBuilder(Components.TagClearButton),
  );
  const buttonsProps = memoize(statePropsBuilder(Components.ButtonsContainer));
  const dropDownButtonProps = memoize(
    statePropsBuilder(Components.DropDownButton),
  );
  const clearButtonProps = memoize(statePropsBuilder(Components.ClearButton));

  /**__________________Render__________________ */

  return (
    <Select
      tabIndex={-1}
      {...getSelectProps()}
      forwardedRef={selectRef}
      disabled={disabled}
      onClick={selectOnClick}
    >
      <SelectContainer
        {...selectContainerProps()}
        onClick={selectContainerOnClick}
      >
        {label && <Label {...labelProps()}>{label}</Label>}
        <InputContainer {...inputContainerProps()}>
          <Input {...inputProps()}>
            {!selectedOptions.size && (
              <Placeholder {...placeholderProps()}>{placeholder}</Placeholder>
            )}
            {Array.from(selectedOptions).map(value => (
              <Tag key={value} {...tagProps}>
                {value}
                {isTagClearable && (
                  <TagClearButton
                    {...tagClearButtonProps()}
                    onClick={(event: React.MouseEvent): void =>
                      tagClearOnClick(event, value)
                    }
                  />
                )}
              </Tag>
            ))}
          </Input>
          <ButtonsContainer
            {...buttonsProps()}
            onClick={buttonsContainerOnClick}
          >
            {isClearable ? (
              <ClearButton {...clearButtonProps()} onClick={clearOnClick} />
            ) : null}
            <DropDownButton
              {...dropDownButtonProps()}
              onClick={dropDownOnClick}
            />
          </ButtonsContainer>
        </InputContainer>
      </SelectContainer>
      <OptionsContainer {...getOptionsContainerProps(false)}>
        {options.map(option => (
          <Option
            key={option}
            value={option}
            {...getOptionProps(isSelected(option))}
            onClick={optionOnClick(multiple)}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </Select>
  );
};

SelectComponent.displayName = 'SelectComponent';
