<template>
    <div>
        userlist
        <table>
            <thead>
                <tr>
                    <th>
                        用户名
                    </th>
                    <th>
                        年龄
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="{id,name,age} in users" 
                    :key="id"
                >
                    <td>{{name}}</td>
                    <td>{{age}}</td>
                    <td>
                        <router-link :to="`/user-edit/${id}`">修改</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user');
export default {
    computed:{
        ...mapState(["users"])
    }
}
</script>

<style>

</style>
