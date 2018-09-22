import React from 'react';
import { View} from 'react-native';
import { Spinner as SpinnerGraphic } from 'react-native-ios-kit';

export default Spinner = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SpinnerGraphic animating={true} />
    </View>
  );
}
