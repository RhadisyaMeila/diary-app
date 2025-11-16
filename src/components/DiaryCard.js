// src/components/DiaryCard.js
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { COLORS, SPACE, RADIUS, FONTS, getResponsiveSpacing, getResponsiveTypo, getResponsiveDimensions } from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  onPress,
  variant = 'list',
  bgColor,
}) {
  const { width } = useWindowDimensions();
  const responsiveSpacing = getResponsiveSpacing();
  const responsiveTypo = getResponsiveTypo();
  const responsiveDims = getResponsiveDimensions();

  // Dynamic styles that depend on responsive values
  const dynamicStyles = {
    title: {
      fontSize: responsiveTypo.title,
      fontWeight: '700',
      color: COLORS.text,
      fontFamily: FONTS.primaryBold,
      flex: 1,
      marginRight: SPACE.s,
    },
    titleGrid: {
      fontSize: responsiveTypo.title,
      fontWeight: '700',
      color: COLORS.text,
      fontFamily: FONTS.primaryBold,
      marginBottom: 4,
      textAlign: 'center',
    },
    date: {
      fontSize: responsiveTypo.caption,
      color: COLORS.muted,
      fontFamily: FONTS.secondary,
    },
    preview: {
      fontSize: responsiveTypo.body,
      color: COLORS.text,
      opacity: 0.8,
      lineHeight: 18,
      fontFamily: FONTS.primary,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        variant === 'grid' && styles.cardGrid,
        { 
          backgroundColor: bgColor ?? COLORS.surface, 
          opacity: pressed ? 0.9 : 1,
          padding: responsiveDims.cardPadding,
        },
      ]}
      android_ripple={{ color: COLORS.border, borderless: false }}
    >
      <View style={[
        styles.row,
        variant === 'grid' && styles.rowGrid,
      ]}>
        <Image 
          source={{ uri: moodUri }} 
          style={[
            styles.avatar,
            { 
              width: responsiveDims.avatarSize, 
              height: responsiveDims.avatarSize,
              marginRight: variant === 'grid' ? 0 : responsiveSpacing.m,
              marginBottom: variant === 'grid' ? responsiveSpacing.s : 0,
            }
          ]} 
        />
        
        <View style={styles.content}>
          {variant === 'grid' ? (
            // Grid layout
            <>
              <Text 
                style={dynamicStyles.titleGrid}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
              <Text style={dynamicStyles.date}>
                {date}
              </Text>
              <Text 
                style={dynamicStyles.preview}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {preview}
              </Text>
            </>
          ) : (
            // List layout
            <>
              <View style={styles.headerRow}>
                <Text 
                  style={dynamicStyles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
                <Text style={dynamicStyles.date}>
                  {date}
                </Text>
              </View>
              <Text 
                style={dynamicStyles.preview}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {preview}
              </Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
  },
  cardGrid: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 140,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowGrid: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  avatar: {
    borderRadius: RADIUS.avatar,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
});
