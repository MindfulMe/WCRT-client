import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    left: 0,
    right: 0,
    top: 0,
  },
  text: {
    fontWeight: '300',
    fontSize: 28,
    letterSpacing: -0.5,
  },
  button: {
    // paddingVertical: 5,
    paddingHorizontal: 20,
  },
  icon: {
    width: 25,
  },
});

export default styles;
