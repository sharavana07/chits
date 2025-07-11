import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  content: string;
  image: ImageSourcePropType;
  gradient: [string, string, ...string[]];
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Looks Easy, But It s a Trap',
    content: 'Chit funds promise easy returns — but most are unregulated.',
    image: require('../assets/chit1.jpeg'),
    gradient: ['#FF416C', '#FF4B2B'],
  },
  {
    id: '2',
    title: 'No Guarantees, Only Risks',
    content: 'If the organizer disappears, you lose everything.',
    image: require('../assets/chit2.jpeg'),
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '3',
    title: 'Too Good to Be True',
    content: 'Schemes offering 30%+ returns are often scams.',
    image: require('../assets/chit3.jpeg'),
    gradient: ['#f093fb', '#f5576c'],
  },
];

const ChitFundAwarenessCarousel: React.FC = () => {
  const [ , setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderSlide = ({ item, index }: { item: Slide; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.slide, { opacity, transform: [{ scale }] }]}>
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.imageShadow} />
            </View>
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.content}>{item.content}</Text>
            </View>
            
            <View style={styles.warningBadge}>
              <Text style={styles.warningText}>⚠️ WARNING</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
            >
              <Animated.View
                style={[
                  styles.paginationDot,
                  { width: dotWidth, opacity },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height: height * 0.8,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  image: {
    width: 280,
    height: 180,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  imageShadow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: -8,
    bottom: -8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    zIndex: -1,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 2,
  },
  content: {
    fontSize: 18,
    color: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  warningBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  warningText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});

export default ChitFundAwarenessCarousel;