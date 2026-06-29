import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const UploadDocumentScreen: React.FC = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <Navbar
        title="Subir documento"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Licencia de conducir</Text>
        <Text style={styles.subtitle}>
          Subi el frente y dorso de tu licencia
        </Text>
        <View style={styles.preview}>
          <Text style={styles.previewIcon}>📄</Text>
          <Text style={styles.previewText}>Todavia no subiste nada</Text>
        </View>
        <View style={styles.options}>
          <View style={styles.option}>
            <Text style={styles.optionText}>📷  Sacar foto</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>🖼  Subir de galeria</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>📁  Subir archivo</Text>
          </View>
        </View>
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
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  preview: {
    width: 343,
    height: 200,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  previewIcon: {
    fontSize: 40,
  },
  previewText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  options: {
    width: 343,
    gap: theme.spacing.sm,
  },
  option: {
    height: 64,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
  },
});
