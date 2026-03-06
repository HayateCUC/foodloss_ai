import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const listings = [
  { nameJp: '有機野菜セット', nameEn: 'Organic Veggie Box', qty: '5 boxes', price: '¥300', expiry: '明日', expiryEn: 'Tomorrow', status: 'active' },
  { nameJp: '食パン', nameEn: 'White Bread Loaves', qty: '12 pcs', price: '¥150', expiry: '本日', expiryEn: 'Today', status: 'urgent' },
  { nameJp: '乳製品セット', nameEn: 'Dairy Bundle', qty: '8 units', price: '¥500', expiry: '3日後', expiryEn: '3 days', status: 'active' },
  { nameJp: '冷凍チキン', nameEn: 'Frozen Chicken', qty: '20 packs', price: '¥800', expiry: '7日後', expiryEn: '7 days', status: 'active' },
];

const requests = [
  { orgJp: '地域フードバンク', orgEn: 'Local Food Bank', itemJp: '野菜類', itemEn: 'Vegetables', qty: '10kg', urgent: true },
  { orgJp: '学校給食', orgEn: 'School Cafeteria', itemJp: 'パン・乳製品', itemEn: 'Bread & Dairy', qty: '20 units', urgent: false },
];

export default function ProviderScreen() {
  const [activeTab, setActiveTab] = useState<'listings' | 'requests' | 'analytics'>('listings');

  const statusColor = (s: string) => s === 'active' ? '#2D6A4F' : '#C1121F';
  const statusBg = (s: string) => s === 'active' ? '#D8F3DC' : '#FFE5E5';
  const statusJp = (s: string) => s === 'active' ? '出品中' : '緊急';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appNameJp}>提供者パネル</Text>
          <Text style={styles.appNameEn}>Provider Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={36} color="#2D6A4F" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Summary */}
        <View style={styles.summaryRow}>
          {[
            { jp: '出品数', en: 'Active Listings', value: '4', icon: 'storefront-outline', color: '#2D6A4F' },
            { jp: '寄付量', en: 'Donated (kg)', value: '18kg', icon: 'heart-outline', color: '#40916C' },
            { jp: '廃棄防止', en: 'Waste Prevented', value: '32kg', icon: 'leaf-outline', color: '#52B788' },
            { jp: '評価', en: 'Rating', value: '4.8', icon: 'star-outline', color: '#D4A017' },
          ].map((s, i) => (
            <View key={i} style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: s.color + '20' }]}>
                <Ionicons name={s.icon as any} size={16} color={s.color} />
              </View>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.summaryLabelJp}>{s.jp}</Text>
              <Text style={styles.summaryLabelEn}>{s.en}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['listings', 'requests', 'analytics'] as const).map((tab) => {
            const labels: Record<string, { jp: string; en: string }> = {
              listings: { jp: '出品リスト', en: 'Listings' },
              requests: { jp: 'リクエスト', en: 'Requests' },
              analytics: { jp: '分析', en: 'Analytics' },
            };
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabTextJp, activeTab === tab && styles.tabTextActive]}>
                  {labels[tab].jp}
                </Text>
                <Text style={[styles.tabTextEn, activeTab === tab && { color: '#2D6A4F' }]}>
                  {labels[tab].en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>現在の出品</Text>
              <Text style={styles.sectionEn}>Current Listings</Text>
            </View>
            <View style={styles.card}>
              {listings.map((item, i) => (
                <View key={i}>
                  <View style={styles.itemRow}>
                    <View style={[styles.itemIconBox, { backgroundColor: statusBg(item.status) }]}>
                      <Ionicons name="pricetag-outline" size={18} color={statusColor(item.status)} />
                    </View>
                    <View style={styles.itemTextBox}>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                        <Text style={styles.itemNameJp}>{item.nameJp}</Text>
                        <Text style={styles.itemNameEn}>{item.nameEn}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8, marginTop: 3 }}>
                        <Text style={styles.itemMeta}>{item.qty}</Text>
                        <Text style={styles.itemMeta}>·</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        <Text style={styles.itemMeta}>·</Text>
                        <Text style={[styles.itemExpiry, { color: statusColor(item.status) }]}>
                          {item.expiry}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusBg(item.status) }]}>
                      <Text style={[styles.statusBadgeText, { color: statusColor(item.status) }]}>
                        {statusJp(item.status)}
                      </Text>
                    </View>
                  </View>
                  {i < listings.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-outline" size={20} color="#fff" />
              <Text style={styles.addButtonTextJp}>新しい出品を追加</Text>
              <Text style={styles.addButtonTextEn}>Add New Listing</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>食品リクエスト</Text>
              <Text style={styles.sectionEn}>Incoming Requests</Text>
            </View>
            <View style={styles.card}>
              {requests.map((req, i) => (
                <View key={i}>
                  <View style={styles.itemRow}>
                    <View style={[styles.itemIconBox, { backgroundColor: req.urgent ? '#FFE5E5' : '#D8F3DC' }]}>
                      <Ionicons name="hand-left-outline" size={18} color={req.urgent ? '#C1121F' : '#2D6A4F'} />
                    </View>
                    <View style={styles.itemTextBox}>
                      <Text style={styles.itemNameJp}>{req.orgJp}</Text>
                      <Text style={styles.itemNameEn}>{req.orgEn}</Text>
                      <View style={{ flexDirection: 'row', gap: 6, marginTop: 3 }}>
                        <Text style={styles.itemMeta}>{req.itemJp} · {req.itemEn}</Text>
                        <Text style={styles.itemMeta}>· {req.qty}</Text>
                      </View>
                    </View>
                    {req.urgent && (
                      <View style={[styles.statusBadge, { backgroundColor: '#FFE5E5' }]}>
                        <Text style={[styles.statusBadgeText, { color: '#C1121F' }]}>緊急</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 14, paddingLeft: 50 }}>
                    <TouchableOpacity style={styles.acceptBtn}>
                      <Text style={styles.acceptBtnText}>承認 · Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text style={styles.declineBtnText}>辞退 · Decline</Text>
                    </TouchableOpacity>
                  </View>
                  {i < requests.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>月次レポート</Text>
              <Text style={styles.sectionEn}>Monthly Report — March 2026</Text>
            </View>
            {[
              { jp: '廃棄防止量', en: 'Total Waste Prevented', value: '32kg', icon: 'leaf-outline', color: '#2D6A4F', pct: '78%' },
              { jp: '食品寄付量', en: 'Food Donated', value: '18kg', icon: 'heart-outline', color: '#40916C', pct: '55%' },
              { jp: '出品成約率', en: 'Listing Success Rate', value: '84%', icon: 'checkmark-circle-outline', color: '#52B788', pct: '84%' },
              { jp: 'CO₂削減量', en: 'CO₂ Reduction', value: '12kg', icon: 'cloud-outline', color: '#1A6B8A', pct: '60%' },
            ].map((metric, i) => (
              <View key={i} style={styles.metricCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                    <Ionicons name={metric.icon as any} size={20} color={metric.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.metricJp}>{metric.jp}</Text>
                    <Text style={styles.metricEn}>{metric.en}</Text>
                  </View>
                  <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: metric.pct as any, backgroundColor: metric.color }]} />
                </View>
              </View>
            ))}
          </>
        )}

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
  summaryRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  summaryCard: {
    flex: 1, backgroundColor: '#FAFAF7', borderRadius: 14, padding: 10,
    alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E0', gap: 2,
  },
  summaryIcon: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 2,
  },
  summaryValue: { fontSize: 16, fontWeight: '800' },
  summaryLabelJp: { fontSize: 8, fontWeight: '700', color: '#555', textAlign: 'center' },
  summaryLabelEn: { fontSize: 8, color: '#A0A0A0', textAlign: 'center' },
  tabRow: {
    flexDirection: 'row', backgroundColor: '#FAFAF7', borderRadius: 12,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 16, padding: 4,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10 },
  tabItemActive: { backgroundColor: '#D8F3DC' },
  tabTextJp: { fontSize: 11, fontWeight: '700', color: '#A0A0A0' },
  tabTextActive: { color: '#2D6A4F' },
  tabTextEn: { fontSize: 9, color: '#C0C0C0' },
  sectionHeaderRow: { marginBottom: 10, marginLeft: 2 },
  sectionJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B', letterSpacing: 0.5 },
  sectionEn: { fontSize: 11, color: '#A0A0A0' },
  card: {
    backgroundColor: '#FAFAF7', borderRadius: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 16,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  itemIconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemTextBox: { flex: 1 },
  itemNameJp: { fontSize: 14, fontWeight: '700', color: '#1B1B1B' },
  itemNameEn: { fontSize: 11, color: '#777' },
  itemMeta: { fontSize: 11, color: '#A0A0A0' },
  itemPrice: { fontSize: 11, fontWeight: '700', color: '#2D6A4F' },
  itemExpiry: { fontSize: 11, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E8E8E0', marginLeft: 50 },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#2D6A4F', borderRadius: 14, paddingVertical: 14, gap: 8, marginBottom: 16,
  },
  addButtonTextJp: { fontSize: 14, fontWeight: '700', color: '#fff' },
  addButtonTextEn: { fontSize: 11, color: '#B7E4C7' },
  acceptBtn: {
    backgroundColor: '#D8F3DC', borderRadius: 8, paddingHorizontal: 14,
    paddingVertical: 7, borderWidth: 1, borderColor: '#B7E4C7',
  },
  acceptBtnText: { fontSize: 11, fontWeight: '700', color: '#2D6A4F' },
  declineBtn: {
    backgroundColor: '#FFE5E5', borderRadius: 8, paddingHorizontal: 14,
    paddingVertical: 7, borderWidth: 1, borderColor: '#FFCDD2',
  },
  declineBtnText: { fontSize: 11, fontWeight: '700', color: '#C1121F' },
  metricCard: {
    backgroundColor: '#FAFAF7', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 10,
  },
  metricIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  metricJp: { fontSize: 13, fontWeight: '700', color: '#1B1B1B' },
  metricEn: { fontSize: 11, color: '#A0A0A0' },
  metricValue: { fontSize: 18, fontWeight: '800' },
  progressBar: { height: 4, backgroundColor: '#E8E8E0', borderRadius: 2, marginTop: 12 },
  progressFill: { height: 4, borderRadius: 2 },
});