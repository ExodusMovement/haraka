# react-native-behavior
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo1.gif" width="400">

You define the behavior states of the component, and then animate between them.

```javascript
<Behavior
  ref={ref => (this.box = ref)}
  states={[
    { backgroundColor: 'gray', height: 100, width: 100 }, // state 0
    { backgroundColor: 'green' }, // state 1
    { height: 150 }, // state 2
    { opacity: 0.5 }, // state 3
    { rotate: '45deg' }, // state 4
  ]}
/>

this.box.animateTo(1);
this.box.animateSequence([2, 3, 4]);
```

More demos available [here](https://github.com/sonaye/react-native-behavior/tree/master/demos).

# Installation
`yarn add react-native-behavior`

# Definition
```javascript
type behavior = {
  configs?: { // animateTo() default configs
    mode?: 'spring' | 'timing', // default = 'spring'
    callback?: Function, // to be executed after switching to a new state
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
  }>, // minimum two states required
  style?: Object, // default = {}
  enableGestures?: boolean, // simple swipe up/down/left/right and pressed/long pressed
  onGesture?: Function, // e.g. gesture => console.log(gesture)
  indices?: Array<number>, // required on android, can also be used with custom drivers to define state keys
  clamp?: boolean, // default = false, prevent animations from exceeding their ranges
  swipeThreshold?: { velocity?: number, distance?: number }, // default = { velocity: 0.3, distance: 10 }
  animatedNativeValue?: AnimatedValue, // default = new Animated.Value(0), use a custom native driver
  animatedValue?: AnimatedValue // default = new Animated.Value(0), use a custom driver
  // animatedNativeValue and animatedValue should be used together, different instances of Animated.Value
  // animatedNativeValue is needed for opacity, rotate, scale, translateX and translateY
  // animatedValue is needed for backgroundColor, height and width
};

// methods
behavior.animateTo(index: number, configs?: Object = {}) // animate to a specific behavior state
behavior.animateSequence(indices: Array<number>, configs?: Object = {}) // animate a sequence of behavior states
behavior.getIndex() // retrieve current state index, or you can directly use behavior.index
```

## Examples
Available [here](https://github.com/sonaye/react-native-behavior/tree/master/examples).
