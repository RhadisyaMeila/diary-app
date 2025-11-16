// src/components/DiaryDetailModal.js
import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { COLORS, SPACE, RADIUS, FONTS, getResponsiveSpacing, getResponsiveTypo, getResponsiveDimensions } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  const { width, height } = useWindowDimensions();
  
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

  if (!entry) return null;
  const { title, date, body, heroUri, moodUri } = entry;

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      presentationStyle="pageSheet"
      statusBarTranslucent={false}
    >
      {/* Header dengan close button */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable 
            onPress={onClose} 
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
          <Text style={[
            styles.headerTitle,
            { 
              fontSize: responsiveTypo.body,
              fontFamily: FONTS.primary
            }
          ]}>
            Detail Catatan
          </Text>
          <View style={styles.placeholder} />
        </View>
      </View>
      
      {/* Content Scrollable */}
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={false}
      >
        {/* Hero Image */}
        <Image 
          source={{ uri: heroUri || moodUri }} 
          style={[
            styles.hero, 
            { height: responsiveDims.heroHeight }
          ]} 
          resizeMode="cover"
          defaultSource={{ uri: 'https://picsum.photos/seed/placeholder/800/450' }}
        />
        
        {/* Content */}
        <View style={[
          styles.content,
          { padding: responsiveSpacing.l }
        ]}>
          {/* Title */}
          <Text style={[
            styles.title,
            { 
              fontSize: responsiveTypo.h1,
              fontFamily: FONTS.primaryBold,
              marginBottom: responsiveSpacing.xs
            }
          ]}>
            {title}
          </Text>
          
          {/* Date */}
          <Text style={[
            styles.date,
            { 
              fontSize: responsiveTypo.caption,
              fontFamily: FONTS.secondary,
              marginBottom: responsiveSpacing.m
            }
          ]}>
            {date}
          </Text>
          
          {/* Body Text */}
          <Text style={[
            styles.body,
            { 
              fontSize: responsiveTypo.body,
              lineHeight: responsiveTypo.body * 1.6,
              fontFamily: FONTS.primary
            }
          ]}>
            {body}
          </Text>

          {/* Close Button */}
          <Pressable 
            onPress={onClose} 
            style={({ pressed }) => [
              styles.button,
              { 
                marginTop: responsiveSpacing.xl, 
                padding: responsiveSpacing.m,
                opacity: pressed ? 0.8 : 1
              }
            ]}
            android_ripple={{ color: COLORS.primary, borderless: false }}
          >
            <Text style={[
              styles.buttonText,
              { fontFamily: FONTS.primaryBold }
            ]}>
              Tutup
            </Text>
          </Pressable>

          {/* Decorative Footer */}
          <View style={[
            styles.footer,
            { marginTop: responsiveSpacing.xl }
          ]}>
            <Text style={[
              styles.footerText,
              { 
                fontSize: responsiveTypo.caption,
                fontFamily: FONTS.secondary
              }
            ]}>
              🌸 Tetap semangat menulis! 🌸
            </Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.surface 
  },
  header: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: SPACE.l,
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  closeText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '300',
  },
  headerTitle: {
    color: COLORS.text,
    opacity: 0.8,
  },
  placeholder: {
    width: 36,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  hero: {
    width: '100%',
    backgroundColor: COLORS.border,
  },
  content: {
    backgroundColor: COLORS.surface,
    flex: 1,
  },
  title: { 
    fontWeight: '700', 
    color: COLORS.text,
  },
  date: { 
    color: COLORS.muted,
  },
  body: { 
    color: COLORS.text,
    textAlign: 'justify',
  },
  button: {
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.accentAlt,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: { 
    color: COLORS.text, 
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACE.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    color: COLORS.muted,
    opacity: 0.7,
  },
});
