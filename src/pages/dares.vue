<template>
<div>
    <mt-header fixed title="fixed top" style="">
       <mt-button slot="right">
         <font-awesome-icon icon="plus" />
       </mt-button>
    </mt-header>
    <br><br>
    <mt-cell v-for="item in 10" :key="item" :title="'' + item"></mt-cell>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>