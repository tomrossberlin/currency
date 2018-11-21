import { StyleSheet } from "react-native";

const green = '#4ac55a';

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  converterWrapperStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    padding: 7,
  },
  headlineStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    backgroundColor: '#eeeeee',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'lightgrey',
    marginHorizontal: 8,
  },
  leftInputStyle: {
    backgroundColor: 'white',
    marginLeft: 14,
    borderColor: green,
  },
  columnStyle: {
    width: '25%',
  },
  historyStyle: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 8,
  },
  historyBubbleStyle: {
    backgroundColor: green,
    borderRadius: 20,
    margin: 3,
  },
  historyTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginVertical: 3,
  },
});