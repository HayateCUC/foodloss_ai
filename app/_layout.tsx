import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const taglineOpacity = new Animated.Value(0);
  const bgOpacity = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.splashContainer, { opacity: bgOpacity }]}>
      <View style={styles.splashBg} />

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circleTopLeft]} />
      <View style={[styles.circle, styles.circleBottomRight]} />

      <Animated.View
        style={[
          styles.splashContent,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.splashIconWrapper}>
          <Ionicons name="leaf" size={52} color="#fff" />
        </View>
        <Text style={styles.splashTitleJp}>フードロスAI</Text>
        <Text style={styles.splashTitleEn}>FoodLoss AI</Text>
      </Animated.View>

      <Animated.View style={[styles.splashTagline, { opacity: taglineOpacity }]}>
        <Text style={styles.splashTaglineJp}>食品廃棄をなくす、未来へ。</Text>
        <Text style={styles.splashTaglineEn}>Eliminating food waste, one scan at a time.</Text>
      </Animated.View>

      <Animated.Text style={[styles.splashVersion, { opacity: taglineOpacity }]}>
        v1.0.0
      </Animated.Text>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/welcome" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="auth/forgot-password" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D6A4F',
  },
  splashBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2D6A4F',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  circleTopLeft: {
    width: 280,
    height: 280,
    top: -80,
    left: -80,
  },
  circleBottomRight: {
    width: 320,
    height: 320,
    bottom: -100,
    right: -100,
  },
  splashContent: {
    alignItems: 'center',
    gap: 12,
  },
  splashIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  splashTitleJp: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  splashTitleEn: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  splashTagline: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
    gap: 4,
  },
  splashTaglineJp: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    fontWeight: '600',
  },
  splashTaglineEn: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.4,
  },
  splashVersion: {
    position: 'absolute',
    bottom: 60,
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
  },
});
