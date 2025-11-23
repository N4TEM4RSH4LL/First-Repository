import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Extended gradient presets
const gradientPresets = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D', '#FF8C42'], emoji: '🌅' },
  { name: 'Ocean', colors: ['#4ECDC4', '#44A08D', '#093637'], emoji: '🌊' },
  { name: 'Purple Dream', colors: ['#667EEA', '#764BA2', '#F093FB'], emoji: '💜' },
  { name: 'Forest', colors: ['#134E5E', '#71B280', '#A8E6CF'], emoji: '🌲' },
  { name: 'Fire', colors: ['#FF416C', '#FF4B2B', '#FF6B35'], emoji: '🔥' },
  { name: 'Cosmic', colors: ['#0F2027', '#203A43', '#2C5364'], emoji: '🌌' },
  { name: 'Aurora', colors: ['#00F5FF', '#00D4FF', '#0099CC'], emoji: '🌌' },
  { name: 'Lavender', colors: ['#E0B0FF', '#DA70D6', '#BA55D3'], emoji: '💐' },
  { name: 'Mint', colors: ['#98FF98', '#90EE90', '#3CB371'], emoji: '🌿' },
  { name: 'Sunrise', colors: ['#FFB347', '#FF8C00', '#FF6347'], emoji: '☀️' },
  { name: 'Midnight', colors: ['#191970', '#000080', '#000033'], emoji: '🌙' },
  { name: 'Candy', colors: ['#FF69B4', '#FF1493', '#FFC0CB'], emoji: '🍬' },
];

// Color picker colors
const colorPickerColors = [
  ['#FF0000', '#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00'],
  ['#ADFF2F', '#7FFF00', '#00FF00', '#32CD32', '#00FA9A', '#00CED1'],
  ['#00BFFF', '#1E90FF', '#0000FF', '#4169E1', '#8A2BE2', '#9400D3'],
  ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB', '#DC143C', '#C71585'],
  ['#800080', '#4B0082', '#000000', '#2F4F4F', '#696969', '#FFFFFF'],
];

export default function App() {
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [customColors, setCustomColors] = useState(['#FF6B6B', '#4ECDC4', '#667EEA']);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingColorIndex, setEditingColorIndex] = useState(0);
  const [savedGradients, setSavedGradients] = useState([]);
  const [isMorphing, setIsMorphing] = useState(false);
  const [morphProgress, setMorphProgress] = useState(0);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const particles = useRef(
    Array.from({ length: 20 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      scale: new Animated.Value(Math.random() * 0.5 + 0.3),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.3),
    }))
  ).current;

  // Continuous morphing animation
  useEffect(() => {
    const morph = Animated.loop(
      Animated.sequence([
        Animated.timing(morphAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(morphAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    morph.start();

    morphAnim.addListener(({ value }) => {
      setMorphProgress(value);
    });

    return () => {
      morphAnim.removeAllListeners();
      morph.stop();
    };
  }, []);

  // Particle animation
  useEffect(() => {
    particles.forEach((particle) => {
      const animateParticle = () => {
        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: Math.random() * width,
            duration: 5000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Can't use native driver for layout properties
          }),
          Animated.timing(particle.y, {
            toValue: Math.random() * height,
            duration: 5000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Can't use native driver for layout properties
          }),
          Animated.sequence([
            Animated.timing(particle.scale, {
              toValue: Math.random() * 0.5 + 0.5,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: Math.random() * 0.3 + 0.3,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.5 + 0.5,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.3 + 0.2,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          animateParticle();
        });
      };
      animateParticle();
    });
  }, []);

  // Pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  const animateGradient = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
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
          toValue: 1.1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const changeGradient = (index) => {
    animateGradient();
    setSelectedGradient(index);
    setCustomColors(gradientPresets[index].colors);
  };

  const randomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradientPresets.length);
    changeGradient(randomIndex);
  };

  const randomCustomGradient = () => {
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const newColors = [
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor(),
    ];
    setCustomColors(newColors);
    animateGradient();
  };

  const selectColor = (color) => {
    const newColors = [...customColors];
    newColors[editingColorIndex] = color;
    setCustomColors(newColors);
    animateGradient();
    setShowColorPicker(false);
  };

  const saveGradient = () => {
    const newGradient = {
      name: `Custom ${savedGradients.length + 1}`,
      colors: [...customColors],
      emoji: '💾',
    };
    setSavedGradients([...savedGradients, newGradient]);
    
    // Animate save
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadGradient = (colors) => {
    setCustomColors(colors);
    animateGradient();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  // Morph gradient colors based on animation
  const getMorphedColors = () => {
    if (selectedGradient < gradientPresets.length) {
      const preset = gradientPresets[selectedGradient];
      const nextIndex = (selectedGradient + 1) % gradientPresets.length;
      const nextPreset = gradientPresets[nextIndex];
      
      return customColors.map((color, i) => {
        // Simple color interpolation (you could use a color library for better results)
        return color; // For now, use custom colors
      });
    }
    return customColors;
  };

  const currentColors = getMorphedColors();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Gradient Background with Morphing */}
      <Animated.View
        style={[
          styles.gradientContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolate },
            ],
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

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Animation */}
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Text style={styles.title}>✨ Gradient Studio ✨</Text>
          <Text style={styles.subtitle}>Create • Mix • Explore</Text>
        </Animated.View>

        {/* Main Gradient Display Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => randomCustomGradient()}
          style={styles.gradientCard}
        >
          <LinearGradient
            colors={currentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientPreview}
          >
            <View style={styles.gradientOverlay}>
              <Text style={styles.gradientName}>
                {selectedGradient < gradientPresets.length
                  ? `${gradientPresets[selectedGradient].emoji} ${gradientPresets[selectedGradient].name}`
                  : 'Custom Gradient'}
              </Text>
              <Text style={styles.tapHint}>Tap to randomize colors</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Custom Color Editors */}
        <View style={styles.colorEditorsContainer}>
          <Text style={styles.sectionTitle}>🎨 Customize Colors</Text>
          <View style={styles.colorEditors}>
            {customColors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setEditingColorIndex(index);
                  setShowColorPicker(true);
                }}
                style={[styles.colorEditor, index < customColors.length - 1 && { marginRight: 10 }]}
              >
                <Animated.View
                  style={[
                    styles.colorEditorDot,
                    { backgroundColor: color },
                    editingColorIndex === index && {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                />
                <Text style={styles.colorEditorLabel}>Color {index + 1}</Text>
                <Text style={styles.colorCode}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preset Gradients */}
        <View style={styles.presetsContainer}>
          <Text style={styles.sectionTitle}>🌟 Preset Gradients</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.presetsScroll}
          >
            {gradientPresets.map((gradient, index) => (
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
                >
                  <Text style={styles.presetEmoji}>{gradient.emoji}</Text>
                </LinearGradient>
                <Text style={styles.presetName}>{gradient.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Saved Gradients */}
        {savedGradients.length > 0 && (
          <View style={styles.savedContainer}>
            <Text style={styles.sectionTitle}>💾 Saved Gradients</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.presetsScroll}
            >
              {savedGradients.map((gradient, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => loadGradient(gradient.colors)}
                  style={styles.presetButton}
                >
                  <LinearGradient
                    colors={gradient.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.presetGradient}
                  >
                    <Text style={styles.presetEmoji}>{gradient.emoji}</Text>
                  </LinearGradient>
                  <Text style={styles.presetName}>{gradient.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { marginBottom: 12 }]}
            onPress={randomGradient}
          >
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🎲 Random Preset</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { marginBottom: 12 }]}
            onPress={randomCustomGradient}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8C42']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>🌈 Random Colors</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={saveGradient}
          >
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>💾 Save Gradient</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Color Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Current Gradient Colors</Text>
          <View style={styles.colorList}>
            {currentColors.map((color, index) => (
              <View key={index} style={[styles.colorItem, index < currentColors.length - 1 && { marginBottom: 12 }]}>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
                <Text style={styles.colorCode}>{color}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <View style={styles.colorPickerOverlay}>
          <TouchableOpacity
            style={styles.colorPickerBackdrop}
            onPress={() => setShowColorPicker(false)}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              styles.colorPickerModal,
              {
                transform: [{ translateY: slideInterpolate }],
              },
            ]}
          >
            <Text style={styles.colorPickerTitle}>Pick a Color</Text>
            <View style={styles.colorPickerGrid}>
              {colorPickerColors.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.colorPickerRow}>
                  {row.map((color, colorIndex) => (
                    <TouchableOpacity
                      key={colorIndex}
                      onPress={() => selectColor(color)}
                      style={[
                        styles.colorPickerSwatch,
                        { backgroundColor: color },
                        customColors[editingColorIndex] === color &&
                          styles.colorPickerSwatchActive,
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowColorPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Save Notification */}
      <Animated.View
        style={[
          styles.saveNotification,
          {
            transform: [{ translateY: slideInterpolate }],
            opacity: slideAnim,
          },
        ]}
      >
        <Text style={styles.saveNotificationText}>✨ Gradient Saved!</Text>
      </Animated.View>
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
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  gradientCard: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  gradientPreview: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  gradientName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  colorEditorsContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  colorEditors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorEditor: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  colorEditorDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  colorEditorLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  colorCode: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    opacity: 0.9,
  },
  presetsContainer: {
    marginBottom: 25,
  },
  presetsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  presetButton: {
    width: 110,
    marginRight: 12,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  presetButtonActive: {
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  presetGradient: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presetEmoji: {
    fontSize: 40,
  },
  presetName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  savedContainer: {
    marginBottom: 25,
  },
  actionsContainer: {
    marginBottom: 25,
  },
  actionButton: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  colorList: {
    // gap not supported, using marginBottom on items instead
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 14,
    borderRadius: 12,
  },
  colorDot: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  colorCode: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  colorPickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  colorPickerModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 25,
    width: width * 0.85,
    maxHeight: height * 0.6,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  colorPickerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  colorPickerGrid: {
    // gap not supported
  },
  colorPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  colorPickerSwatch: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorPickerSwatchActive: {
    borderColor: '#333',
    transform: [{ scale: 1.2 }],
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#667EEA',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveNotification: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  saveNotificationText: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    fontSize: 16,
    fontWeight: '600',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
