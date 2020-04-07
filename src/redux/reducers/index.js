const initState = {hello: 'hello world', total: 0};

export default function(state = initState, action) {
  console.log(state);
  console.log('reducer........................');

  switch(action.type) {
    case 'increase':
      return {
        ...state,
        total: state.total + action.payload
      }
    case 'decrease':
      return {
        ...state,
        total: state.total - action.payload
      }
    default:
      return state;
  }
}