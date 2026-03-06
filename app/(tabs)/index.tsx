import { Ionicons } from '@expo/vector-icons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const stats = [
    { labelJp: '節約食品', labelEn: 'Saved Items', value: '24', icon: 'leaf-outline', color: '#2D6A4F' },
    { labelJp: '廃棄削減', labelEn: 'Waste Reduced', value: '3.2kg', icon: 'trending-down-outline', color: '#40916C' },
    { labelJp: 'スキャン数', labelEn: 'Total Scans', value: '58', icon: 'scan-outline', color: '#52B788' },
  ];

  const recentItems = [
    { nameJp: '牛乳', nameEn: 'Milk', expiry: '2日後', expiryEn: '2 days left', status: 'warning' },
    { nameJp: 'リンゴ', nameEn: 'Apple', expiry: '5日後', expiryEn: '5 days left', status: 'good' },
    { nameJp: 'パン', nameEn: 'Bread', expiry: '本日', expiryEn: 'Expires today', status: 'danger' },
  ];

  const alerts = [
    { msgJp: 'パンが本日期限切れです', msgEn: 'Bread expires today — use it now', icon: 'warning-outline', color: '#C1121F' },
    { msgJp: '牛乳はあと2日です', msgEn: 'Milk expiring soon — plan a recipe', icon: 'alert-circle-outline', color: '#D4A017' },
  ];

  const statusColor = (s: string) => s === 'good' ? '#2D6A4F' : s === 'warning' ? '#D4A017' : '#C1121F';
  const statusBg = (s: string) => s === 'good' ? '#D8F3DC' : s === 'warning' ? '#FFF3CD' : '#FFE5E5';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appNameJp}>フードロスAI</Text>
          <Text style={styles.appNameEn}>FoodLoss AI</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={36} color="#2D6A4F" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Greeting */}
        <View style={styles.greetingBox}>
          <View>
            <Text style={styles.greetingJp}>おはようございます</Text>
            <Text style={styles.greetingEn}>Good Morning — Reduce waste, one scan at a time.</Text>
          </View>
          <View style={styles.greetingBadge}>
            <Ionicons name="leaf" size={22} color="#B7E4C7" />
          </View>
        </View>

        {/* Alerts */}
        {alerts.map((alert, i) => (
          <View key={i} style={[styles.alertBox, { borderLeftColor: alert.color }]}>
            <Ionicons name={alert.icon as any} size={18} color={alert.color} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.alertJp, { color: alert.color }]}>{alert.msgJp}</Text>
              <Text style={styles.alertEn}>{alert.msgEn}</Text>
            </View>
          </View>
        ))}

        {/* Stats */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionJp}>統計概要</Text>
          <Text style={styles.sectionEn}>Overview</Text>
        </View>
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabelJp}>{stat.labelJp}</Text>
              <Text style={styles.statLabelEn}>{stat.labelEn}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionJp}>クイックアクション</Text>
          <Text style={styles.sectionEn}>Quick Actions</Text>
        </View>
        <View style={styles.actionsRow}>
          {[
            { jp: 'スキャン', en: 'Scan Food', icon: 'scan-outline', bg: '#D8F3DC', color: '#2D6A4F' },
            { jp: '追加', en: 'Add Item', icon: 'add-circle-outline', bg: '#FFF3CD', color: '#D4A017' },
            { jp: 'レシピ', en: 'Recipes', icon: 'restaurant-outline', bg: '#E8F4F8', color: '#1A6B8A' },
            { jp: '統計', en: 'Reports', icon: 'bar-chart-outline', bg: '#FFE5E5', color: '#C1121F' },
          ].map((action, i) => (
            <TouchableOpacity key={i} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text style={styles.actionLabelJp}>{action.jp}</Text>
              <Text style={styles.actionLabelEn}>{action.en}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Items */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionJp}>最近のアイテム</Text>
          <Text style={styles.sectionEn}>Recent Items</Text>
        </View>
        <View style={styles.card}>
          {recentItems.map((item, i) => (
            <View key={i}>
              <View style={styles.itemRow}>
                <View style={[styles.itemIconBox, { backgroundColor: statusBg(item.status) }]}>
                  <Ionicons name="nutrition-outline" size={20} color={statusColor(item.status)} />
                </View>
                <View style={styles.itemTextBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.itemNameJp}>{item.nameJp}</Text>
                    <Text style={styles.itemNameEn}> · {item.nameEn}</Text>
                  </View>
                  <Text style={[styles.itemExpiry, { color: statusColor(item.status) }]}>
                    {item.expiry} — {item.expiryEn}
                  </Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: statusColor(item.status) }]} />
              </View>
              {i < recentItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Tip */}
        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={18} color="#2D6A4F" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.tipJp}>本日のヒント</Text>
            <Text style={styles.tipEn}>Store bread in a cool dry place to extend freshness by up to 3 days.</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F2' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#FAFAF7',
    borderBottomWidth: 1, borderBottomColor: '#E8E8E0',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  appNameJp: { fontSize: 18, fontWeight: '800', color: '#2D6A4F', letterSpacing: 1 },
  appNameEn: { fontSize: 11, color: '#A0A0A0', letterSpacing: 0.5 },
  scroll: { paddingHorizontal: 16, paddingTop: 16 },
  greetingBox: {
    backgroundColor: '#2D6A4F', borderRadius: 16, padding: 20,
    marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  greetingJp: { fontSize: 18, fontWeight: '700', color: '#fff', letterSpacing: 1, marginBottom: 4 },
  greetingEn: { fontSize: 11, color: '#B7E4C7', letterSpacing: 0.3, maxWidth: '85%' },
  greetingBadge: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#40916C',
    alignItems: 'center', justifyContent: 'center',
  },
  alertBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAF7',
    borderRadius: 10, padding: 12, marginBottom: 8, borderLeftWidth: 3,
    borderWidth: 1, borderColor: '#E8E8E0',
  },
  alertJp: { fontSize: 12, fontWeight: '700' },
  alertEn: { fontSize: 11, color: '#777', marginTop: 1 },
  sectionHeaderRow: { marginBottom: 10, marginLeft: 2, marginTop: 6 },
  sectionJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B', letterSpacing: 0.5 },
  sectionEn: { fontSize: 11, color: '#A0A0A0', letterSpacing: 0.3 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: '#FAFAF7', borderRadius: 14, padding: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E0', gap: 4,
  },
  statIconBox: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1B1B1B' },
  statLabelJp: { fontSize: 9, fontWeight: '700', color: '#555', textAlign: 'center' },
  statLabelEn: { fontSize: 9, color: '#A0A0A0', textAlign: 'center' },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionCard: {
    flex: 1, backgroundColor: '#FAFAF7', borderRadius: 14, padding: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E0', gap: 6,
  },
  actionIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionLabelJp: { fontSize: 11, fontWeight: '700', color: '#1B1B1B' },
  actionLabelEn: { fontSize: 9, color: '#A0A0A0' },
  card: {
    backgroundColor: '#FAFAF7', borderRadius: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 16,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  itemIconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemTextBox: { flex: 1 },
  itemNameJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B' },
  itemNameEn: { fontSize: 12, color: '#A0A0A0' },
  itemExpiry: { fontSize: 11, marginTop: 2, fontWeight: '500' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  divider: { height: 1, backgroundColor: '#E8E8E0', marginLeft: 50 },
  tipBox: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#D8F3DC',
    borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#B7E4C7',
  },
  tipJp: { fontSize: 12, fontWeight: '700', color: '#2D6A4F', marginBottom: 2 },
  tipEn: { fontSize: 11, color: '#40916C', lineHeight: 16 },
});
