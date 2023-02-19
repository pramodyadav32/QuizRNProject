import React from 'react';
import {Dimensions} from 'react-native';
export const DeviceWidth = Dimensions.get('screen').width;
export const DeviceHeight = Dimensions.get('screen').height;
export const DeviceHeightWindow = Dimensions.get('window').height;
export const DeviceWidthWindow = Dimensions.get('window').width;
export const resH = h => {
  return (DeviceHeight * h) / 100;
};
export const resW = w => {
  return (DeviceWidth * w) / 100;
};

export const BaseColor = '#6A8FBC';
export const Primary_Color = '#455a64';
export const whiteColor = '#ffffff';
export const LightGrayColor = '#e6e6e6';
export const GrayColor = '#808080';
export const blueColor = '#0E47A1';
export const lightBlueColor = '#22BFF2';
export const darkColor = '#3c3c3c';
export const darkColor1 = '#222222';
export const darkColor2 = '#333333';
export const blackColor = '#000000';
export const grayColor = 'gray';
export const lightGrayColor = '#F4F4F4';
export const blackColor1 = '#3F3F3F';
export const baseTextColor = '#F3EFEF';
