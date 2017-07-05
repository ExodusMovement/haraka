import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Behavior from '../behavior';

const { height, width } = Dimensions.get('window');

class Swiper extends Component {
  componentWillMount() {
    this.props.children.forEach(({ props: { backgroundColor } }, i) => {
      this.indices.push(width * i);
      this.states.push({ backgroundColor });
    });
  }

  indices = [];
  states = [];

  render() {
    const animatedValue = new Animated.Value(0);

    const onScroll = Animated.event([
      { nativeEvent: { contentOffset: { x: animatedValue } } }
    ]);

    return (
      <View style={{ flex: 1 }}>
        <Behavior
          animatedValue={animatedValue}
          clamp
          indices={this.indices}
          states={this.states}
          style={{ height, position: 'absolute', width }}
        />
        <ScrollView
          horizontal
          onScroll={onScroll}
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

const Slide = ({ title, description, extra }) =>
  <View
    style={{ alignItems: 'center', flex: 1, justifyContent: 'center', width }}>
    <Text
      style={{
        backgroundColor: 'transparent',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
      }}>
      {title}
    </Text>

    <Text
      style={{
        backgroundColor: 'transparent',
        color: '#fff',
        textAlign: 'justify',
        marginTop: 40,
        paddingHorizontal: 40
      }}>
      {description}
    </Text>

    {extra}
  </View>;

export default class extends Component {
  componentWillMount() {
    StatusBar.setHidden(true, 'fade');
  }

  render() {
    const lorem =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const button = (
      <TouchableOpacity
        onPress={() => null}
        style={{
          alignItems: 'center',
          borderColor: '#fff',
          borderRadius: 16,
          borderWidth: 0.5,
          height: 32,
          justifyContent: 'center',
          marginTop: 40,
          width: 128
        }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            color: '#fff'
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
    );

    return (
      <Swiper>
        <Slide backgroundColor="#4285f4" description={lorem} title="Lorem" />
        <Slide backgroundColor="#0f9d58" description={lorem} title="Ipsum" />
        <Slide backgroundColor="#f4b400" description={lorem} title="Dolor" />
        <Slide
          backgroundColor="#db4437"
          description={lorem}
          extra={button}
          title="Sit"
        />
      </Swiper>
    );
  }
}
