<!-- source : https://www.youtube.com/watch?v=3xBeFyLXCTk -->



<template>
    <div>
        <form @submit.prevent="submitCategory">
            <div>
                <label for="categoryName">Nom de la catégorie :</label>
                <input v-model="categoryName" id="categoryName" required />
            </div>
            <div>
                <label for="selectedProduct">Ajouter des produits :</label>
                <select v-model="selectedProduct" id="selectedProduct">
                    <option v-for="product in productsList" :key="product._id" :value="product._id">{{ product.nameProduct
                    }}</option>
                </select>
                <button @click.prevent="addProduct">Ajouter le produit</button>
            </div>
            <ul>
                <li v-for="product in addedProducts" :key="product">{{ product }}</li>
            </ul>
            <button type="submit">Créer la catégorie</button>
        </form>
        <p>{{ message }}</p>
    </div>

    <div>


        <div v-for="category in categories" :key="category._id" class="category module">
            <h1 class="titleCategory">{{ category.titleCategory }}</h1>
            <draggable tag="ul" :list="category.products" class="rayon" handle=".grabWrapper" item-key="name"
                ghost-class="ghost" drag-class="drag">
                <template #item="{ element, index }">
                    <li class="produit" :key="element._id" >
                        <div class="grabWrapper">
                            <i class="grab" aria-hidden="true">drag_indicator</i>
                        </div>
                        <div class="pictureProduit">
                            <img :src="element.imageUrl" class="imgproduit">
                        </div>
                        <div class="info" @click="goEditProduct(element._id)">
                            <div class="titleandinfo">
                                <h2 class="titleproduit">{{ element.nameProduct }}</h2>
                                <h3>{{ element.descriptionProduct }}</h3>
                            </div>
                        </div>
                        <div class="prixProduit" @click.stop="">
                            <input v-if="element.prixMenu" type="number" name="prixMenu" step="0.10" class="field-long"
                                placeholder="prix" pattern="^\d+(\.\d{1,2})?$" max="99.99" v-model="element.prixMenu">
                        </div>
                    </li>
                </template>
            </draggable>
        </div>
    </div>
</template>
  
<script>
import { productService } from '@/services/product.service'
import draggable from 'vuedraggable'
export default {
    name: "categoryIndex",
    components: {
        draggable
    },
    data() {
        return {
            drag: false,
            categories: [],
            categoryName: '',
            productsList: [],  // Liste de tous les produits disponibles (à récupérer depuis l'API).
            selectedProduct: null,
            addedProducts: [],
            message: ''
        };
    },
    created() {
        productService.getAllProducts()
            .then(res => {
                this.productsList = res.data.Allproduct
            })
            .catch(err => { console.log(err) })
            .catch(error => {
                console.error("Erreur lors de la récupération des produits:", error);
            });


        productService.getAllCategories()
            .then(res => {
                console.log(res)
                this.categories = res.data
            })
            .catch(err => { console.log(err) })


    },
    methods: {
        //     formattedPrice(price) {
        //     return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        // },

        goEditProduct(id) {
            this.$router.push({ name: 'productEdit', params: { id: id } })
        },

        addProduct() {
            const product = this.productsList.find(p => p._id === this.selectedProduct);
            if (product && !this.addedProducts.includes(product.nameProduct)) {
                this.addedProducts.push(product._id);
            }
        },
        submitCategory() {
            const categoryData = {
                titleCategory: this.categoryName,
                products: this.addedProducts
            };
            productService.createCategory(categoryData)
                .then((res) => {
                    console.log(res)
                    this.message = 'Catégorie créée avec succès !';
                    this.categoryName = '';
                    this.addedProducts = [];
                })
                .catch(error => {
                    this.message = 'Erreur lors de la création de la catégorie.';
                    console.error("Erreur:", error);
                });
        }
    }
}
</script>
  
<style scoped>

.category {
    padding: 10px;
}

.titleCategory {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
    text-align: left;
    font-size: 1em;
    font-weight: 500;
    padding: 15px 10px;
    color: var(--titleColor);
    text-transform: none;
}


.rayon {}

.produit {
    position: relative;
    width: 100%;
    border-radius: 8px;
    margin: 6px 0;
    overflow: hidden;
    height: 70PX;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    padding: 5px;
    box-sizing: border-box;
}

.pictureProduit {
    display: flex;
    width: 30%;
    overflow: hidden;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.imgproduit {
    z-index: 30;
    height: 130%;
    object-fit: cover;
}

.titleproduit {
    user-select: none;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
    text-align: left;
    font-size: 1em;
    text-transform: uppercase;
    color: #424242;
    font-weight: 500;
    line-height: 20px;
}

.info {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
    overflow: hidden;
    display: flex;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 10px;
    padding-bottom: 10px;
    margin-top: 0;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    text-align: left;
    line-height: 20px;
    width: 40%;
    box-sizing: border-box;
}

.info h3 {
    font-size: 0.9em;
}

.prixProduit {
    position: relative;
    display: inline-block;
    width: 20%;
    margin: auto;
}

.prixProduit p {
    color: black;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
}


.prixProduit::before {
    content: "€";
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial';
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.prixProduit .field-long {
    padding: 10px 5px 10px 20px;
    border: none;
    background-color: #e6e6e6;
    border-radius: 5px;
    min-width: 38px;
    margin: auto;
    max-width: 60%;
}

.drag {
    transform: scale(0.90);
    filter: drop-shadow(0px 22px 5px #0000005c);
}
.ghost {
   background-color: #ffffff1c;
}

.ghost > div{
    visibility: hidden;
}

.grabWrapper {
    width: 10%;
    margin: auto 0px auto 5px;
}

.grab {
    color: rgb(0 0 0 / 54%);
    cursor: grab;
    font-family: Material Icons;
    font-size: 23px;
}
</style>
  