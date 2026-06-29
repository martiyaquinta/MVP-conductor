import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

interface UploadSectionProps {
  title: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({ title }) => (
  <View style={styles.uploadBlock}>
    <View style={styles.uploadIcon}>
      <Text style={styles.uploadEmoji}>📄</Text>
    </View>
    <Text style={styles.uploadTitle}>{title}</Text>
    <View style={styles.uploadOptions}>
      <View style={styles.uploadOption}>
        <Text style={styles.optionText}>Sacar foto</Text>
      </View>
      <View style={styles.uploadOption}>
        <Text style={styles.optionText}>Subir de galeria</Text>
      </View>
      <View style={styles.uploadOption}>
        <Text style={styles.optionText}>Subir archivo</Text>
      </View>
    </View>
  </View>
);

export const OnboardingStep2Screen: React.FC = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <Navbar
        title="Paso 2/2"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Subi tus documentos</Text>
        <Text style={styles.subtitle}>
          Los necesitamos para verificar tu identidad
        </Text>

        <UploadSection title="Licencia de conducir" />
        <UploadSection title="Cedula del vehiculo" />
        <UploadSection title="Seguro del vehiculo" />
        <UploadSection title="Antecedentes penales" />

        <Button
          title="VERIFICAR IDENTIDAD"
          onPress={() => navigation.navigate('KYCVerify')}
          style={styles.button}
          disabled={true}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
    marginBottom: theme.spacing.md,
  },
  uploadBlock: {
    width: 343,
    gap: theme.spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadEmoji: {
    fontSize: 24,
  },
  uploadTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
  },
  uploadOptions: {
    width: '100%',
    gap: theme.spacing.sm,
  },
  uploadOption: {
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.deepBlue,
  },
  button: {
    width: 343,
    marginTop: theme.spacing.md,
  },
});
