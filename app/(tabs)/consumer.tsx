import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

const categories = [
  { jp: 'すべて', en: 'All' },
  { jp: '乳製品', en: 'Dairy' },
  { jp: '野菜', en: 'Veggies' },
  { jp: '果物', en: 'Fruits' },
  { jp: '肉類', en: 'Meat' },
  { jp: 'パン', en: 'Bakery' },
];

const foodItems = [
  { nameJp: '牛乳', nameEn: 'Milk', category: '乳製品', qty: '1L', expiry: '2日後', expiryEn: '2 days', status: 'warning', location: '冷蔵庫', locationEn: 'Fridge' },
  { nameJp: 'ブロッコリー', nameEn: 'Broccoli', category: '野菜', qty: '300g', expiry: '4日後', expiryEn: '4 days', status: 'good', location: '冷蔵庫', locationEn: 'Fridge' },
  { nameJp: 'パン', nameEn: 'Bread', category: 'パン', qty: '1本', expiry: '本日', expiryEn: 'Today', status: 'danger', location: 'パントリー', locationEn: 'Pantry' },
  { nameJp: 'チキン', nameEn: 'Chicken', category: '肉類', qty: '500g', expiry: '1日後', expiryEn: '1 day', status: 'danger', location: '冷凍庫', locationEn: 'Freezer' },
  { nameJp: 'リンゴ', nameEn: 'Apple', category: '果物', qty: '3個', expiry: '6日後', expiryEn: '6 days', status: 'good', location: 'パントリー', locationEn: 'Pantry' },
  { nameJp: 'ヨーグルト', nameEn: 'Yogurt', category: '乳製品', qty: '200g', expiry: '3日後', expiryEn: '3 days', status: 'warning', location: '冷蔵庫', locationEn: 'Fridge' },
];

export default function ConsumerScreen() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [search, setSearch] = useState('');

  const statusColor = (s: string) => s === 'good' ? '#2D6A4F' : s === 'warning' ? '#D4A017' : '#C1121F';
  const statusBg = (s: string) => s === 'good' ? '#D8F3DC' : s === 'warning' ? '#FFF3CD' : '#FFE5E5';
  const statusLabelJp = (s: string) => s === 'good' ? '良好' : s === 'warning' ? '注意' : '期限切れ';

  const filtered = foodItems.filter(item =>
    (selectedCategory === 'すべて' || item.category === selectedCategory) &&
    (item.nameJp.includes(search) || item.nameEn.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appNameJp}>消費者パネル</Text>
          <Text style={styles.appNameEn}>Consumer Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={36} color="#2D6A4F" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          {[
            { jp: '合計アイテム', en: 'Total Items', value: '6', icon: 'cube-outline', color: '#2D6A4F' },
            { jp: '期限間近', en: 'Expiring Soon', value: '3', icon: 'alert-circle-outline', color: '#D4A017' },
            { jp: '期限切れ', en: 'Expired', value: '1', icon: 'close-circle-outline', color: '#C1121F' },
          ].map((s, i) => (
            <View key={i} style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: s.color + '20' }]}>
                <Ionicons name={s.icon as any} size={18} color={s.color} />
              </View>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.summaryLabelJp}>{s.jp}</Text>
              <Text style={styles.summaryLabelEn}>{s.en}</Text>
            </View>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="食品を検索 · Search food items"
            placeholderTextColor="#A0A0A0"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.catChip, selectedCategory === cat.jp && styles.catChipActive]}
              onPress={() => setSelectedCategory(cat.jp)}
            >
              <Text style={[styles.catChipTextJp, selectedCategory === cat.jp && styles.catChipTextActive]}>
                {cat.jp}
              </Text>
              <Text style={[styles.catChipTextEn, selectedCategory === cat.jp && { color: '#fff' }]}>
                {cat.en}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Food List */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionJp}>食品在庫</Text>
          <Text style={styles.sectionEn}>Food Inventory · {filtered.length} items</Text>
        </View>

        <View style={styles.card}>
          {filtered.map((item, i) => (
            <View key={i}>
              <TouchableOpacity style={styles.itemRow}>
                <View style={[styles.itemIconBox, { backgroundColor: statusBg(item.status) }]}>
                  <Ionicons name="nutrition-outline" size={20} color={statusColor(item.status)} />
                </View>
                <View style={styles.itemTextBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                    <Text style={styles.itemNameJp}>{item.nameJp}</Text>
                    <Text style={styles.itemNameEn}>{item.nameEn}</Text>
                    <Text style={styles.itemQty}>· {item.qty}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <Ionicons name="time-outline" size={11} color="#A0A0A0" />
                    <Text style={[styles.itemExpiry, { color: statusColor(item.status) }]}>
                      {item.expiry} ({item.expiryEn})
                    </Text>
                    <Text style={styles.itemLocation}>· {item.locationEn}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusBg(item.status) }]}>
                  <Text style={[styles.statusBadgeText, { color: statusColor(item.status) }]}>
                    {statusLabelJp(item.status)}
                  </Text>
                </View>
              </TouchableOpacity>
              {i < filtered.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-outline" size={20} color="#fff" />
          <Text style={styles.addButtonTextJp}>アイテムを追加</Text>
          <Text style={styles.addButtonTextEn}>Add Food Item</Text>
        </TouchableOpacity>

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
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: {
    flex: 1, backgroundColor: '#FAFAF7', borderRadius: 14, padding: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E0', gap: 3,
  },
  summaryIcon: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  summaryValue: { fontSize: 20, fontWeight: '800' },
  summaryLabelJp: { fontSize: 9, fontWeight: '700', color: '#555', textAlign: 'center' },
  summaryLabelEn: { fontSize: 9, color: '#A0A0A0', textAlign: 'center' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAF7',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 12, gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#1B1B1B' },
  catScroll: { marginBottom: 16 },
  catChip: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: '#E8E8E0',
    backgroundColor: '#FAFAF7', marginRight: 8,
  },
  catChipActive: { backgroundColor: '#2D6A4F', borderColor: '#2D6A4F' },
  catChipTextJp: { fontSize: 12, fontWeight: '700', color: '#555' },
  catChipTextEn: { fontSize: 9, color: '#A0A0A0' },
  catChipTextActive: { color: '#fff' },
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
  itemNameJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B' },
  itemNameEn: { fontSize: 12, color: '#777' },
  itemQty: { fontSize: 11, color: '#A0A0A0' },
  itemExpiry: { fontSize: 11, fontWeight: '600' },
  itemLocation: { fontSize: 11, color: '#A0A0A0' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E8E8E0', marginLeft: 50 },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#2D6A4F', borderRadius: 14, paddingVertical: 14, gap: 8,
  },
  addButtonTextJp: { fontSize: 14, fontWeight: '700', color: '#fff' },
  addButtonTextEn: { fontSize: 11, color: '#B7E4C7' },
});