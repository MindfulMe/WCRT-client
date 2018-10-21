import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '90%',
    height: 150,
    backgroundColor: '#eee',
    marginBottom: 10,
    shadowColor: 'rgb(53,126,180)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  accountTitle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgb(190,222,250)',
    height: 75,
  },
  titleText: {
    justifyContent: 'space-around',
    height: 75,
  },
  accountDetails: {
    justifyContent: 'space-around',
    backgroundColor: 'rgb(103,176,220)',
    height: 75,
  },
  detailRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
});

export default styles;
