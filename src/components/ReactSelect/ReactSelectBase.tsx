'use client'

import * as React from 'react'

// {
//   StylesConfig,
//   CSSObjectWithLabel,
//   SelectInstance,
//   ActionMeta,
//   SingleValue, // Example: const v: SingleValue<{ value: string; label: string }> = {}
//   MultiValue,
//   OptionsOrGroups,
//   Options,
//   PropsValue,
//   OnChangeValue
// }

///////////////////////////////////////////////////////////////////////////
//
// ⚠️ Gotcha: react-select render differently on the server than on the client.
//
//   https://github.com/JedWatson/react-select/pull/5972
//   https://github.com/JedWatson/react-select/issues/5859
//
// This inevitably leads to a hydration mismatch where the offending line is:
//
//   aria-activedescendant=""
//
// Solution 1: load react-select only on the client side using Next.js's dynamic imports.
//
//   const Select = dynamic(() => import('react-select'), { ssr: false })
//
// The problem with this approach is that the Select will now take a second to
// load in on the client, and then cause cumulative layout shift.
//
// Solution 2: Use isMounted state to conditionally render the Select only on the client.
// This also causes the <Select /> to blink in with cumulative layout shift.
//
// Solution 3: Use suppressHydrationWarning on a parent element of the Select.
// Unfortunately, this approach doesn't prevent the error.
// For now, I'm not going to do anything. It may get fixed in the future.
//
///////////////////////////////////////////////////////////////////////////
import Select from 'react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN
} from '@/components/component-constants'

export type { SelectInstance } from 'react-select'

// This approximates the FIELD_FOCUS_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_FOCUS_WITHIN_MIXIN = `
focus-within:shadow-none
focus-within:border-primary
focus-within:ring-[3px]
focus-within:ring-primary/40
`

// This approximates the FIELD_VALID_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_VALID_MIXIN = `
border-success
focus-within:border-success
focus-within:ring-success/40
`

// This approximates the FIELD_VALID_MIXIN in comopenent-constants.tsx,
// but modified for the react-select implementation.
const FIELD_INVALID_MIXIN = `
border-destructive
focus-within:border-destructive
focus-within:ring-destructive/40
`

const baseClasses = `
flex flex-wrap items-center justify-between
relative w-full min-w-0 bg-background-light
px-[0.5em] py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
transition-[color,box-shadow]
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_WITHIN_MIXIN}
`

/* ======================
      inputVariants
====================== */

export const reactSelectVariants = cva(baseClasses, {
  variants: {
    fieldSize: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    },
    defaultVariants: {
      fieldSize: 'md'
    }
  }
})

// Important: Unlike in a normal react-select, className
// & style will be applied to the control. Moreover,
// the classNames & styles props have been omitted.
// className?: string // already part of Select props.
type ReactSelectBaseProps = Omit<
  React.ComponentProps<typeof Select>,
  | 'classNames'
  | 'styles'
  ///////////////////////////////////////////////////////////////////////////
  //
  // ⚠️ The actual Ref used by react-select is typed as:
  //
  //   React.Ref<Select<unknown, boolean, GroupBase<unknown>>> | undefined
  //
  // We can derive that by doing this:
  //
  //   type SelectRef = React.ComponentProps<typeof Select>['ref']
  //
  // However, if we actually allow that type to be inferred on the consuming side,
  // then it makes passing a ref too strict.Instead just do this:
  //
  //   ref: React.Ref<any> | undefined
  //
  // Then if you want to inform Typescript of the actual type, you can do this:
  //
  //   const selectRef = useRef<SelectInstance>(undefined)
  //
  ///////////////////////////////////////////////////////////////////////////
  | 'ref'
  // This is omitted because the blur can happen before the controlled state value is updated.
  // This would then lead to a false negative validation error.
  | 'blurInputOnSelect'
> & {
  disabled?: boolean
  style?: React.CSSProperties
  error?: string
  touched?: boolean
  ref?: React.Ref<any> | undefined
} & VariantProps<typeof reactSelectVariants>

export type SelectOption = { value: string; label: string; [key: string]: any }
export type SelectValue = SelectOption | SelectOption[] | null

/* ========================================================================
                               ReactSelectBase
======================================================================== */
//# Manually test all props.
//# Complete disabled styles.
//# Complete other demo examples -especially for multi.
//# Test out filterOption
//# Test out formatOptionLabel
//# Review Input. Why does it have constant styles in base and in the maybeValidationMixin?

export const ReactSelectBase = ({
  className = '',
  disabled = false,
  isDisabled = false,
  error = '',
  fieldSize,
  touched = false,
  inputId,
  instanceId,
  style = {},
  ...otherProps // value, defaultValue, etc.
}: ReactSelectBaseProps) => {
  isDisabled = disabled || isDisabled

  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? FIELD_DISABLED_MIXIN
    : error // i.e., !disabled && error
      ? FIELD_INVALID_MIXIN
      : touched // i.e., !disabled && !error && touched
        ? FIELD_VALID_MIXIN
        : ``

  /* ======================
            return
    ====================== */

  return (
    <Select
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          // Affects the option selected color.
          primary: 'var(--color-primary)',
          // Affects the option hover color.
          primary25: 'var(--color-accent)',
          // Affects the option active color.
          primary50: 'var(--color-accent)',
          // Affects the `x` on the multiValut tag.
          danger: 'var(--color-destructive)',
          // Affects the `x` background on the multiValut tag.
          dangerLight: 'var(--color-red-200)'
        }
      })}
      data-slot='react-select'
      // unstyled // ⚠️ This is too aggressive
      isDisabled={isDisabled}
      instanceId={instanceId}
      inputId={inputId}
      classNames={{
        // control is not the top-level container, nor is it the input.
        control: (_state) => {
          return cn(
            reactSelectVariants({ fieldSize }),
            className,
            maybeValidationMixin
          )
        }
      }}
      styles={{
        container: (baseStyles) => {
          return {
            ...baseStyles
          }
        },

        valueContainer: (baseStyles) => {
          return {
            ...baseStyles,
            padding: 0
          }
        },

        // ⚠️ In order for Tailwind classses to work in classNames.control, you
        // have to opt out of most of styles.control.
        control: (_baseStyles, _state) => {
          return {
            label: 'control',
            cursor: 'default',
            boxSizing: 'border-box',
            ...style
          }
        },

        input: (baseStyles) => {
          // console.log('input:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            margin: 0,
            padding: 0
          }
        },

        singleValue: (baseStyles) => {
          // console.log('singleValue:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            marginLeft: 0,
            marginRight: 0,
            color: 'var(--color-foreground)'
          }
        },

        // The multValue tag was pushing out the size of the ReactSelect
        // This is fixed by setting maring to 0px here and by setting vertical
        // padding to 0px on the multiValueLabel.
        multiValue: (baseStyles) => {
          // console.log('multiValue:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            boxShadow:
              'inset 0px 0px 0px 0.5px oklch(from var(--color-foreground) l c h / 0.3), 0px 1px 2px rgb(0,0,0,0.25)',
            color: 'var(--color-foreground)',
            backgroundColor: 'var(--color-accent)',
            borderRadius: '0.375em',
            overflow: 'hidden',

            margin: '0px',
            ':not(:nth-last-of-type(1))': {
              marginRight: '6px'
            }
          }
        },

        multiValueLabel: (baseStyles) => {
          // console.log('multiValueLabel:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            paddingTop: '0px',
            paddingBottom: '0px',
            color: 'var(--color-foreground)'
          }
        },

        multiValueRemove: (baseStyles) => {
          // console.log('multiValueRemove:', JSON.stringify(baseStyles, null, 2))

          return {
            ...baseStyles,
            cursor: 'pointer',
            // The background color and foreground color were already set in the
            // theme prop, but using ':hover' here seems to completely ovverride it,
            // why is why I'm re-setting them.
            ':hover': {
              backgroundColor: 'var(--color-red-200)',
              boxShadow:
                'inset 0px 0px 0px 0.5px oklch(from var(--color-destructive) l c h / 0.99)',
              borderTopRightRadius: '0.375em',
              borderBottomRightRadius: '0.375em',
              color: 'var(--color-destructive)'
            }
          }
        },

        // // Remove padding from child div that contains the <svg>.
        indicatorsContainer: (baseStyles) => {
          // console.log(
          //   'indicatorsContainer:',
          //   JSON.stringify(baseStyles, null, 2)
          // )
          return {
            ...baseStyles
          }
        },

        clearIndicator: (baseStyles) => {
          // console.log('clearIndicator:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            padding: 0,
            paddingRight: '0.5em',
            color: disabled
              ? 'var(--border)' // ???
              : error
                ? 'var(--color-destructive)'
                : touched
                  ? 'var(--color-success)'
                  : 'var(--border)',
            cursor: 'pointer',
            // The default size is '20px', this results in fieldSize="xs"
            // having a height of 28px, rather than 26px.
            svg: {
              height: '1.5em',
              width: '1.5em'
            },
            ':hover': {
              color: disabled
                ? 'var(--border)' // ???
                : error
                  ? 'var(--color-destructive)'
                  : touched
                    ? 'var(--color-success)'
                    : 'var(--color-muted-foreground)'
            }
          }
        },

        indicatorSeparator: (baseStyles) => {
          // console.log('indicatorSeparator:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,

            backgroundColor: disabled
              ? 'var(--border)' // ???
              : error
                ? 'var(--color-destructive)'
                : touched
                  ? 'var(--color-success)'
                  : 'var(--border)',
            margin: 0
          }
        },

        dropdownIndicator: (baseStyles) => {
          // console.log('dropdownIndicator:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,

            padding: 0,
            paddingLeft: '0.5em',
            color: disabled
              ? 'var(--border)' // ???
              : error
                ? 'var(--color-destructive)'
                : touched
                  ? 'var(--color-success)'
                  : 'var(--border)',
            cursor: 'pointer',
            // The default size is '20px', this results in fieldSize="xs"
            // having a height of 28px, rather than 26px.
            svg: {
              height: '1.5em',
              width: '1.5em'
            },
            ':hover': {
              color: disabled
                ? 'var(--border)' // ???
                : error
                  ? 'var(--color-destructive)'
                  : touched
                    ? 'var(--color-success)'
                    : 'var(--color-muted-foreground)'
            }
          }
        },
        menu: (baseStyles) => {
          // console.log('menu:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            backgroundColor: 'var(--background-light)',
            borderRadius: '0.375em',
            boxShadow:
              '0 0 0 1px var(--color-border), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
            marginBottom: '0px',
            marginTop: '0px',
            fontSize: 14,
            overflow: 'hidden',
            top: 'calc(100% + 10px)'
          }
        },
        menuList: (baseStyles) => {
          // console.log('menuList:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            paddingTop: 0,
            paddingBottom: 0
          }
        },

        option: (baseStyles, _props) => {
          // console.log('option:', JSON.stringify(baseStyles, null, 2))

          return {
            ...baseStyles,
            padding: '4px 8px'

            ///////////////////////////////////////////////////////////////////////////
            //
            // Rather than doing this:
            //
            //   ':hover': { backgroundColor: 'var(--color-primary)' }
            //
            // It seems to work better if you set the theme directly.
            //
            //   theme={(theme) => ({
            //     ...theme,
            //     colors: {
            //       ...theme.colors,
            //       primary25: 'var(--color-primary)'
            //     }
            //   })}
            //
            // Otherwise, it seems like you're fighting against the theme.
            //
            ///////////////////////////////////////////////////////////////////////////
          }
        },

        placeholder: (baseStyles) => {
          // console.log('placeholder:', JSON.stringify(baseStyles, null, 2))
          return {
            ...baseStyles,
            color: 'var(--color-muted-foreground)'
          }
        },
        // Todo...
        noOptionsMessage: (baseStyles) => {
          return baseStyles
        },

        // ???
        group: (baseStyles) => {
          return {
            ...baseStyles
          }
        },

        // ???
        groupHeading: (baseStyles) => {
          return {
            ...baseStyles
          }
        },

        // ???
        loadingMessage: (baseStyles) => {
          return {
            ...baseStyles
          }
        },
        // ???
        loadingIndicator: (baseStyles) => {
          return {
            ...baseStyles
          }
        }
      }}
      {...otherProps}
    />
  )
}

/* 
export declare function mergeStyles<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(source: StylesConfig<Option, IsMulti, Group>, target?: StylesConfig<Option, IsMulti, Group>): {
    clearIndicator?: ((base: CSSObjectWithLabel, props: ClearIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    container?: ((base: CSSObjectWithLabel, props: ContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    control?: ((base: CSSObjectWithLabel, props: ControlProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    dropdownIndicator?: ((base: CSSObjectWithLabel, props: DropdownIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    group?: ((base: CSSObjectWithLabel, props: GroupProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    groupHeading?: ((base: CSSObjectWithLabel, props: GroupHeadingProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorsContainer?: ((base: CSSObjectWithLabel, props: IndicatorsContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorSeparator?: ((base: CSSObjectWithLabel, props: IndicatorSeparatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    input?: ((base: CSSObjectWithLabel, props: InputProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingIndicator?: ((base: CSSObjectWithLabel, props: LoadingIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menu?: ((base: CSSObjectWithLabel, props: MenuProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuList?: ((base: CSSObjectWithLabel, props: MenuListProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuPortal?: ((base: CSSObjectWithLabel, props: PortalStyleArgs) => CSSObjectWithLabel) | undefined;
    multiValue?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueLabel?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueRemove?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    noOptionsMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    option?: ((base: CSSObjectWithLabel, props: OptionProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    placeholder?: ((base: CSSObjectWithLabel, props: PlaceholderProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    singleValue?: ((base: CSSObjectWithLabel, props: SingleValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    valueContainer?: ((base: CSSObjectWithLabel, props: ValueContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
};
*/
