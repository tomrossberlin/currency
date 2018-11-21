import { AsyncStorage } from 'react-native';
import {action, computed, observable} from "mobx";

class CurrencyStore {
  @observable rates = [{"currency": "EUR", "rate": "1"}];
  @observable leftAmount = '0';
  @observable leftCurrency = 'EUR';
  @observable rightCurrency = 'EUR';
  @observable history = [];

  @computed get exchangeRate() {
    const leftCurrencyItem = this.rates.find(rate => rate.currency === this.leftCurrency);
    const rightCurrencyItem = this.rates.find(rate => rate.currency === this.rightCurrency);
    if (!leftCurrencyItem || !rightCurrencyItem) { return 0 }
    return rightCurrencyItem['rate'] / leftCurrencyItem['rate'];
  }

  @computed get rightAmount() {
    return `${Math.round((this.leftAmount * this.exchangeRate)*100)/100}`;
  }

  @action fetchRates = async () => {
    const response = await fetch('https://txf-ecb.glitch.me/rates');
    const onlineRates = await response.json();
    const { rates } = onlineRates;
    rates.push({"currency": onlineRates.base, "rate": "1"});
    rates.sort((a, b) => (a.currency > b.currency) ? 1 : -1);
    this.rates = rates;
  };

  @action saveAppState = async () => {
    console.log('saveAppState');
    const appState = {
      rates: this.rates,
      leftAmount: this.leftAmount,
      leftCurrency: this.leftCurrency,
      rightCurrency: this.rightCurrency,
      history: this.history,
    };
    await AsyncStorage.setItem('appState', JSON.stringify(appState));
  };

  @action loadAppState = async () => {
    const appState = JSON.parse(await AsyncStorage.getItem('appState'));
    this.rates = appState.rates;
    this.leftAmount = appState.leftAmount;
    this.leftCurrency = appState.leftCurrency;
    this.rightCurrency = appState.rightCurrency;
    this.history = appState.history;
  };

  @action setCurrency = (isRightCurrency, currency) => {
    if (isRightCurrency) { this.rightCurrency = currency } else { this.leftCurrency = currency }
  };

  // TODO filter more than one period, filter other letters (entered from hardware keyboard)
  @action setLeftAmount = (amount) => {
    this.leftAmount = amount.replace(/^0/, '')
      .replace(/^$/, '0')
      .replace(/,/, '.')
      .replace(/ /, '')
      .replace(/-/, '')
      .replace(/^\./, '0.');
  };

  @action pushToHistory = () => {
    const historyItem = { leftCurrency: this.leftCurrency, rightCurrency: this.rightCurrency };
    const hasItem = this.history.find(item => (
      item.leftCurrency === historyItem.leftCurrency && item.rightCurrency === historyItem.rightCurrency)
    );
    if (!hasItem) {
      this.history.unshift(historyItem);
      this.history.length > 6 && this.history.pop();
    }
  };
}

export default new CurrencyStore();
