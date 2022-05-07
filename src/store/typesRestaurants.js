export const typesRestaurants = {
    mutations:{
        ADD_rest: 'add_rest',
        CHANGE_STATUS: 'change_status',
        ADD_ALL_restaurants:'add_all_restaurants',
        restaurants_FAILED: 'restaurants_FAILED',
        restaurants_REQUESTED : 'restaurants_REQUESTED'
    },
    actions:{
        PARSE_restaurants: 'parse_restaurants',
        ADD_restaurant : 'add_restaurant',
        CANCEL_PARSE : 'cancel_parse'
    },
    request_status: {
        REQUESTED: 'requested',
        SUCCEEDED: 'succeeded',
        FAILED: 'failed',
        restaurants_LOADING : 'restaurants_loading',
      }
    
};