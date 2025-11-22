import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const colors = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D', '#FF8C42'] },
  { name: 'Ocean', colors: ['#4ECDC4', '#44A08D', '#093637'] },
  { name: 'Purple Dream', colors: ['#667EEA', '#764BA2', '#F093FB'] },
  { name: 'Forest', colors: ['#134E5E', '#71B280', '#A8E6CF'] },
  { name: 'Fire', colors: ['#FF416C', '#FF4B2B', '#FF6B35'] },
  { name: 'Cosmic', colors: ['#0F2027', '#203A43', '#2C5364'] },
];

export default function App() {
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [customColors, setCustomColors] = useState(['#FF6B6B', '#4ECDC4', '#667EEA']);
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateGradient = () => {
    setIsAnimating(true);
    
    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      rotateAnim.setValue(0);
      setIsAnimating(false);
    });
  };

  const changeGradient = (index) => {
    animateGradient();
    setSelectedGradient(index);
  };

  const randomGradient = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    changeGradient(randomIndex);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const currentColors = colors[selectedGradient].colors;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Gradient Background */}
      <Animated.View
        style={[
          styles.gradientContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <LinearGradient
          colors={currentColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🌈 Color Mixer</Text>
          <Text style={styles.subtitle}>Tap to explore gradients</Text>
        </View>

        {/* Current Gradient Display */}
        <View style={styles.gradientCard}>
          <LinearGradient
            colors={currentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientPreview}
          >
            <Text style={styles.gradientName}>{colors[selectedGradient].name}</Text>
          </LinearGradient>
        </View>

        {/* Color Presets */}
        <View style={styles.presetsContainer}>
          <Text style={styles.sectionTitle}>Preset Gradients</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScroll}>
            {colors.map((gradient, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => changeGradient(index)}
                style={[
                  styles.presetButton,
                  selectedGradient === index && styles.presetButtonActive,
                ]}
              >
                <LinearGradient
                  colors={gradient.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.presetGradient}
                />
                <Text style={styles.presetName}>{gradient.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={randomGradient}
            disabled={isAnimating}
          >
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🎲 Random</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Color Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Current Colors</Text>
          <View style={styles.colorList}>
            {currentColors.map((color, index) => (
              <View key={index} style={styles.colorItem}>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
                <Text style={styles.colorCode}>{color}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  gradientCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  gradientPreview: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  presetsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  presetsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  presetButton: {
    width: 120,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  presetButtonActive: {
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  presetGradient: {
    height: 100,
    justifyContent: 'flex-end',
    padding: 10,
  },
  presetName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  colorList: {
    gap: 12,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  colorCode: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
});

