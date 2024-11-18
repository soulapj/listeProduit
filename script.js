const app = Vue.createApp({
    data() {
        return {
            arrProd: [
                {
                    name: "Produit 1",
                    price: 499,
                    quantity: 12,
                    category: "Catégorie 2"
                },
                {
                    name: "Produit 2",
                    price: 199,
                    quantity: 1,
                    category: "Catégorie 3"
                },
            ],

            newProd: {},
            isVisible: false,
            editProd: {},
            indexModal: -1,
        };
    },
    methods: {
        addProd(){
            console.log(this.newProd.name,this.newProd.price,this.newProd.quantity,this.newProd.category)
            if (this.newProd.name && this.newProd.price && this.newProd.quantity && this.newProd.category){
                this.arrProd.push(this.newProd);
                this.newProd = {};
            } else {
                alert("remplissze tous les champs")
            }
        },
        showModal(id){
            this.isVisible = true,
            this.editProd = {...this.arrProd[id]}//permet d'éviter le passage de valeur par réference
            this.indexModal = id
        },

        save(){
            if (this.editProd.name && this.editProd.price && this.editProd.quantity && this.editProd.category){
                this.arrProd[this.indexModal] = {...this.editProd}
                this.closeModal();
            }else {
                alert("remplissze tous les champs");
            }
        },
        closeModal(){
            this.isVisible = false;
        },
        deleted(id){
            if (confirm("vous êtes sur de vouloir le supprimer?")){
                this.arrProd.splice(id, 1)
            }
        },
        saveToLocalStorage(){
            localStorage.setItem("products",JSON.stringify(this.arrProd))
        }
    },

    watch: {
        arrProd:{
            deep:true,
            handler(){
                this.saveToLocalStorage()
            }
        }
    },

    created(){
        let storedProducts = localStorage.getItem("products");
        if (storedProducts){
            this.arrProd = JSON.parse(storedProducts)
        }
    }
})
app.mount('#app');