# react-native-behavior
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo1.gif" width="400">
<img src="https://raw.githubusercontent.com/sonaye/react-native-behavior/master/demos/demo2.gif" width="400">

# Installation
`yarn add react-native-behavior`

# Definition
```javascript
type behavior = {
  configs?: { // animateTo() default configs
    mode?: 'spring' | 'timing', // default = 'spring'
    callback?: Function, // to be executed after switching to a new state
    ...AnimatedSpringOptions, // excluding toValue, useNativeDriver
    ...AnimatedTimingOptions // excluding toValue, useNativeDriver
  },
  initialState?: number, // default = 0
  states: Array<{
    backgroundColor?: string,
    height?: number, // no percentages
    opacity?: number,
    rotate?: string, // e.g. '0deg', '180deg'
    scale?: number,
    translateX?: number,
    translateY?: number,
    width?: number, // no percentages
  }>, // minimum two states
  style?: Object
};

// methods
behavior.animateTo(index: number, configs?: Object = {});
```
