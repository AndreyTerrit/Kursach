

let shopping_cart_module= {
    namespaced: false,
    state:{
        dishes_list : [],
        quantity: 0
    },
    mutations:{
        add_dish(state, dish){
            if(state.dishes_list.find((x) => (x.id_restaurant === dish.id_restaurant) && (x.id === dish.id)) == undefined ){
                dish.quantity_in_cart = 1;
                state.dishes_list.push(dish);
            }
            else{
                let index = state.dishes_list.findIndex((x) => (x.id_restaurant === dish.id_restaurant) && (x.id === dish.id))
                state.dishes_list[index].quantity_in_cart+=1;
            }
            state.quantity += 1;
        },
        delete_dish(state,dish){
            state.dishes_list.splice(state.dishes_list.indexOf(dish),1);
            state.quantity -= dish.quantity_in_cart;
        }
    },
    actions:{
        
    }
}
export default shopping_cart_module;