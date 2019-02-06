<template>
  <div>
    useredit
    {{getUserById("1")}}
    <form @submit.prevent="submit" @reset.prevent="reset">
      <user-edit-username :username.sync="user.name"/>
      <input v-model.trim="user.age">
      <div
        class="error"
        v-if="$v.$dirty&&!$v.user.age.between"
      >Must be between {{$v.user.age.$params.between.min}} and {{$v.user.age.$params.between.max}}</div>
      <input v-model.trim="user.testCustom" >
      <div
        class="error"
        v-if="$v.$dirty&&!$v.user.testCustom.isCustom"
      >isCustom error</div>
      <input type="submit">
      <input type="reset">
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import UserEditUsername from "./components/UserEditUsername.vue";
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("user");
export default {
  components:{UserEditUsername},
  provide(){
    return {
      $v:this.$v
    }
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        age: 0,
        testCustom:""
      }
    };
  },
  computed: {
    ...mapGetters(["getUserById"])
  },
  validations() {
    const { validations } = this.$store.state.user;
    validations.user.name.minLength = minLength(5);
    return validations;
  },
  created: function() {
    const user = this.getUserById(this.id);
    this.user = user;
  },
  methods: {
    ...mapActions(["updateUser"]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.updateUser(this.user);
      }
    },
    reset(){
      this.$v.$reset();
    }
  }
};
</script>

<style>
</style>
