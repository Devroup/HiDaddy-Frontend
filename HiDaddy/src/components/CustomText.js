import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const HmmText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.hmmtext, style]} {...props}>
      {children}
    </Text>
  );
};

const HmmBText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.hmmbtext, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  hmmtext: {
    fontFamily: 'HancomMalangMalang-Regular',
    color: colors.black,
  },
  hmmbtext: {
    fontFamily: 'HancomMalangMalang-Bold',
    color: colors.black,
  },
});

export { HmmText, HmmBText };
