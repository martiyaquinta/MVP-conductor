import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const PaymentMethodScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [selected, setSelected] = useState<'cash' | 'transfer'>('cash');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <Navbar
        title="Metodo de cobro"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Como queres cobrar?</Text>

        <TouchableOpacity
          style={[styles.option, selected === 'cash' && styles.optionSelected]}
          onPress={() => setSelected('cash')}
        >
          <View style={styles.optionHeader}>
            <Text style={styles.optionIcon}>💵</Text>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Efectivo</Text>
              <Text style={styles.optionSubtitle}>Cobras en efectivo al finalizar cada viaje</Text>
            </View>
          </View>
          {selected === 'cash' && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === 'transfer' && styles.optionSelected]}
          onPress={() => setSelected('transfer')}
        >
          <View style={styles.optionHeader}>
            <Text style={styles.optionIcon}>🏦</Text>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Transferencia</Text>
              <Text style={styles.optionSubtitle}>Recibis el pago en tu cuenta bancaria</Text>
            </View>
          </View>
          {selected === 'transfer' && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>

        {selected === 'transfer' && (
          <View style={styles.cvuSection}>
            <Input placeholder="CVU / Alias" containerStyle={styles.input} />
            <Text style={styles.cvuHelp}>
              Encontra tu CVU en la app de tu banco
            </Text>
          </View>
        )}

        <Button
          title="GUARDAR"
          onPress={() => navigation.goBack()}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
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
    alignSelf: 'flex-start',
    width: 343,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  option: {
    width: 343,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  optionSelected: {
    borderColor: theme.colors.turquoise,
    borderWidth: 2,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionInfo: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  optionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  checkmarkText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: theme.fontWeight.bold,
  },
  cvuSection: {
    width: 343,
    gap: theme.spacing.xs,
  },
  input: {
    width: 343,
  },
  cvuHelp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.mediumGray,
  },
  button: {
    width: 343,
    marginTop: theme.spacing.md,
  },
});
