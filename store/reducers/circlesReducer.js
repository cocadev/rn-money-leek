const initialState = {
  activeCircles: null,
  finishedCircles: null,
  myActiveCircles: null,
  myFinishedCircles: null,
};
const circlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CIRCLES":
      return { ...state, activeCircles: action.payload };
    case "SET_FINISHED_CIRCLES":
      return { ...state, finishedCircles: action.payload };
    case "SET_MY_ACTIVE_CIRCLES":
      return { ...state, myActiveCircles: action.payload };
    case "SET_MY_FINISHED_CIRCLES":
      return { ...state, myFinishedCircles: action.payload };
    default:
      return state;
  }
};
export default circlesReducer;
