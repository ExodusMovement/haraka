# react-native-behavior

[![npm version](https://badge.fury.io/js/react-native-behavior.svg)](https://badge.fury.io/js/react-native-behavior)

<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/examples/demos/demo1.gif" width="400">

You define the behavior states of the component, and then animate between them.

```javascript
<Behavior
  ref={ref => (this.box = ref)}
  states={[
    { backgroundColor: 'gray' }, // state 0
    { backgroundColor: 'green' }, // state 1
    { opacity: 0.5 }, // state 2
    { rotate: '45deg' } // state 3
  ]}
/>;

// ..

this.box.goTo(1); // animates box's backgroundColor from gray to green
this.box.goTo(2); // animates the opacity of the -now- green box from 1 to 0.5
this.box.goTo(3); // rotates the faded green box 45 degrees, starting from 0

this.box.goTo([1, 2, 3]); // plays a sequence of behavior states, colorize then fade then tilt
```

More demos available [here](https://github.com/sonaye/react-native-behavior/tree/master/examples/demos).

# Install

```bash
yarn add react-native-behavior
```

# Definition

```javascript
type behavior = {
  config?: { // goTo() default configuration
    mode?: 'spring' | 'timing', // default = 'spring'
    callback?: Function, // to be executed after animating to a new state
    ...AnimatedSpringOptions, // excluding toValue, useNativeDriver (see React Native docs)
    ...AnimatedTimingOptions // excluding toValue, useNativeDriver (see React Native docs)
  },
  initialState?: number, // default = 0
  states: Array<{
    backgroundColor?: string, // default = 'transparent'
    height?: number, // no percentages, default = null
    opacity?: number, // [0, 1], default = 1
    rotate?: string, // e.g. '45deg', default = '0deg'
    scale?: number, // default = 1
    translateX?: number, // default = 0
    translateY?: number, // default = 0
    width?: number, // no percentages, default = null
    rotateX?: string, // e.g. '45deg', default = '0deg'
    rotateY?: string, // e.g. '45deg', default = '0deg'
    scaleX?: number, // default = 1
    scaleY?: number, // default = 1
  }>, // minimum two states required
  style?: Object, // default = {}, AnimatedViewStyle (see React Native docs)
  enableGestures?: boolean, // simple swipe up/down/left/right and pressed/long pressed
  onGesture?: Function, // e.g. gesture => console.log(gesture)
  indices?: Array<number>, // can be used with custom drivers to define custom state keys/values
  clamp?: boolean, // default = false, prevent animations from exceeding their ranges
  swipeVelocityThreshold?: number, // default = 0.3
  swipeDistanceThreshold?: number, // default = 10
  animatedNativeValue?: AnimatedValue, // default = new Animated.Value(0), use a custom native driver
  animatedValue?: AnimatedValue, // default = new Animated.Value(0), use a custom driver
  // animatedNativeValue and animatedValue should be used together, different instances of Animated.Value
  // animatedNativeValue is needed for opacity, rotate, scale, translateX and translateY
  // animatedValue is needed for backgroundColor, height and width
  children?: any // the behavior component can enclose other components, can enclose another behavior too
};

// methods
behavior.goTo(index: number | Array<number>, config?: Object = {}) // animate to a specific behavior state

behavior.index // to retrieve current state index
```

## Examples

Available [here](https://github.com/sonaye/react-native-behavior/tree/master/examples).
