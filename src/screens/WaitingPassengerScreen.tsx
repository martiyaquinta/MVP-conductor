import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../theme';
import { ChatBubble } from '../components/ChatBubble';
import { Button } from '../components/Button';
import { useAppNavigation } from '../hooks/useAppNavigation';

export const WaitingPassengerScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [seconds, setSeconds] = useState(204);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>Cancelar viaje?</Text>
            <Text style={styles.modalText}>
              {seconds > 300
                ? 'Si cancelas antes de los 5 minutos, baja tu tasa de finalizacion.'
                : 'Ya pasaron los 5 minutos de espera. Recibiras una compensacion.'}
            </Text>
            <Button
              title="CANCELAR VIAJE"
              variant="danger"
              onPress={() => { setShowModal(false); navigation.goBack(); }}
              style={styles.modalButton}
            />
            <Button
              title="SEGUIR ESPERANDO"
              onPress={() => setShowModal(false)}
              style={styles.modalButton}
            />
          </View>
        </View>
      )}

      <View style={styles.spacer} />
      <Text style={styles.arrivedLabel}>Llegaste</Text>

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{timerDisplay}</Text>
      </View>

      <Text style={styles.totalWait}>5:00</Text>

      <Text style={styles.waitingFor}>Esperando al pasajero</Text>
      <Text style={styles.address}>en Av. San Martin 450</Text>

      <View style={styles.chatArea}>
        <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatContent}>
          <ChatBubble message="Hola! Ya estoy en la puerta" isDriver={false} />
          <ChatBubble message="Ya voy!" isDriver={true} />
        </ScrollView>
      </View>

      <View style={styles.chatInputRow}>
        <TextInput
          style={styles.chatInput}
          placeholder="Escribi un mensaje..."
          placeholderTextColor={theme.colors.mediumGray}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity>
          <Text style={styles.sendIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="PASAJERO A BORDO"
        onPress={() => navigation.navigate('TripInProgress')}
        style={styles.button}
      />

      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={styles.cancelLink}>Cancelar viaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  spacer: {
    height: 24,
  },
  arrivedLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: theme.radius.full,
    borderWidth: 4,
    borderColor: theme.colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  totalWait: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  waitingFor: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  address: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.mediumGray,
  },
  chatArea: {
    width: 343,
    flex: 1,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 343,
    height: 48,
    borderRadius: theme.radius.inputRadius,
    borderWidth: 1,
    borderColor: theme.colors.mediumGray,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chatInput: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.deepBlue,
    padding: 0,
  },
  sendIcon: {
    fontSize: 18,
    color: theme.colors.turquoise,
    fontWeight: theme.fontWeight.bold,
  },
  button: {
    width: 327,
  },
  cancelLink: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.mediumGray,
    marginBottom: theme.spacing.md,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modal: {
    width: 310,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  modalIcon: {
    fontSize: 32,
  },
  modalTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.deepBlue,
  },
  modalText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.deepBlue,
    textAlign: 'center',
    width: 270,
    lineHeight: 20,
  },
  modalButton: {
    width: 270,
  },
});
