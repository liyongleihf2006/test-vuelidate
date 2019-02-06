<template>
    <div>
        <input :value="username" @input="$emit('update:username',$event.target.value)">
        <div class="error" v-if="$v.$dirty && !$v.user.name.required">Field is required</div>
        <div
            class="error"
            v-if="$v.$dirty && !$v.user.name.minLength"
        >Name must have at least {{$v.user.name.$params.minLength.min}} letters.</div>
    </div>
</template>

<script>
export default {
    inject: ['$v'],
    props:{
        username:{
            required:true
        }
    },
    created:function(){
        console.log(this.$v);
    }
}
</script>

<style>

</style>
