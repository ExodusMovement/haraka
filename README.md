# react-native-behavior
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo1.gif" width="400">
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo2.gif" width="400">
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo3.gif" width="400">
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo4.gif" width="400">
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo5.gif" width="400">

You define the behavior (states) of the component, and then animate between them.

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
    height?: number, // no percentages, default = 0
    opacity?: number, // [0, 1], default = 1
    rotate?: string, // e.g. '45deg', default = '0deg'
    scale?: number, // default = 1
    translateX?: number, // default = 0
    translateY?: number, // default = 0
    width?: number, // no percentages
  }>, // minimum two states required
  style?: Object, // default = {}
  enableGestures?: boolean, // simple swipe up/down/left/right and pressed/long pressed
  onGesture?: Function, // e.g. gesture => console.log(gesture)
  indices?: Array<number> // android only, a temporary workaround to fix a glitch
};

// methods
behavior.animateTo(index: number, configs?: Object = {}); // change behavior state
```

## Examples
Available [here](https://github.com/sonaye/react-native-behavior/tree/master/examples).
