import { MOVE_BALL_SERVER } from '../actions/ball.action';

const initState = {
  ballTop: 200,
  ballLeft: 150,
};

export default function ballReducer(state = initState, action) {
  const { type, position } = action;

  switch (type) {
    case MOVE_BALL_SERVER:
      return {
        ...state,
        ballTop: position.top,
        ballLeft: position.left,
      };
    default:
      return state;
  }
};
