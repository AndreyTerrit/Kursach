export const types = {
    mutations:{
        ADD_prod: 'add_prod',
        CHANGE_STATUS: 'change_status',
        ADD_ALL_products:'add_all_products',
        products_FAILED: 'products_FAILED',
        products_REQUESTED : 'products_REQUESTED'
    },
    actions:{
        PARSE_products: 'load_modules/parse_products',
        ADD_product : 'add_product',
        CANCEL_PARSE : 'load_modules/cancel_parse'
    },
    request_status: {
        REQUESTED: 'requested',
        SUCCEEDED: 'succeeded',
        FAILED: 'failed',
        products_LOADING : 'products_loading',
      }
    
};