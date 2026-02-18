import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/src/shared/components/Button';
import { useTheme } from '@/src/shared/theme/useTheme';
import { useAuthSession } from '@/src/features/authz/authSession';
import { isSupabaseConfigured } from '@/src/lib/supabase';

type Mode = 'login' | 'register';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { signInWithEmail, signUpWithEmail, isLoading } = useAuthSession();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isRegister = mode === 'register';

  const isFormValid = useMemo(() => {
    if (!email.trim() || !password.trim()) return false;
    if (isRegister && !name.trim()) return false;
    return true;
  }, [email, isRegister, name, password]);

  const onSubmit = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    const message = isRegister
      ? await signUpWithEmail(name.trim(), email.trim(), password)
      : await signInWithEmail(email.trim(), password);

    if (message) setError(message);
    if (isRegister) {
      setSuccess('Registracia prebehla. Skontroluj email a potvrdenie uctu.');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>OneApp B2B</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Prihlasenie partnera</Text>

        {!isSupabaseConfigured ? (
          <View style={[styles.alert, { backgroundColor: colors.surface, borderColor: colors.warning }]}>
            <Text style={[styles.alertText, { color: colors.text }]}>
              Chyba konfiguracie: nastav `EXPO_PUBLIC_SUPABASE_URL` a `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
            </Text>
          </View>
        ) : null}

        <View style={[styles.modeWrap, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Pressable
            onPress={() => setMode('login')}
            style={[styles.modeButton, mode === 'login' && { backgroundColor: colors.primary }]}>
            <Text style={[styles.modeText, { color: mode === 'login' ? '#FFFFFF' : colors.text }]}>
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('register')}
            style={[styles.modeButton, mode === 'register' && { backgroundColor: colors.primary }]}>
            <Text style={[styles.modeText, { color: mode === 'register' ? '#FFFFFF' : colors.text }]}>
              Register
            </Text>
          </Pressable>
        </View>

        {isRegister ? (
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Meno"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="words"
            style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
          />
        ) : null}

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Heslo"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}
        />

        {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
        {success ? <Text style={[styles.error, { color: colors.success }]}>{success}</Text> : null}

        <Button
          title={isRegister ? 'Vytvorit ucet' : 'Prihlasit'}
          onPress={onSubmit}
          disabled={!isFormValid || loading || isLoading || !isSupabaseConfigured}
          fullWidth
        />

        <View style={styles.providers}>
          <Button title="Apple ID (soon)" onPress={() => {}} variant="outline" fullWidth disabled />
          <Button title="Google (soon)" onPress={() => {}} variant="outline" fullWidth disabled />
        </View>

        {(loading || isLoading) ? <ActivityIndicator color={colors.primary} /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    gap: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  modeWrap: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  modeButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    lineHeight: 18,
  },
  providers: {
    marginTop: 8,
    gap: 8,
  },
  alert: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  alertText: {
    fontSize: 12,
    lineHeight: 18,
  },
});

