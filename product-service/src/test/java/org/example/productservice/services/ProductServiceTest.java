package org.example.productservice.services;

import org.example.productservice.controllers.ProductController;
import org.example.productservice.dto.AddReviewBody;
import org.example.productservice.dto.CategoryUpdateBody;
import org.example.productservice.dto.ProductDetailsForOrder;
import org.example.productservice.dto.ProductUpdateBody;
import org.example.productservice.exception.customExceptions.BaseException;
import org.example.productservice.models.Category;
import org.example.productservice.models.Product;
import org.example.productservice.repository.CategoryRepository;
import org.example.productservice.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;


    @InjectMocks
    private ProductService productService;

    @Test
    public void addProduct_categoryNotFound() {
        String categoryId = "65dc544c00c5d91fb6192dd4";
        Product product = new Product();

        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        BaseException expectedException = assertThrows(BaseException.class, () -> productService.addProduct(product, categoryId));
        assertEquals("Category not found", expectedException.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, expectedException.getStatus());


        Mockito.verify(productRepository, Mockito.times(0)).save(product);
    }

    // Add product - category found
    @Test
    void addProduct_categoryFound() {
        String categoryId = "65dc544c00c5d91fb6192dd4";
        Product product = new Product();

        Category mockCategory = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(mockCategory));

        Product savedProduct = productService.addProduct(product, categoryId);

        assertNotNull(savedProduct);
        assertEquals(mockCategory, savedProduct.getCategory());

        Mockito.verify(productRepository, Mockito.times(1)).save(product);
    }


    // Update product - success
    @Test
    void updateProduct_success() {
        String productId = "123";
        ProductUpdateBody updatedProduct = new ProductUpdateBody();
        updatedProduct.setName("Updated Product");

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        Mockito.when(productRepository.save(existingProduct)).thenReturn(existingProduct);

        Product resultProduct = productService.updateProduct(productId, updatedProduct);

        assertNotNull(resultProduct);
        assertEquals(updatedProduct.getName(), resultProduct.getName());
    }


    // Delete product - success
    @Test
    void deleteProduct_success() {
        String productId = "123";

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        assertDoesNotThrow(() -> productService.deleteProduct(productId));

        Mockito.verify(productRepository, Mockito.times(1)).deleteById(productId);
    }


    // Add category - success
    @Test
    void addCategory_success() {
        Category categoryBody = new Category();

        Category savedCategory = new Category();
        Mockito.when(categoryRepository.save(categoryBody)).thenReturn(savedCategory);

        Category resultCategory = productService.addCategory(categoryBody);

        assertNotNull(resultCategory);
        assertEquals(savedCategory, resultCategory);
    }


    // Get products by category - success
    @Test
    void getProductsByCategory_success() {
        String categoryId = "65dc544c00c5d91fb6192dd4";

        List<Product> products = new ArrayList<>();
        Mockito.when(productRepository.findAll()).thenReturn(products);

        List<Product> resultProducts = productService.getProductsByCategory(categoryId);

        assertNotNull(resultProducts);
        assertTrue(resultProducts.isEmpty());
    }


    // Get filtered products - success
    @Test
    void getFilteredProducts_success() {
        Double minPrice = 10.0;
        Double maxPrice = 100.0;
        String keyword = "shoes";
        String categoryId = "65dc544c00c5d91fb6192dd4";

        List<Product> products = new ArrayList<>();
        Mockito.when(productRepository.findFilteredProducts(minPrice, maxPrice, keyword)).thenReturn(products);

        List<Product> resultProducts = productService.getFilteredProducts(minPrice, maxPrice, keyword, categoryId);

        assertNotNull(resultProducts);
        assertTrue(resultProducts.isEmpty());
    }


    // Get product by ID - success
    @Test
    void getProductById_success() {
        String productId = "123";

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        Product resultProduct = productService.getProductById(productId);

        assertNotNull(resultProduct);
        assertEquals(existingProduct, resultProduct);
    }


    // Get product details for order by ID - success
    @Test
    void getProductDetailsForOrderById_success() {
        String productId = "123";

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        ProductDetailsForOrder resultDetails = productService.getProductDetailsForOrderById(productId);

        assertNotNull(resultDetails);
        assertEquals(existingProduct.getName(), resultDetails.getName());
    }



    // Get product quantity by ID - success
    @Test
    void getProductQuantityById_success() {
        String productId = "123";

        Product existingProduct = new Product();
        existingProduct.setQuantity(10);
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        int resultQuantity = productService.getProductQuantityById(productId);

        assertEquals(existingProduct.getQuantity(), resultQuantity);
    }



    // Update product quantity - success
    @Test
    void updateProductQuantity_success() {
        String productId = "123";
        int quantity = 20;

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        Mockito.when(productRepository.save(existingProduct)).thenReturn(existingProduct);

        assertDoesNotThrow(() -> productService.updateProductQuantity(productId, quantity));

        assertEquals(quantity, existingProduct.getQuantity());
    }



    // Get category by ID - success
    @Test
    void getCategoryById_success() {
        String categoryId = "65dc544c00c5d91fb6192dd4";

        Category existingCategory = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));

        Category resultCategory = productService.getCategoryById(categoryId);

        assertNotNull(resultCategory);
        assertEquals(existingCategory, resultCategory);
    }



    // Update category by ID - success
    @Test
    void updateCategoryById_success() {
        String categoryId = "65dc544c00c5d91fb6192dd4";
        CategoryUpdateBody updatedCategory = new CategoryUpdateBody();
        updatedCategory.setName("Updated Category");

        Category existingCategory = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        Mockito.when(categoryRepository.save(existingCategory)).thenReturn(existingCategory);

        Category resultCategory = productService.updateCategoryById(categoryId, updatedCategory);

        assertNotNull(resultCategory);
        assertEquals(updatedCategory.getName(), resultCategory.getName());
    }



    // Delete category by ID - success
    @Test
    void deleteCategoryById_success() {
        String categoryId = "65dc544c00c5d91fb6192dd4";

        Category existingCategory = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));

        assertDoesNotThrow(() -> productService.deleteCategoryById(categoryId));

        Mockito.verify(categoryRepository, Mockito.times(1)).deleteById(categoryId);
        Mockito.verify(productRepository, Mockito.times(1)).deleteByCategory(existingCategory);
    }



    // Get all categories - success
    @Test
    void getAllCategories_success() {
        List<Category> categories = new ArrayList<>();
        Mockito.when(categoryRepository.findAll()).thenReturn(categories);

        List<Category> resultCategories = productService.getAllCategories();

        assertNotNull(resultCategories);
        assertTrue(resultCategories.isEmpty());
    }



    // Add review - success
    @Test
    void addReview_success() {
        String productId = "123";
        AddReviewBody addReviewBody = new AddReviewBody();
        addReviewBody.setRating(5);
        addReviewBody.setDescription("Great product!");

        Product existingProduct = new Product();
        Mockito.when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        Mockito.when(productRepository.save(existingProduct)).thenReturn(existingProduct);

        Product resultProduct = productService.addReview(productId, addReviewBody, 1);

        assertNotNull(resultProduct);
        assertFalse(resultProduct.getReviews().isEmpty());
        assertEquals(addReviewBody.getRating(), resultProduct.getReviews().get(0).getRating());
        assertEquals(addReviewBody.getDescription(), resultProduct.getReviews().get(0).getDescription());
    }



}