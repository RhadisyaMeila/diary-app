// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, FONTS, getResponsiveSpacing, getResponsiveTypo, getResponsiveDimensions } from '../styles/tokens';

const DATA = [
  { 
    id: 1, 
    title: 'Pagi yang Tenang', 
    date: '2025-10-06', 
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...', 
    body: 'Hari ini aku bangun lebih pagi dari biasanya. Cuaca sangat cerah dan udara terasa sejuk. Aku memutuskan untuk berjalan kaki sekitar 20 menit ke taman dekat rumah. Burung-burung berkicau dengan riang, dan ada beberapa orang tua yang sedang melakukan tai chi. Rasanya menyegarkan sekali memulai hari dengan cara seperti ini. Aku harus lebih sering bangun pagi!', 
    moodUri: 'https://picsum.photos/seed/happy/80', 
    heroUri: 'https://picsum.photos/seed/happyhero/800/450'  
  },
  { 
    id: 2, 
    title: 'Produktif di Kampus', 
    date: '2025-10-05', 
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...', 
    body: 'Hari yang sangat produktif di kampus. Berhasil menyelesaikan modul praktikum pemrograman mobile yang cukup menantang. Diskusi dengan tim project berjalan lancar, banyak insight baru tentang UI/UX design yang kami dapatkan. Presentasi berjalan baik dan dosen memberikan feedback yang membangun. Senang bisa belajar hal baru setiap hari.', 
    moodUri: 'https://picsum.photos/seed/focus/80', 
    heroUri: 'https://picsum.photos/seed/focushero/800/450' 
  },
  { 
    id: 3, 
    title: 'Senja di Taman', 
    date: '2025-10-04', 
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...', 
    body: 'Menikmati senja di taman kampus sambil membaca buku favorit. Warna langit berubah dari jingga ke ungu, sangat memukau. Buku yang kubaca tentang mindfulness membuatku lebih menghargai momen-momen kecil seperti ini. Kadang kita terlalu sibuk sampai lupa untuk berhenti sejenak dan menikmati keindahan sekitar.', 
    moodUri: 'https://picsum.photos/seed/calm/80', 
    heroUri: 'https://picsum.photos/seed/calmhero/800/450' 
  },
  { 
    id: 4, 
    title: 'Ngoding lagi', 
    date: '2025-10-14', 
    preview: 'Lagi coba nyusun Layout Nih', 
    body: 'Hari ini full ngoding dari pagi sampai malam. Lagi mencoba menyusun layout untuk project React Native yang responsif. Butuh waktu cukup lama untuk memahami Flexbox dan styling di React Native, tapi hasilnya memuaskan. Belajar banyak tentang adaptive design dan bagaimana membuat aplikasi yang bisa berjalan baik di berbagai ukuran layar.', 
    moodUri: 'https://picsum.photos/seed/code/90', 
    heroUri: 'https://picsum.photos/seed/codehero/800/450' 
  },
  { 
    id: 5, 
    title: 'Hujan di Sore Hari', 
    date: '2025-10-03', 
    preview: 'Hujan turun dengan derasnya, menemani aku menyelesaikan novel...', 
    body: 'Sore ini hujan turun cukup deras. Suara rintik hujan di atap menjadi background music yang sempurna sambil aku menyelesaikan novel yang sudah lama tertunda. Aroma tanah basah dan segar mengingatkanku pada masa kecil dulu. Kadang hujan bukan halangan, tapi justru memberikan ketenangan tersendiri untuk merenung dan menikmati waktu sendirian.', 
    moodUri: 'https://picsum.photos/seed/rainy/80', 
    heroUri: 'https://picsum.photos/seed/rainyday/800/450' 
  },
  { 
    id: 6, 
    title: 'Kopi & Inspirasi', 
    date: '2025-10-02', 
    preview: 'Menemukan kedai kopi baru dengan suasana yang cozy...', 
    body: 'Hari ini tidak sengaja menemukan kedai kopi kecil di sudut jalan. Suasana dalamnya sangat cozy dengan pencahayaan hangat dan buku-buku berjajar rapi. Kopi tubruk-nya autentik sekali. Di sini akhirnya aku mendapatkan inspirasi untuk menulis cerita pendek yang sudah lama terpendam. Tempat yang tepat untuk mengisi ulang kreativitas!', 
    moodUri: 'https://picsum.photos/seed/coffee/80', 
    heroUri: 'https://picsum.photos/seed/coffeeshop/800/450' 
  },
  { 
    id: 7, 
    title: 'Olahraga Pagi', 
    date: '2025-10-01', 
    preview: 'Memulai rutinitas olahraga pagi setelah lama vakum...', 
    body: 'Hari pertama kembali berolahraga setelah sekian lama. Awalnya berat sekali bangun pagi, tapi setelah memaksakan diri, rasanya luar biasa! Lari-lari kecil di sekitar kompleks sambil menghirup udara segar membuat tubuh terasa lebih bugar dan pikiran lebih jernih. Semoga bisa konsisten dengan rutinitas baru ini. Health is wealth!', 
    moodUri: 'https://picsum.photos/seed/sport/80', 
    heroUri: 'https://picsum.photos/seed/morningrun/800/450' 
  },
  { 
    id: 8, 
    title: 'Reuni Virtual', 
    date: '2025-09-30', 
    preview: 'Bertemu teman-teman SMP lewat video call setelah bertahun-tahun...', 
    body: 'Malam ini ada reuni virtual dengan teman-teman SMP. Senang sekali bisa melihat wajah-wajah yang sudah lama tidak berjumpa. Meski hanya melalui layar, tawa dan cerita-cerita nostalgia mengalir begitu saja. Beberapa sudah berkeluarga, ada yang sukses di karirnya, masing-masing sudah menjalani kehidupan yang berbeda. Waktu berlalu begitu cepat!', 
    moodUri: 'https://picsum.photos/seed/friends/80', 
    heroUri: 'https://picsum.photos/seed/reunion/800/450' 
  }
];

export default function DiaryListScreen() {
  const [selected, setSelected] = useState(null);
  const { width } = useWindowDimensions();
  
  // Safe defaults dengan fallback values
  const responsiveSpacing = getResponsiveSpacing() || { xs: 4, s: 8, m: 12, l: 16, xl: 24, xxl: 32 };
  const responsiveTypo = getResponsiveTypo() || { h1: 26, title: 16, body: 14, caption: 12 };
  const responsiveDims = getResponsiveDimensions() || {
    avatarSize: 48,
    cardPadding: 16,
    heroHeight: 300,
    layoutMode: 'list',
    columns: 1,
  };

  // Safe destructuring dengan defaults
  const { layoutMode = 'list', columns = 1 } = responsiveDims;

  // urutan warna yang akan dipakai berulang berdasarkan index
  const cardColors = useMemo(() => [
    COLORS.accentAlt,   // pink
    COLORS.accent,      // ungu
    COLORS.accentYellow,// kuning
    COLORS.accentBlue,  // biru
  ], []);

  const renderItem = ({ item, index }) => {
    const bg = cardColors[index % cardColors.length];
    
    return (
      <View style={[
        styles.itemWrap,
        layoutMode === 'grid' && styles.itemWrapGrid
      ]}>
        <DiaryCard 
          {...item} 
          bgColor={bg} 
          onPress={() => setSelected(item)}
          variant={layoutMode}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={[
        styles.headerWrap,
        { 
          paddingHorizontal: responsiveSpacing.l,
          paddingTop: responsiveSpacing.xl,
          paddingBottom: responsiveSpacing.s,
        }
      ]}>
        <Text style={[
          styles.header,
          { 
            fontSize: responsiveTypo.h1,
            fontFamily: FONTS.primaryBold
          }
        ]}>
          🌷 Buku Harian 🌷
        </Text>
        <Text style={[
          styles.motif,
          { 
            fontSize: responsiveTypo.body,
            fontFamily: FONTS.secondary,
            marginTop: responsiveSpacing.xs
          }
        ]}>
          💭 Jangan lupa menulis sesuatu hari ini ya~
        </Text>
        <View style={[
          styles.rule,
          { marginTop: responsiveSpacing.s }
        ]} />
      </View>

      {/* Diary List */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          { 
            padding: responsiveSpacing.l,
            gap: responsiveSpacing.m,
          },
          layoutMode === 'grid' && styles.listContentGrid
        ]}
        showsVerticalScrollIndicator={false}
        numColumns={layoutMode === 'grid' ? columns : 1}
        key={layoutMode} // Important for re-rendering when layout changes
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[
              styles.empty,
              { 
                fontSize: responsiveTypo.body,
                fontFamily: FONTS.primary
              }
            ]}>
              Belum ada entri.
            </Text>
            <Text style={[
              styles.emptySubtitle,
              { 
                fontSize: responsiveTypo.caption,
                fontFamily: FONTS.secondary,
                marginTop: responsiveSpacing.s
              }
            ]}>
              Mulai tulis cerita harianmu yang pertama! ✨
            </Text>
          </View>
        }
      />

      {/* Detail Modal */}
      <DiaryDetailModal 
        visible={!!selected} 
        entry={selected} 
        onClose={() => setSelected(null)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  headerWrap: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    fontWeight: '700',
    color: '#b26fa0',
    textAlign: 'center',
  },
  motif: {
    color: COLORS.muted,
    textAlign: 'center',
  },
  rule: {
    height: 6,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#F3EAF8',
  },
  listContent: {
    paddingBottom: 120,
  },
  listContentGrid: {
    // Grid styling akan dihandle oleh numColumns
  },
  itemWrap: {
    flex: 1,
  },
  itemWrapGrid: {
    flex: 1,
    margin: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: COLORS.muted,
    opacity: 0.7,
  },
});
