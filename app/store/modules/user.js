import { required, minLength, between,sameAs,helpers } from 'vuelidate/lib/validators';
const validations = {
    state: {
        user:{
            name: {
                required,
                minLength: minLength(4)
            },
            age: {
                between: between(20, 30)
            },
            testCustom:{
                required,
                isCustom(value,vm) {
                    // simulate async call, fail for all logins with even length
                    return !helpers.req(value) || new Promise((resolve, reject) => {
                        setTimeout(() => {
                        resolve(typeof value === 'string' && value.length % 2 !== 0)
                        }, 350 + Math.random() * 300)
                    })
                    
                }
            }
        },
        validationGroup: ['user.name', 'user.age']
    }
}
const state = {
    users:[{
        id:"1",
        name:"first name",
        age:32
    },{
        id:"2",
        name:"second name",
        age:42
    }]
}
const mutations = {
    updateUser(state,{user,idx}){
         const {users} = state;
         users.splice(idx,1,user);
    }
}
const getters = {
    getUserIdxById({users}){
        return (id)=>users.findIndex(user=>user.id===id)
    },
    getUserById({users},{getUserIdxById}){
        return (id)=>users[getUserIdxById(id)]
    }
}
const actions = {
   async updateUser({state,getters,commit},user){
        const {users} = state;
        const {getUserIdxById} = getters;
        const idx = getUserIdxById(user.id);
        const currentUser = users[idx];
        const params = Object.assign({},currentUser,user);
        setTimeout(() => {
            commit("updateUser",{user:params,idx});
        }, 1000);
   } 
}
export default {
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    modules:{validations},
    state,
    getters,
    mutations,
    actions
}