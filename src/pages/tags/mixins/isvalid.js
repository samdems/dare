export default {
    methods: {
        isvalid(){
            if(!this.tag.name) {
                this.error = 'Name not set'
                return false
            } 
            if(this.tag.name.length < 0) {
                this.error = 'Name not set'
                return false
            }
            return true
        }
    },
}