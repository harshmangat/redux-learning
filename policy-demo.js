console.clear();
const redux = require("redux");

const { createStore, combineReducers } = redux;



const createClaim = (name, amountToCollect) => {

  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountToCollect
    }
  }
}

const createPolicy = (name) => {

  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: 20
    }
  }
}

const deletePolicy = (name) => {

  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
      amount: 20
    }
  }
}


// Departments (Reducer)=>

const claimPolicy = (state= [], action) => {
  switch(action.type) {
    case 'CREATE_CLAIM' :
      return [...state, action.payload];
      default :
       return state;
  }
}

const accounting = (bagOfMoney = 100, action) => {
  switch(action.type) {
    case 'CREATE_CLAIM':
      return bagOfMoney - action.payload.amountToCollect;

    case 'CREATE_POLICY':
      return bagOfMoney + action.payload.amount;

      default:
        return bagOfMoney;
  }
}

const policies = (listOfPolicies = [], action) => {
  switch (action.type) {
   case 'CREATE_POLICY':
     return [...listOfPolicies, action.payload.name];
     case 'DELETE_POLICY':
       return listOfPolicies.filter(policy => policy !== action.payload.name);
       default:
         return listOfPolicies;
  }
}

/* Company setup=> (creating one object combining all department) */
const ourDepartments = combineReducers({
  accounting,
  claimPolicy,
  policies,
});


/* we can only pass one reducer in store */
const store = createStore(ourDepartments);

store.dispatch(createPolicy('tim'));
store.dispatch(createClaim('tim', 100));
store.dispatch(deletePolicy('tim'));

store.dispatch(createPolicy('Sam'));
store.dispatch(createClaim('Sam', 100));
store.dispatch(deletePolicy('Sam'));

store.dispatch(createPolicy('tommy'));
store.dispatch(createClaim('tommy', 100));
store.dispatch(deletePolicy('tommy'));


console.log(store.getState())