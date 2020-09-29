import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) =>({
    type: ActionTypes.ADD_COMMENT,
    payload : comment
})

// POSTING THE COMMENT TO JSON SERVER AND ADDING IT TO API

export const postComment = (dishId, rating, author, comment)=> (dispatch) => {
    const newComment={
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments",{
        method: 'POST',
        body : JSON.stringify(newComment),
        headers:{
            'Content-type':'application/json'
        },
        credentials:'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {console.log('Post Comments', error.message);
      alert('Your Comment could not be posted \n Error' + error.message)})
}
//COMMENTS SECTION END

//POSTING FEEDBACK FORM TO THE SERVER

export const postFeedback = (firstname, lastname, telnum, contactType, email, agree,message)=> () => {
  const newFeedback={
    firstname : firstname,
    lastname : lastname,
    telnum : telnum,
    contactType : contactType,
    email : email,
    agree : agree,
    message : message
  }

  return fetch(baseUrl + "feedback",{
      method: 'POST',
      body : JSON.stringify(newFeedback),
      headers:{
          'Content-type':'application/json'
      },
      credentials:'same-origin'
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
      .then(response => response.json())
      .then(response => alert("Thanks" + JSON.stringify(response)))
      .catch(error => {console.log('Post Comments', error.message);
    })
}

//FEEDBACK FORM END


//DISHES FETCHING
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + "dishes")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};
// thunk end

export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmess
})

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

// COMMENTS FETCH
export const fetchComments = () => (dispatch) => {   
 
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errmess
})

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

//PROMOTIONS FETCHING
//thunk
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + "promotions")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};
// thunk end

export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errmess
})

export const addPromos = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload : promos
});

// LEADERS FETCHING

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  return fetch(baseUrl + "leaders")
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
      .then(response => response.json())
      .then(leaders => dispatch(addLeaders(leaders)))
      .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type : ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type : ActionTypes.LEADERS_FAILED,
  payload : errmess
})

export const addLeaders = (leaders) => ({
  type : ActionTypes.ADD_LEADERS,
  payload : leaders
});