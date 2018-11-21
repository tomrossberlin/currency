import React, {Component} from 'react';
import {KeyboardAvoidingView, Picker, SafeAreaView, Text, TextInput, View} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import i18n from '../i18n';
import styles from './styles/App.styles';

@inject('currencyStore')
@observer
class App extends Component {
  async componentDidMount() {
    const {currencyStore} = this.props;
    await currencyStore.loadAppState().catch(() => null);
    await currencyStore.fetchRates().catch(() => null);
  };

  async componentDidUpdate() {
    const {currencyStore} = this.props;
    await currencyStore.saveAppState();
  }

  handleInputChange = (value) => {
    const {currencyStore} = this.props;
    currencyStore.setLeftAmount(value);
    currencyStore.pushToHistory();
  };

  // TODO extract components: converter, input, picker, output, history
  // TODO style Picker.Item
  // TODO date selector in header
  // TODO animate history bubbles
  render() {
    const {
      columnStyle,
      containerStyle,
      converterWrapperStyle,
      headerStyle,
      headlineStyle,
      historyBubbleStyle,
      historyStyle,
      historyTextStyle,
      inputStyle,
      leftInputStyle,
    } = styles;
    const {currencyStore} = this.props;
    const {rates, leftCurrency, leftAmount, history, rightCurrency, rightAmount} = currencyStore;

    return (
      <SafeAreaView style={containerStyle}>
        <KeyboardAvoidingView style={containerStyle}>
          <View style={headerStyle}>
            <Text style={headlineStyle}>{i18n.t('App.headline')}</Text>
          </View>
          <View style={converterWrapperStyle}>
            <View style={columnStyle}>
              <TextInput
                autoFocus
                keyboardType='numeric'
                maxlength={6}
                onChangeText={this.handleInputChange}
                style={[inputStyle, leftInputStyle]}
                value={leftAmount}
              />
            </View>
            <Picker
              selectedValue={leftCurrency}
              style={columnStyle}
              onValueChange={currency => currencyStore.setCurrency(0, currency)}>
              {rates.map(rate => <Picker.Item key={rate.currency} label={rate.currency} value={rate.currency}/>)}
            </Picker>
            <View style={columnStyle}>
              <TextInput
                editable={false}
                style={inputStyle}
                value={rightAmount}
              />
            </View>
            <Picker
              selectedValue={rightCurrency}
              style={columnStyle}
              onValueChange={currency => currencyStore.setCurrency(1, currency)}>
              {rates.map(rate => <Picker.Item key={rate.currency} label={rate.currency} value={rate.currency}/>)}
            </Picker>
          </View>
          {!!history && <View style={historyStyle}>
            {history.map(item => (
                <View style={historyBubbleStyle}>
                  <Text
                    onPress={() => {
                      currencyStore.setCurrency(0, item.leftCurrency);
                      currencyStore.setCurrency(1, item.rightCurrency);
                    }}
                    style={historyTextStyle}
                  >{`${item.leftCurrency} – ${item.rightCurrency}`}</Text>
                </View>
              )
            )}
          </View>}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

export default App;
