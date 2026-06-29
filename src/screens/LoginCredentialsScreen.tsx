import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const LoginCredentialsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 16 }} />
      <Text style={styles.title}>Iniciar sesion</Text>
      <Text style={styles.subtitle}>Ingresa tu usuario y contrasena</Text>
      <View style={{ height: 8 }} />
      <Input
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        containerStyle={styles.inputField}
      />
      <Input
        placeholder="Contrasena"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        containerStyle={styles.inputField}
        rightElement={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>👁</Text>
          </TouchableOpacity>
        }
      />
      <View style={{ height: 8 }} />
      <Button
        title="INICIAR SESION"
        onPress={() => navigation.navigate('Online')}
        style={styles.button}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Olvidaste tu contrasena?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  header: {
    height: theme.dimensions.navbarHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  backText: {
    color: theme.colors.deepBlue,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
    width: 327,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
    width: 327,
  },
  inputField: {
    width: 327,
  },
  eyeIcon: {
    fontSize: 16,
    color: theme.colors.mediumGray,
  },
  button: {
    width: 327,
  },
  forgotPassword: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.turquoise,
  },
});
