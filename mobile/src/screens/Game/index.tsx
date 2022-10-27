import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.23:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleGoBack}
          >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.banner}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Connect and start playing!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { }}
            />
          )}
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>There are no ads posted yet.</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}