// composables/FetchStore.ts
import { ref, onMounted } from 'vue';

const useFetchProducts = () => {
  const products = ref([]);
  const isUnauthorized = ref(false);

  const fetchProducts = async () => {
    try 
    {
      const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcwOTYyNDA1MSwiZXhwIjozMzI0NTYyNDA1MX0.01BroMNk9JXcaluf4IJ1HuZeCfDGAmxB5lgjhTFUOqE'
  
      const response = await fetch('http://wallserver.dyndns.info:10000/product/all', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      if (response.status === 401) {
        return 'Unauthorized';
      } else if (!response.ok) {
        return { error: response.statusText };
      }
  
      const data = await response.json();
      products.value =  data.message;
  
    } catch (error) {
      isUnauthorized.value = true;
    }

  };

  onMounted(fetchProducts);

  return { products, isUnauthorized, fetchProducts };
};

export default useFetchProducts;
