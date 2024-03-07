// C:\Users\sasit\Documents\GitHub\research-nuxtjs\composables\FetchStore.ts
import { ref, onMounted } from 'vue';

const useFetchProducts = () => {
  const products = ref([]);
  const isUnauthorized = ref(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/proxy');
      if (response.ok) {
        products.value = await response.json();
      } 
    } catch (error) {
      isUnauthorized.value = true;
    }
  };

  onMounted(fetchProducts);

  return { products, isUnauthorized, fetchProducts };
};

export default useFetchProducts;
