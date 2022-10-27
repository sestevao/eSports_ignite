import React, { useEffect, useState } from 'react';
import { GameController } from 'phosphor-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourEnd: number;
  hourStart: number;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  const [duo, setDuo] = useState<DuoCardProps[]>([]);

  return (
    <View style={styles.container}>
      <DuoInfo
        label="Name"
        value={data.name}
      />

      <DuoInfo
        label="Game time"
        value={`${data.yearsPlaying} year(s)`}
      />

      <DuoInfo
        label="Availability"
        value={`${data.weekDays.length} day(s) \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label="Audio calls?"
        value={data.useVoiceChannel ? 'Yes' : 'No'}
        colorValue={!data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity style={styles.button} onPress={onConnect} >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}