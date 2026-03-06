import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

const features = [
  { icon: 'scan-outline', jp: 'バーコードスキャン', en: 'Barcode Scanning', color: '#2D6A4F', bg: '#D8F3DC' },
  { icon: 'alert-circle-outline', jp: '期限アラート', en: 'Expiry Alerts', color: '#D4A017', bg: '#FFF3CD' },
  { icon: 'restaurant-outline', jp: 'AIレシピ提案', en: 'AI Recipe Suggestions', color: '#1A6B8A', bg: '#E8F4F8' },
  { icon: 'leaf-outline', jp: '廃棄削減追跡', en: 'Waste Reduction Tracking', color: '#40916C', bg: '#D8F3DC' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Illustration Area */}
      <View style={styles.heroSection}>
        <View style={styles.heroCircle} />
        <View style={styles.heroCircleSmall} />
        <View style={styles.heroIconBox}>
          <Ionicons name="leaf" size={56} color="#fff" />
        </View>
        <Text style={styles.heroJp}>食品廃棄ゼロへ</Text>
        <Text style={styles.heroEn}>Zero Food Waste</Text>
      </View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentBox,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.titleBox}>
          <Text style={styles.titleJp}>フードロスAIへようこそ</Text>
          <Text style={styles.titleEn}>Welcome to FoodLoss AI</Text>
          <Text style={styles.subtitle}>
            Track your food, reduce waste, and help your community with AI-powered tools.
          </Text>
        </View>

        {/* Feature Grid */}
        <View style={styles.featureGrid}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: f.bg }]}>
                <Ionicons name={f.icon as any} size={20} color={f.color} />
              </View>
              <Text style={styles.featureLabelJp}>{f.jp}</Text>
              <Text style={styles.featureLabelEn}>{f.en}</Text>
            </View>
          ))}
        </View>

        {/* Auth Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('./auth/signup')}
          >
            <Ionicons name="person-add-outline" size={18} color="#fff" />
            <View>
              <Text style={styles.primaryButtonJp}>アカウントを作成</Text>
              <Text style={styles.primaryButtonEn}>Create Account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('./auth/login')}
          >
            <Ionicons name="log-in-outline" size={18} color="#2D6A4F" />
            <View>
              <Text style={styles.secondaryButtonJp}>ログイン</Text>
              <Text style={styles.secondaryButtonEn}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F2' },
  heroSection: {
    height: height * 0.32,
    backgroundColor: '#2D6A4F',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: 8,
  },
  heroCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -80,
    right: -60,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -60,
    left: -40,
  },
  heroIconBox: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 4,
  },
  heroJp: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  heroEn: { fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 },
  contentBox: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 20,
  },
  titleBox: { gap: 4 },
  titleJp: { fontSize: 20, fontWeight: '800', color: '#1B1B1B', letterSpacing: 0.5 },
  titleEn: { fontSize: 13, color: '#A0A0A0' },
  subtitle: { fontSize: 13, color: '#666', lineHeight: 20, marginTop: 6 },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureItem: {
    width: '47%',
    backgroundColor: '#FAFAF7',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8E0',
    gap: 6,
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabelJp: { fontSize: 12, fontWeight: '700', color: '#1B1B1B' },
  featureLabelEn: { fontSize: 10, color: '#A0A0A0' },
  buttonGroup: { gap: 10 },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D6A4F',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
  },
  primaryButtonJp: { fontSize: 15, fontWeight: '700', color: '#fff' },
  primaryButtonEn: { fontSize: 10, color: '#B7E4C7' },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAF7',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#2D6A4F',
  },
  secondaryButtonJp: { fontSize: 15, fontWeight: '700', color: '#2D6A4F' },
  secondaryButtonEn: { fontSize: 10, color: '#52B788' },
  termsText: { fontSize: 11, color: '#A0A0A0', textAlign: 'center', lineHeight: 18 },
  termsLink: { color: '#2D6A4F', fontWeight: '600' },
});