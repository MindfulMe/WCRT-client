import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontWeight: '200',
    fontSize: 28,
    letterSpacing: -0.5,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
    alignItems: 'center',
  },
  subtext: {
    color: '#fff',
    fontWeight: '900',
    paddingTop: 10,
    fontSize: 8,
    letterSpacing: -0.5,
    alignSelf: 'center',
  },
});

export default styles;
