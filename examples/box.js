import React from 'react'

import { Button, View } from 'react-native'

import Behavior from '../src/behavior'

class Box extends React.PureComponent {
  state = {
    currentState: 0,
  }

  goTo = (nextState) => {
    this.setState({ currentState: nextState })
  }

  render() {
    const { currentState } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.behaviorContainer}>
          <Behavior
            config={{ type: 'timing', duration: 250 }}
            currentState={currentState}
            state={[
              {},
              { opacity: 0.5 },
              { rotate: '45deg' },
              { scale: 1.5 },
              { translateX: -50 },
              { translateY: -50 },
            ]}
            style={styles.behavior}
          />
        </View>

        <View style={styles.stepsContainer}>
          <Button color="#0f9d58" title="original" onPress={() => this.goTo(0)} />
          <Button color="#0f9d58" title="opacity" onPress={() => this.goTo(1)} />
          <Button color="#0f9d58" title="rotate" onPress={() => this.goTo(2)} />
          <Button color="#0f9d58" title="scale" onPress={() => this.goTo(3)} />
          <Button color="#0f9d58" title="translateX" onPress={() => this.goTo(4)} />
          <Button color="#0f9d58" title="translateY" onPress={() => this.goTo(5)} />
        </View>
      </View>
    )
  }
}

const styles = {
  container: { flex: 1 },
  behaviorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  behavior: {
    backgroundColor: '#0f9d58',
    height: 100,
    width: 100,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}

export default Box
