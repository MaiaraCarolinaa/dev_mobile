import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<any[]>([])

    useEffect(() => {
        getAlunos()
    }, [])

    async function getAlunos() {
        let { data: alunos, error } = await supabase
            .from('alunos')
            .select('*')

        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: error.message
            })
        } else {
            setAlunos(alunos || [])
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.title}>Alunos cadastrados</Text>}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno encontrado.</Text>}

                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.nome}</Text>
                        <Text style={styles.meta}>Idade: {item.idade}</Text>
                        <Text style={styles.meta}>Email: {item.email}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 32,
    },
})