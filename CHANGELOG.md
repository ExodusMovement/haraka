# 0.0.20

- **Breaking**: Project has been renamed to `haraka`.
- **Breaking**: `animatedNativeValue` and `animatedValue` props are now `nativeDriver` and `driver`.
- **Breaking**: `states` props is now just `state`.
- **Breaking**: `mode` option in `goTo()` configuration has been renamed to `type`.
- **Breaking**: `callback` option in `goTo()` configuration has been renamed to `onComplete`.
- State can now be undefined, it will not throw if not passed, the default value is `[{}, {}]`. It will still throw however if you passe an empty array `state={[]}` use `state={undefined}` instead if you want to do this.
- State can now be static `state=[{ /* config */ }]` by passing a single state.
- You can now style the behavior view directly from the props (you still have the option to use the `style` prop too), any additional props are passed to the style object of the view, additional props are style overrides.

```js
<Behavior top={200} left={100} />
```

- You can now use an animation and layout preset from the available presets with the `preset` and `layoutPreset` props.
- You can now get the animation reference instead of playing it immediately with the `ref` option in `goTo()` configuration. This can be useful for animating multiple behaviors with `Animated.sequence` and `Animated.parallel`.
- Use Rollup to bundle the package.

# 0.0.19

- Support rotate and scale native props (`rotateX`, `rotateY`, `scaleX`, `scaleY`).
- Fix `Array.keys()` bug on Android, no need to provide `indices` prop on Android anymore.
- Make the component pure.
