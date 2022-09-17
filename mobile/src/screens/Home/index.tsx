import React from 'react';
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import { GAMES } from '../../utils/games';
import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';

export function Home() {

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading title="Find your duo!" subtitle="Select the game you want to play..." />

      <FlatList 
        data={GAMES} 
        keyExtractor={item => item.id} 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        renderItem={({ item }) => (
          <GameCard data={item} />
        )}
        contentContainerStyle={styles.contentList}
      />

    </View>
  );
}