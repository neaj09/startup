<template>
        <router-link class="navBarLink" to="/admin/products/add">ajout produit</router-link>
            <h1>Liste des Produits</h1>
            <h2>Assurez-vous que votre menu est correct</h2>
<categoryIndex/>
            <div class="content-wrap">

                <table>
                    <thead>
                        <tr>
                            <th>index</th>
                            <th>NOM</th>
                            <th>DESCRIPTION</th>
                            <th>IMAGE</th>
                            <th>PRIX</th>
                            <th>DISPO</th>
                            <th>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product._id">
                            <td>{{ '#' + index }}</td>
                            <td>{{ product.nameProduct }}</td>
                            <td>{{ product.descriptionProduct }}</td>
                            <td><img :src="product.imageUrl" class="vignette"></td>


                            <!-- faire un computed  -->
                            <td>{{ product.prixProduct.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}
                            </td>
                            <td>
                                <div :class="product.available ? 'circle green' : 'circle red'"></div>
                            </td>

                            <td>
                                <div class="caseBtn">
                                    <button @click="$event => goEditProduct(product._id)" class="btn">Modifier</button>
                                    <button @click="$event => goDeleteProduct(product._id, index)"
                                        class="btn delete">Supprimer</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
</template>

<script>

import { productService } from '@/services/product.service'
import categoryIndex from '@/components/category.vue'

export default {
    name: 'productIndex',
    components: {
        categoryIndex,

    },
    data() {
        return {
            products: [],
        }
    },



    methods: {
        goEditProduct(id) {
            this.$router.push({ name: 'productEdit', params: { id: id } })
        },

        goDeleteProduct(id, index) {
            productService.deleteProduct(id)
                .then(res => {
                    console.log(res.data.message);
                    this.products.splice(index, 1)
                })
                .catch(err => console.log(err))
        }

    },
    mounted() {
        productService.getAllProducts()
            .then(res => {
                this.products = res.data.Allproduct
            })
            .catch(err => { console.log(err) })

    }
}

</script>

<style scoped>
.caseBtn {
    display: flex;
}

.vignette {
    width: 80px;
}


.admin-content {
    box-sizing: border-box;
    padding: 30px;
}

.content-wrap {
    margin-top: 30px;
    margin-bottom: 20px;
}

table {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
    border-collapse: collapse;
    box-shadow: 3px 2px 7px 0px #00000042;
}

table thead tr {
    height: 60px;
    background: var(--textColor);
}

table td,
table th {
    text-align: left;
    padding-left: 15px;
}

table th {
    font-family: 'Subtlecurves';
    font-size: 18px;
    color: var(--moduleColor);
    line-height: 1.2;
    font-weight: unset;
}

table tbody tr {
    height: 55px;
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: gray;
    line-height: 1.2;
    font-weight: unset;
}

table .btn {
    margin-right: 10px;
}

tbody tr:nth-child(even) {
    background-color: #f5f5f5;
}

.btn {
    font-size: 15px;
    font-family: 'Subtlecurves', cursive;
    padding: 4px 6px;
    background-color: #f68e51;
    color: white;
    border-radius: 9px;
    outline: none;
    cursor: pointer;
    border-width: 2px;
    box-shadow: inset 0px 1px 0px 1px #ffffff5e, inset 0px -1px 0px 1px #0000003b, 0px 1px 2px #111111de;
    transition: 0.3s ease;
}



.delete {
    background-color: #f65151;
}

.delete:hover {
    background-color: #ff7b7b;
}

@media (min-width: 769px) {


    .btn:hover {
        background-color: #ffbd6c;
        box-shadow: inset 0px 1px 0px 1px #ffffff5e, inset 0px -1px 0px 1px #0000003b, 0px 4px 2px #11111199;
        transform: scale(1.1);
    }

}
</style> 