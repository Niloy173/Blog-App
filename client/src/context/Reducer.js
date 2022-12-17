const Reducer = (CurrentState, Action) => {

    switch (Action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false
        }

      case "LOGIN_SUCCESS":
        return {
          user: Action.payload,
          isFetching: false,
          error: false
        }
      
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true
        }

        case "LOG_OUT":
          return {
            user: null,
            isFetching: false,
            error: false
          }

      /* for updating user settings */
      case "UPDATE_START":
        return {
          ...CurrentState,
          isFetching: true
        }
      
      case "UPDATE_SUCCESS":
        return {
          user: Action.payload,
          isFetching: false,
          error: false
        }

      case "UPDATE_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true
        }

     
    
      default:
        return CurrentState;
    }
}

export default Reducer;