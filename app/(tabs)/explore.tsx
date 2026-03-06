import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const recipes = [
  { nameJp: '野菜炒め', nameEn: 'Stir-fried Vegetables', time: '15分', timeEn: '15 min', ingredients: ['ブロッコリー', '人参', '玉ねぎ'], difficulty: '簡単', diffEn: 'Easy', tag: '節約', tagEn: 'Budget' },
  { nameJp: 'チキンスープ', nameEn: 'Chicken Soup', time: '30分', timeEn: '30 min', ingredients: ['チキン', '野菜', '豆腐'], difficulty: '普通', diffEn: 'Medium', tag: '健康', tagEn: 'Healthy' },
  { nameJp: 'フルーツスムージー', nameEn: 'Fruit Smoothie', time: '5分', timeEn: '5 min', ingredients: ['リンゴ', 'バナナ', '牛乳'], difficulty: '簡単', diffEn: 'Easy', tag: '期限間近', tagEn: 'Use Soon' },
];

const tips = [
  { jp: '食品の正しい保存方法', en: 'Proper food storage techniques', icon: 'cube-outline', color: '#2D6A4F' },
  { jp: '冷凍保存のコツ', en: 'Tips for freezing food correctly', icon: 'snow-outline', color: '#1A6B8A' },
  { jp: '消費期限と賞味期限の違い', en: 'Best before vs expiry date explained', icon: 'information-circle-outline', color: '#D4A017' },
  { jp: '食品ロス削減の統計', en: 'Food waste statistics in Japan', icon: 'stats-chart-outline', color: '#C1121F' },
];

const foodBanks = [
  { nameJp: '東京フードバンク', nameEn: 'Tokyo Food Bank', dist: '2.3km', open: true },
  { nameJp: '渋谷支援センター', nameEn: 'Shibuya Support Center', dist: '3.8km', open: false },
  { nameJp: '新宿食料支援', nameEn: 'Shinjuku Food Aid', dist: '5.1km', open: true },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'recipes' | 'tips' | 'foodbanks'>('recipes');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appNameJp}>探索する</Text>
          <Text style={styles.appNameEn}>Explore</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={36} color="#2D6A4F" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="レシピ・ヒントを検索 · Search recipes & tips"
            placeholderTextColor="#A0A0A0"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Banner */}
        <View style={styles.bannerBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerJp}>食品ロスをゼロへ</Text>
            <Text style={styles.bannerEn}>Together we can eliminate food waste — explore recipes, tips & nearby resources.</Text>
          </View>
          <View style={styles.bannerIcon}>
            <Ionicons name="earth-outline" size={32} color="#B7E4C7" />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['recipes', 'tips', 'foodbanks'] as const).map((tab) => {
            const labels: Record<string, { jp: string; en: string }> = {
              recipes: { jp: 'レシピ', en: 'Recipes' },
              tips: { jp: 'ヒント', en: 'Tips' },
              foodbanks: { jp: 'フードバンク', en: 'Food Banks' },
            };
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabTextJp, activeTab === tab && styles.tabTextActiveJp]}>
                  {labels[tab].jp}
                </Text>
                <Text style={[styles.tabTextEn, activeTab === tab && styles.tabTextActiveEn]}>
                  {labels[tab].en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>おすすめレシピ</Text>
              <Text style={styles.sectionEn}>Recommended based on your inventory</Text>
            </View>
            {recipes.map((recipe, i) => (
              <TouchableOpacity key={i} style={styles.recipeCard}>
                <View style={styles.recipeHeader}>
                  <View style={styles.recipeIconBox}>
                    <Ionicons name="restaurant-outline" size={24} color="#2D6A4F" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.recipeNameJp}>{recipe.nameJp}</Text>
                    <Text style={styles.recipeNameEn}>{recipe.nameEn}</Text>
                  </View>
                  <View style={styles.recipeTagBadge}>
                    <Text style={styles.recipeTagText}>{recipe.tag}</Text>
                  </View>
                </View>
                <View style={styles.recipeMetaRow}>
                  <View style={styles.recipeMeta}>
                    <Ionicons name="time-outline" size={12} color="#A0A0A0" />
                    <Text style={styles.recipeMetaText}>{recipe.time}</Text>
                  </View>
                  <View style={styles.recipeMeta}>
                    <Ionicons name="bar-chart-outline" size={12} color="#A0A0A0" />
                    <Text style={styles.recipeMetaText}>{recipe.difficulty} · {recipe.diffEn}</Text>
                  </View>
                </View>
                <View style={styles.ingredientRow}>
                  {recipe.ingredients.map((ing, j) => (
                    <View key={j} style={styles.ingredientChip}>
                      <Text style={styles.ingredientText}>{ing}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>食品管理のヒント</Text>
              <Text style={styles.sectionEn}>Food Management Tips</Text>
            </View>
            <View style={styles.card}>
              {tips.map((tip, i) => (
                <View key={i}>
                  <TouchableOpacity style={styles.tipRow}>
                    <View style={[styles.tipIcon, { backgroundColor: tip.color + '20' }]}>
                      <Ionicons name={tip.icon as any} size={20} color={tip.color} />
                    </View>
                    <View style={styles.tipTextBox}>
                      <Text style={styles.tipJp}>{tip.jp}</Text>
                      <Text style={styles.tipEn}>{tip.en}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#bbb" />
                  </TouchableOpacity>
                  {i < tips.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Food Banks Tab */}
        {activeTab === 'foodbanks' && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionJp}>近くのフードバンク</Text>
              <Text style={styles.sectionEn}>Nearby Food Banks</Text>
            </View>
            <View style={styles.card}>
              {foodBanks.map((bank, i) => (
                <View key={i}>
                  <TouchableOpacity style={styles.bankRow}>
                    <View style={[styles.tipIcon, { backgroundColor: bank.open ? '#D8F3DC' : '#F5F5F5' }]}>
                      <Ionicons name="location-outline" size={20} color={bank.open ? '#2D6A4F' : '#A0A0A0'} />
                    </View>
                    <View style={styles.tipTextBox}>
                      <Text style={styles.tipJp}>{bank.nameJp}</Text>
                      <Text style={styles.tipEn}>{bank.nameEn} · {bank.dist}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: bank.open ? '#D8F3DC' : '#F5F5F5' }]}>
                      <Text style={[styles.statusBadgeText, { color: bank.open ? '#2D6A4F' : '#A0A0A0' }]}>
                        {bank.open ? '営業中' : '閉店'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {i < foodBanks.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
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
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAF7',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 12, gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#1B1B1B' },
  bannerBox: {
    backgroundColor: '#2D6A4F', borderRadius: 16, padding: 20,
    marginBottom: 16, flexDirection: 'row', alignItems: 'center',
  },
  bannerJp: { fontSize: 17, fontWeight: '800', color: '#fff', letterSpacing: 1, marginBottom: 4 },
  bannerEn: { fontSize: 11, color: '#B7E4C7', lineHeight: 16, maxWidth: '90%' },
  bannerIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#40916C',
    alignItems: 'center', justifyContent: 'center', marginLeft: 12,
  },
  tabRow: {
    flexDirection: 'row', backgroundColor: '#FAFAF7', borderRadius: 12,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 16, padding: 4,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10 },
  tabItemActive: { backgroundColor: '#D8F3DC' },
  tabTextJp: { fontSize: 11, fontWeight: '700', color: '#A0A0A0' },
  tabTextActiveJp: { color: '#2D6A4F' },
  tabTextEn: { fontSize: 9, color: '#C0C0C0' },
  tabTextActiveEn: { color: '#52B788' },
  sectionHeaderRow: { marginBottom: 10, marginLeft: 2 },
  sectionJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B', letterSpacing: 0.5 },
  sectionEn: { fontSize: 11, color: '#A0A0A0' },
  recipeCard: {
    backgroundColor: '#FAFAF7', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 10,
  },
  recipeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  recipeIconBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#D8F3DC',
    alignItems: 'center', justifyContent: 'center',
  },
  recipeNameJp: { fontSize: 15, fontWeight: '700', color: '#1B1B1B' },
  recipeNameEn: { fontSize: 11, color: '#A0A0A0', marginTop: 1 },
  recipeTagBadge: { backgroundColor: '#D8F3DC', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  recipeTagText: { fontSize: 10, fontWeight: '700', color: '#2D6A4F' },
  recipeMetaRow: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  recipeMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recipeMetaText: { fontSize: 11, color: '#A0A0A0' },
  ingredientRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  ingredientChip: {
    backgroundColor: '#F0F7F0', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 4, borderWidth: 1, borderColor: '#C8E6C9',
  },
  ingredientText: { fontSize: 11, color: '#2D6A4F', fontWeight: '600' },
  card: {
    backgroundColor: '#FAFAF7', borderRadius: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#E8E8E0', marginBottom: 16,
  },
  tipRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  bankRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  tipIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tipTextBox: { flex: 1 },
  tipJp: { fontSize: 13, fontWeight: '700', color: '#1B1B1B' },
  tipEn: { fontSize: 11, color: '#A0A0A0', marginTop: 1 },
  divider: { height: 1, backgroundColor: '#E8E8E0', marginLeft: 50 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '700' },
});