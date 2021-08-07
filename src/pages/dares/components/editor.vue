<template>
    <div>
        <mt-field label="name" placeholder="name" v-model="dare.name"></mt-field>
        <mt-field label="text" placeholder="text" v-model="dare.text" type="textarea" rows="4"></mt-field>
    </div>
</template>

<script>
 
export default {
    props:['value'],
    data() {
        return {
            dare:{}
        }
    },
    watch:{
        value(){
            this.dare = this.value 
        },
        dare(){
            this.$emit('input',this.dare)
        }
    }
}
</script>

<style>

</style>