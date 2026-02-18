import { useBusinessSession } from "@/src/features/business/businessSession";
import { RootStackParamList } from "@/src/navigation/AppNavigator";
import { useTheme } from "@/src/shared/theme/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type HubItem = {
    title: string;
    description: string;
    route: keyof RootStackParamList;
};

const ITEMS: HubItem[] = [
    {
        title: 'Analytics',
        description: 'KPI, ROI, retencia a feedback',
        route: 'AnalyticsScreen',
    },
    {
        title: 'Profil prevadzky',
        description: 'Otváracie hodiny a kontakty',
        route: 'BusinessProfileScreen',
    },
    {
        title: 'Menu a cenniky',
        description: 'Polozky, ceny a denné menu',
        route: 'MenuPricingScreen',
    },
    {
        title: 'Fotogaleria a Reels',
        description: 'Sprava media obsahu z mobilu',
        route: 'MediaGalleryScreen',
    },
];

export default function BusinessHubScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation<Nav>();
    const { selectedBusiness } = useBusinessSession();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Business</Text>
                <Text style={[styles.scope, { color: colors.primary }]}>
                    Aktivna prevadzka: {selectedBusiness?.name ?? 'N/A'}
                </Text>

                <View style={styles.list}>
                    {ITEMS.map((item) => (
                        <Pressable
                            key={item.title}
                            onPress={() => navigation.navigate(item.route)}
                            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                            <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{item.description}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, padding: 20 },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    scope: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 16,
    },
    list: { gap: 12 },
    card: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardDesc: {
        fontSize: 14,
        marginTop: 6,
        lineHeight: 18,
    },
});