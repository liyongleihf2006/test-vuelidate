<template>
    <div>
        userhome
        <keep-alive>
            <router-view
                :key="routerKey"
            />
        </keep-alive>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            routerKey:null
        }
    },
    watch:{
        $route:{
            handler:function({meta,params,matched}){
                if (matched.some(record => record.meta.userEdit)) {
                    const {id} = params;
                    this.routerKey = id;
                } else if(matched.some(record => record.meta.userList)) {
                    this.routerKey = "userList";
                }
            }
        }
    }
}
</script>

<style>

</style>
