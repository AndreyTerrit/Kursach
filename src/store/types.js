export const types = {
    mutations:{
        ADD_ART: 'add_art',
        CHANGE_STATUS: 'change_status',
        ADD_ALL_ARTICLES:'add_all_articles',
        ARTICLES_FAILED: 'ARTICLES_FAILED',
        ARTICLES_REQUESTED : 'ARTICLES_REQUESTED'
    },
    actions:{
        PARSE_ARTICLES: 'load_modules/parse_articles',
        ADD_ARTICLE : 'add_article',
        CANCEL_PARSE : 'load_modules/cancel_parse'
    },
    request_status: {
        REQUESTED: 'requested',
        SUCCEEDED: 'succeeded',
        FAILED: 'failed',
        ARTICLES_LOADING : 'articles_loading',
      }
    
};