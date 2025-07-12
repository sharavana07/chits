import React, { useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  View, 
  Animated, 
  Dimensions,
  StatusBar,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ChitFundAwarenessCarousel from '../components/ChitFundAwarenessCarousel';

Dimensions.get('window');

const ChitFundsAwarenessScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous animations
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    pulseAnimation.start();
    floatAnimation.start();
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      floatAnimation.stop();
      rotateAnimation.stop();
    };
  }, [fadeAnim, floatAnim, pulseAnim, rotateAnim, scaleAnim, slideAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#0a0a0a', '#1a0a1a', '#2a0a2a', '#1a0a3a']}
          style={styles.backgroundGradient}
        >
          {/* Animated background elements */}
          <Animated.View 
            style={[
              styles.backgroundShape1,
              { transform: [{ rotate: spin }] }
            ]}
          />
          <Animated.View 
            style={[
              styles.backgroundShape2,
              { transform: [{ translateY: floatAnim }] }
            ]}
          />
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header Section */}
            <Animated.View 
              style={[
                styles.headerContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ]
                }
              ]}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53', '#FF6B9D']}
                style={styles.headerGradient}
              >
                <View style={styles.headerContent}>
                  <Animated.View 
                    style={[
                      styles.warningIcon,
                      { transform: [{ scale: pulseAnim }] }
                    ]}
                  >
                    <Text style={styles.warningEmoji}>⚠️</Text>
                  </Animated.View>
                  
                  <Text style={styles.headerTitle}>CHIT FUNDS</Text>
                  <Text style={styles.headerSubtitle}>SCAM AWARENESS</Text>
                  
                  <View style={styles.headerAccent} />
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Alert Banner */}
            <Animated.View 
              style={[
                styles.alertBanner,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <LinearGradient
                colors={['#FF4757', '#FF3742']}
                style={styles.alertGradient}
              >
                <Text style={styles.alertText}>🚨 PROTECT YOURSELF FROM FRAUD</Text>
              </LinearGradient>
            </Animated.View>

            {/* Main Content */}
            <Animated.View 
              style={[
                styles.carouselContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <ChitFundAwarenessCarousel />
            </Animated.View>

            {/* Bottom CTA */}
            <Animated.View 
              style={[
                styles.ctaContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: floatAnim }]
                }
              ]}
            >
              <LinearGradient
                colors={['#00D2FF', '#3A7BD5']}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Stay Informed, Stay Safe</Text>
                <Text style={styles.ctaSubtext}>Report suspicious activities immediately</Text>
              </LinearGradient>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundGradient: {
    flex: 1,
  },
  backgroundShape1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  backgroundShape2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(58, 123, 213, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(58, 123, 213, 0.2)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  headerGradient: {
    padding: 25,
    alignItems: 'center',
    position: 'relative',
  },
  headerContent: {
    alignItems: 'center',
    position: 'relative',
  },
  warningIcon: {
    marginBottom: 10,
  },
  warningEmoji: {
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 0.9,
    marginTop: 5,
  },
  headerAccent: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: [{ translateX: -25 }],
    width: 50,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
  },
  alertBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  alertGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  carouselContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  ctaContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#00D2FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  ctaGradient: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ctaSubtext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 5,
    letterSpacing: 0.5,
  },
});

export default ChitFundsAwarenessScreen;