import { Components } from '../consts';
import { classNames } from './class-names';

const buttonsContainer: ButtonsContainerProps = {
  className: classNames.get(Components.ButtonsContainer),
};

const clearButton: ClearButtonProps = {
  className: classNames.get(Components.ClearButton),
};

const dropDownButton: DropDownButtonProps = {
  className: classNames.get(Components.DropDownButton),
};

const input: InputProps = {
  className: classNames.get(Components.Input),
};

const inputContainer: InputContainerProps = {
  className: classNames.get(Components.InputContainer),
};

const option: OptionProps = {
  className: classNames.get(Components.Option),
  stateClassNames: {
    IsSelected: 'option-selected',
  },
  isThemed: true,
};

const optionsContainer: OptionsContainerProps = {
  className: classNames.get(Components.OptionsContainer),
  isThemed: true,
};

const placeholder: PlaceholderProps = {
  className: classNames.get(Components.Placeholder),
};

const select: SelectProps = {
  className: 'select',
  stateClassNames: {
    IsOpen: 'select-open',
    IsSelected: 'select-selected',
    IsMultiple: 'select-multiselect',
    IsClearable: 'select-clearable',
  },
  isThemed: true,
};

const selectContainer: SelectContainerProps = {
  className: classNames.get(Components.SelectContainer),
};

const tag: TagProps = {
  className: classNames.get(Components.Tag),
};

const tagClearButton: TagClearButtonProps = {
  className: classNames.get(Components.TagClearButton),
};

export const props = new Map<Components, ComponentsProps>([
  [Components.ButtonsContainer, buttonsContainer],
  [Components.ClearButton, clearButton],
  [Components.DropDownButton, dropDownButton],
  [Components.Input, input],
  [Components.InputContainer, inputContainer],
  [Components.Option, option],
  [Components.OptionsContainer, optionsContainer],
  [Components.Placeholder, placeholder],
  [Components.Select, select],
  [Components.SelectContainer, selectContainer],
  [Components.Tag, tag],
  [Components.TagClearButton, tagClearButton],
]);

// export const componentsProps = new ComponentsPropsMap([]);
