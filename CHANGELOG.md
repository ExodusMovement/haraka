# 0.0.20

- **Breaking**: Project has been renamed to `haraka`. You can continue to use [`react-native-behavior`](https://www.npmjs.com/package/react-native-behavior) if you are already using it in a project (has been stable for over a year), it will not reacive any future updates however and has been deprecated.
- **Breaking**: `animatedNativeValue` prop is now `nativeDriver`.
- **Breaking**: `animatedValue` prop is now `driver`.
- **Breaking**: `states` prop is now just `state` (without the s).
- **Breaking**: `mode` option in `goTo()` configuration has been renamed to `type`.
- **Breaking**: `callback` option in `goTo()` configuration has been renamed to `onComplete`.
- State can now be `undefined`, it will not throw if not passed, the default value is `[{}, {}]`. It will still throw however if you pass an empty array `state={[]}` use `state={undefined}` instead if you want to do this.
- State can now be static `state=[{ /* config */ }]` by passing a single state.
- You can now style the behavior view directly from the props (you still have the option to use the `style` prop too), any additional props are passed to the style object of the view, additional props are style overrides.

```js
<Behavior flex={1} />
```

- You can now use an animation or a layout preset from the available presets, see [the definition](../../#definition) for options.
- You can now get the animation reference instead of playing it immediately with the `ref` option in `goTo()` configuration. This can be useful for composing multiple behavior animations with `Animated.sequence` and `Animated.parallel`.
- Used Rollup to bundle the package.

# 0.0.19

- Support rotate and scale native props (`rotateX`, `rotateY`, `scaleX`, `scaleY`).
- Fix `Array.keys()` bug on Android, no need to provide `indices` prop on Android anymore.
- Make the component pure.
