import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useChannelPosts } from '../hooks/useChannelPosts';
import {
    createPost,
    updatePost,
    deletePost,
} from '../services/channelService';
import moment from 'moment';

type TabName = 'posts' | 'create';

const TAG_OPTIONS = ['General', 'Académico', 'Extracurricular', 'Urgente'];

export default function AdminChannelScreen() {
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
    const { auth } = useAuth();
    const { posts, loading, refetch } = useChannelPosts(Number(id));

    const [activeTab, setActiveTab] = useState<TabName>('posts');

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newTag, setNewTag] = useState('General');

    const [editingPost, setEditingPost] = useState<any>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editTag, setEditTag] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const handleCreatePost = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            Alert.alert('Error', 'El título y el contenido son obligatorios.');
            return;
        }
        setSubmitting(true);
        try {
            await createPost({
                channel_id: Number(id),
                user_id: auth.userId,
                title: newTitle.trim(),
                content: newContent.trim(),
                date: new Date().toISOString(),
                tags: newTag,
            });
            setNewTitle('');
            setNewContent('');
            setNewTag('General');
            await refetch();
            setActiveTab('posts');
            Alert.alert('Éxito', 'Publicación creada correctamente.');
        } catch (err: any) {
            const detail = err?.response?.data?.detail || 'Error al crear la publicación.';
            Alert.alert('Error', detail);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeletePost = (postId: number) => {
        Alert.alert(
            'Eliminar publicación',
            '¿Estás seguro de que deseas eliminar esta publicación?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deletePost(postId, auth.userId);
                            await refetch();
                        } catch (err: any) {
                            const detail = err?.response?.data?.detail || 'Error al eliminar.';
                            Alert.alert('Error', detail);
                        }
                    },
                },
            ]
        );
    };

    const startEditing = (post: any) => {
        setEditingPost(post);
        setEditTitle(post.title || '');
        setEditContent(post.content || '');
        setEditTag(post.tags || 'General');
    };

    const cancelEditing = () => {
        setEditingPost(null);
        setEditTitle('');
        setEditContent('');
        setEditTag('');
    };

    const handleUpdatePost = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            Alert.alert('Error', 'El título y el contenido son obligatorios.');
            return;
        }
        setSubmitting(true);
        try {
            await updatePost(editingPost.post_id, auth.userId, {
                title: editTitle.trim(),
                content: editContent.trim(),
                tags: editTag,
            });
            cancelEditing();
            await refetch();
            Alert.alert('Éxito', 'Publicación actualizada correctamente.');
        } catch (err: any) {
            const detail = err?.response?.data?.detail || 'Error al actualizar.';
            Alert.alert('Error', detail);
        } finally {
            setSubmitting(false);
        }
    };

    const getBadgeStyle = (category: string) => {
        switch (category?.toLowerCase()) {
            case 'extracurricular':
                return { backgroundColor: '#4caf50', label: 'Extracurricular' };
            case 'urgente':
                return { backgroundColor: '#f44336', label: 'Urgente' };
            case 'académico':
                return { backgroundColor: '#2196f3', label: 'Académico' };
            default:
                return { backgroundColor: '#9e9e9e', label: 'General' };
        }
    };

    const renderPostItem = ({ item }: { item: any }) => {
        const badge = getBadgeStyle(item.tags || '');

        if (editingPost?.post_id === item.post_id) {
            return (
                <View style={styles.card}>
                    <Text style={styles.editLabel}>Editando publicación</Text>
                    <TextInput
                        style={styles.input}
                        value={editTitle}
                        onChangeText={setEditTitle}
                        placeholder="Título"
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={editContent}
                        onChangeText={setEditContent}
                        placeholder="Contenido"
                        multiline
                    />
                    <View style={styles.tagRow}>
                        {TAG_OPTIONS.map((tag) => (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.tagChip,
                                    editTag === tag && styles.tagChipActive,
                                ]}
                                onPress={() => setEditTag(tag)}
                            >
                                <Text
                                    style={[
                                        styles.tagChipText,
                                        editTag === tag && styles.tagChipTextActive,
                                    ]}
                                >
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.editActions}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleUpdatePost}
                            disabled={submitting}
                        >
                            <Text style={styles.saveButtonText}>
                                {submitting ? 'Guardando...' : 'Guardar'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={cancelEditing}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.card}>
                <View style={[styles.badge, { backgroundColor: badge.backgroundColor }]}>
                    <Text style={styles.badgeText}>{badge.label}</Text>
                </View>
                <Text style={styles.postTitle}>
                    {item.title?.trim() ? item.title : 'Sin título'}
                </Text>
                <Text style={styles.postBody}>{item.content}</Text>
                <Text style={styles.postDate}>
                    {moment(item.date, 'DD/MM/YYYY HH:mm').format(
                        'DD [de] MMMM [de] YYYY, HH:mm'
                    )}
                </Text>
                <View style={styles.postActions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => startEditing(item)}
                    >
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeletePost(item.post_id)}
                    >
                        <Text style={styles.deleteButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderCreateTab = () => (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.createContainer}>
                <Text style={styles.createTitle}>Nueva publicación</Text>

                <Text style={styles.fieldLabel}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={newTitle}
                    onChangeText={setNewTitle}
                    placeholder="Título de la publicación"
                />

                <Text style={styles.fieldLabel}>Contenido</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={newContent}
                    onChangeText={setNewContent}
                    placeholder="Escribe el contenido aquí..."
                    multiline
                />

                <Text style={styles.fieldLabel}>Categoría</Text>
                <View style={styles.tagRow}>
                    {TAG_OPTIONS.map((tag) => (
                        <TouchableOpacity
                            key={tag}
                            style={[
                                styles.tagChip,
                                newTag === tag && styles.tagChipActive,
                            ]}
                            onPress={() => setNewTag(tag)}
                        >
                            <Text
                                style={[
                                    styles.tagChipText,
                                    newTag === tag && styles.tagChipTextActive,
                                ]}
                            >
                                {tag}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.publishButton, submitting && { opacity: 0.6 }]}
                    onPress={handleCreatePost}
                    disabled={submitting}
                >
                    <Text style={styles.publishButtonText}>
                        {submitting ? 'Publicando...' : 'Publicar'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name}</Text>
            <Text style={styles.subtitle}>Panel de administración</Text>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
                    onPress={() => setActiveTab('posts')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'posts' && styles.tabTextActive,
                        ]}
                    >
                        Publicaciones
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'create' && styles.tabActive]}
                    onPress={() => setActiveTab('create')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'create' && styles.tabTextActive,
                        ]}
                    >
                        Crear publicación
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'posts' ? (
                loading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color="#2c3e50" />
                        <Text style={styles.loadingText}>Cargando publicaciones...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={posts}
                        keyExtractor={(item: any) => item.post_id.toString()}
                        renderItem={renderPostItem}
                        ListEmptyComponent={
                            <Text style={styles.empty}>
                                No hay publicaciones en este canal.
                            </Text>
                        }
                    />
                )
            ) : (
                renderCreateTab()
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: '#F9FAFB',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },

    // Tabs
    tabBar: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: '#e9ecef',
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabActive: {
        backgroundColor: '#2c3e50',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    tabTextActive: {
        color: '#fff',
    },

    // Post cards
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    badge: {
        alignSelf: 'flex-end',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#2c3e50',
    },
    postBody: {
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
    },
    postDate: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        marginBottom: 12,
    },
    postActions: {
        flexDirection: 'row',
        gap: 10,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#466887',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#f44336',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },

    // Inline editing
    editLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#466887',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    editActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#EDEDED',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#466887',
        fontWeight: '600',
    },

    // Create tab
    createContainer: {
        paddingBottom: 40,
    },
    createTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        marginBottom: 14,
        color: '#333',
    },
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    tagChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
    },
    tagChipActive: {
        backgroundColor: '#2c3e50',
    },
    tagChipText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    tagChipTextActive: {
        color: '#fff',
    },
    publishButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    publishButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    empty: {
        marginTop: 20,
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
    },
});
