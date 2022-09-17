import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';

import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
  id: string;
  name: string;
  cover: ImageSourcePropType;
  ads: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground style={styles.cover} source={data.cover} />

      <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer} >
        <Text></Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}