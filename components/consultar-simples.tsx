import { supabase } from '@/lib/supabase';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-toast-message";

export default function CosultaAluno() {
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

  async function alterarAluno(id: number) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Erro ao alterar aluno'+ id,
    });
       router.push({pathname: '/(tabs)/cadastro', params:{id:id}});
  }
  async function excluirAluno(id: number) {

    const { error } = await supabase
      .from('alunos')
      .delete().eq('id', id)
      if(error){
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível excluir o aluno!'
        });
      }else{
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Aluno excluído com sucesso'
        })
      }
      getAlunos();

    }

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

            <TouchableOpacity onPress={()=> alterarAluno(item.id)}>
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> excluirAluno(item.id)}>
              <Text>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});