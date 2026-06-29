import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const OnboardingStep1Screen: React.FC = () => {
  const navigation = useAppNavigation();
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.deepBlue} />
      <Navbar
        title="Paso 1/2"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>📷</Text>
          </View>
          <Text style={styles.avatarLabel}>Agregar foto</Text>
        </View>

        <Text style={styles.sectionTitle}>PERFIL</Text>
        <Input placeholder="Nombre completo" containerStyle={styles.input} />
        <Input placeholder="+54 9 XX XXXX-XXXX" containerStyle={styles.input} keyboardType="phone-pad" />

        <View style={{ height: theme.spacing.md }} />

        <Text style={styles.sectionTitle}>VEHICULO</Text>
        <View style={styles.vehicleTypes}>
          {['Auto', 'Moto', 'Camioneta'].map((type) => (
            <TouchableOpacity key={type} style={styles.vehicleType}>
              <Text style={styles.vehicleTypeText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Input placeholder="Patente" containerStyle={styles.input} autoCapitalize="characters" />
        <View style={styles.row}>
          <Input placeholder="Marca" containerStyle={styles.halfInput} />
          <Input placeholder="Modelo" containerStyle={styles.halfInput} />
        </View>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Color del vehiculo</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setChecked(!checked)}>
          <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>
            Acepto los terminos y condiciones
          </Text>
        </TouchableOpacity>

        <Button
          title="CONTINUAR"
          onPress={() => navigation.navigate('OnboardingStep2')}
          disabled={!checked}
          style={styles.button}
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
    gap: theme.spacing.sm,
  },
  avatarSection: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 32,
    color: theme.colors.mediumGray,
  },
  avatarLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  input: {
    width: 343,
  },
  halfInput: {
    flex: 1,
  },
  vehicleTypes: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    width: 343,
  },
  vehicleType: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  vehicleTypeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.deepBlue,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    width: 343,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.dimensions.inputHeight,
    borderRadius: theme.radius.inputRadius,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    paddingHorizontal: theme.spacing.md,
    width: 343,
  },
  dropdownText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.mediumGray,
  },
  dropdownArrow: {
    fontSize: 12,
    color: theme.colors.mediumGray,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    width: 343,
    marginTop: theme.spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.turquoise,
    borderColor: theme.colors.turquoise,
  },
  checkboxLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.deepBlue,
  },
  button: {
    width: 343,
    marginTop: theme.spacing.md,
  },
});
