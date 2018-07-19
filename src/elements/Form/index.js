/**
 * Created by vjtc0n on 9/7/17.
 */
import React from 'react';

import { TextInput, Image, TouchableOpacity } from 'react-native';
import { View, Item, Input, Content, Text } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { change, Field } from 'redux-form';
import IconIcon from '../../elements/Icon';
import material from '../../theme/variables/material';
import DateTimePicker from '../../components/DateTime';
import TimePicker from '../../components/TimePicker';

import styles from './styles';

export const TimePickerField = ({
  input,
  meta: { touched, error, warning },
  defaultValue,
  style,
  titleIOS,
  minimumDate,
  maximumDate,
  styleContainer,
  defaultDateChose,
  onChange,
  textStyle,
  ...custom
}) => (
  <View style={{ ...styles.inputContainer, ...styleContainer }}>
    <TimePicker
      style={style}
      textStyle={textStyle}
      defaultValue={defaultValue}
      defaultDateChose={defaultDateChose}
      onChange={value => {
        input.onChange(value);
        onChange && onChange(value);
      }}
      titleIOS={titleIOS}
      selectedOption={{
        name: input.value.name
      }}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      error={touched && !!error}
      {...custom}
    />
  </View>
);

export const InputField = ({
  input,
  label,
  meta: { active, touched, error, warning },
  IconIcom,
  icon,
  onIconPress,
  addon,
  onPress,
  style,
  inputStyle,
  iconStyle,
  multiline,
  itemStyle,
  passwordOption,
  inputRef,
  disabled,
  keyboardType,
  unit,
  customOnChange,
  IconIcomColor,
  ...custom
}) => {
  const iconName = typeof icon === 'function' ? icon(input, active) : icon;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.inputContainer,
          ...style,
          borderColor: error ? 'red' : '#ccc'
        }}
      >
        <Item
          style={{ ...styles.item, ...itemStyle }}
          error={touched && !!error}
          onPress={onPress}
        >
          {IconIcom && (
            <IconIcon
              name={IconIcom}
              size={24}
              style={{ color: IconIcomColor }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              width: iconName || unit ? '75%' : '100%'
            }}
          >
            {addon}
            <TextInput
              onChangeText={customOnChange}
              keyboardType={keyboardType}
              disabled={disabled}
              ref={inputRef}
              multiline={multiline}
              underlineColorAndroid="transparent"
              placeholder={label}
              {...input}
              placeholderTextColor={material.inputColorPlaceholder}
              {...custom}
              style={{
                ...styles.input,
                ...inputStyle,
                width: '100%'
              }}
            />
          </View>
          {iconName &&
            !passwordOption && (
              <View style={styles.inputIconContainer}>
                <FontAwesome
                  onPress={e => onIconPress && onIconPress(input, active)}
                  style={{ ...styles.inputIcon, ...iconStyle }}
                  name={iconName}
                />
              </View>
            )}
          {iconName &&
            passwordOption && (
              <View style={styles.inputIconContainer}>
                <FontAwesome
                  onPress={e => onIconPress && onIconPress(input, active)}
                  style={{ ...styles.inputIcon, ...iconStyle }}
                  name={iconName}
                />
              </View>
            )}
          {unit && (
            <View style={{ width: '25%', alignItems: 'flex-end' }}>
              <Text style={styles.textNormal}>{unit}</Text>
            </View>
          )}
        </Item>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export const CheckBoxField = ({
  input,
  label,
  meta: { active, touched, error, warning },
  style,
  inputStyle,
  iconStyle,
  circle,
  ...custom
}) => (
  <TouchableOpacity
    onPress={() =>
      input.onChange({
        name: input.value.name,
        checked: !input.value.checked
      })
    }
    style={{ flexDirection: 'row' }}
  >
    <TouchableOpacity
      onPress={() =>
        input.onChange({
          name: input.value.name,
          checked: !input.value.checked
        })
      }
      style={
        circle ? styles.circleCheckboxButton : styles.rectangleCheckboxButton
      }
    >
      {input.value.checked && (
        <FontAwesome size={10} name={'check'} color={'red'} />
      )}
    </TouchableOpacity>
    <Text style={styles.checkboxText} numberOfLines={2}>
      {input.value.name}
    </Text>
  </TouchableOpacity>
);

export const DateTimePickerField = ({
  input,
  meta: { touched, error, warning },
  defaultValue,
  style,
  titleIOS,
  styleContainer,
  defaultDateChose,
  onChange,
  textStyle,
  ...custom
}) => (
  <View style={{ ...styles.inputContainer, ...styleContainer }}>
    <DateTimePicker
      style={style}
      textStyle={textStyle}
      defaultValue={defaultValue}
      defaultDateChose={defaultDateChose}
      onChange={value => {
        input.onChange(value);
        onChange && onChange(value);
      }}
      titleIOS={titleIOS}
      selectedOption={{
        name: input.value.name
      }}
      error={touched && !!error}
      {...custom}
    />
  </View>
);
