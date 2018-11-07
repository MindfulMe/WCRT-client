import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    top: 250,
  },
  slide: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  title: {
    fontWeight: '300',
    fontSize: 28,
    letterSpacing: -0.5,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 15,
  },
  body: {
    padding: 30,
    paddingRight: 15,
    fontSize: 14,
    letterSpacing: -0.5,
    color: '#fff',
  },
});

export default styles;
