import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/shared/theme/useTheme';
import { can } from '@/src/features/authz/permissions';
import { useBusinessSession } from '@/src/features/business/businessSession';
import Button from '@/src/shared/components/Button';

type PhotoItem = {
  id: string;
  title: string;
};

type ReelItem = {
  id: string;
  title: string;
  duration: string;
};

const INITIAL_PHOTOS: PhotoItem[] = [
  { id: 'p1', title: 'Interier' },
  { id: 'p2', title: 'Produkty' },
  { id: 'p3', title: 'Tim' },
];

const INITIAL_REELS: ReelItem[] = [
  { id: 'r1', title: 'Morning prep', duration: '00:18' },
  { id: 'r2', title: 'Lunch menu', duration: '00:24' },
];

export default function MediaGalleryScreen() {
  const { colors } = useTheme();
  const { activeRole, selectedBusiness } = useBusinessSession();

  const canManageMedia = can(activeRole, 'profile.edit');
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);

  const addPhoto = () => {
    if (!canManageMedia) return;
    const nextNumber = photos.length + 1;
    setPhotos((prev) => [...prev, { id: `p-${Date.now()}`, title: `Photo ${nextNumber}` }]);
  };

  const addReel = () => {
    if (!canManageMedia) return;
    const nextNumber = reels.length + 1;
    setReels((prev) => [...prev, { id: `r-${Date.now()}`, title: `Reel ${nextNumber}`, duration: '00:20' }]);
  };

  const removePhoto = (id: string) => {
    if (!canManageMedia) return;
    setPhotos((prev) => prev.filter((item) => item.id !== id));
  };

  const removeReel = (id: string) => {
    if (!canManageMedia) return;
    setReels((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Media Gallery</Text>
        <Text style={[styles.scope, { color: colors.primary }]}>Active business: {selectedBusiness?.name ?? 'N/A'}</Text>

        <View style={[styles.readOnlyBox, { borderColor: colors.warning, backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.text }}>
            {canManageMedia
              ? `Mas opravnenie spravovat media. Rola: ${activeRole}`
              : `Nemozes spravovat media. Rola: ${activeRole}`}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Fotogaleria</Text>
          <View style={styles.photoGrid}>
            {photos.map((item) => (
              <View key={item.id} style={[styles.photoTile, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.photoText, { color: colors.text }]}>{item.title}</Text>
                <Pressable
                  disabled={!canManageMedia}
                  onPress={() => removePhoto(item.id)}
                  style={{ opacity: canManageMedia ? 1 : 0.5 }}>
                  <Text style={{ color: colors.error, fontSize: 12 }}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <Button title="Nahrat fotku z mobilu" onPress={addPhoto} disabled={!canManageMedia} fullWidth />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reels</Text>
          {reels.map((item) => (
            <View key={item.id} style={[styles.reelRow, { borderBottomColor: colors.border }]}>
              <View>
                <Text style={[styles.reelTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.reelMeta, { color: colors.textSecondary }]}>Duration: {item.duration}</Text>
              </View>
              <Pressable
                disabled={!canManageMedia}
                onPress={() => removeReel(item.id)}
                style={{ opacity: canManageMedia ? 1 : 0.5 }}>
                <Text style={{ color: colors.error, fontSize: 12 }}>Remove</Text>
              </Pressable>
            </View>
          ))}
          <Button title="Nahrat Reel z mobilu" onPress={addReel} disabled={!canManageMedia} fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 12,
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  scope: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: -4,
  },
  readOnlyBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoTile: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    justifyContent: 'space-between',
  },
  photoText: {
    fontSize: 13,
    fontWeight: '600',
  },
  reelRow: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reelTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  reelMeta: {
    fontSize: 12,
    marginTop: 2,
  },
});
