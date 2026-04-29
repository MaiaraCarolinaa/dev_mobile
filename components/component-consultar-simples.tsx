import { supabase } from '@/lib/supabase';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [alunos, setAlunos] = useState<any[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAlunos();
    }
  }, [isFocused]);

  async function getAlunos() {
    const { data, error } = await supabase
      .from('alunos')
      .select('*');

    setAlunos(data || [])
  };

  return (
    <View style={styles.container}>
      <Text>Lista de Alunos</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.idade}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});