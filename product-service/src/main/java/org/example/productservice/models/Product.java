package org.example.productservice.models;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;


@Document(collection = "products")
@Accessors(chain = true)
@NoArgsConstructor
@Data
public class Product {

    @MongoId(FieldType.OBJECT_ID)
    private String id;

    @NotBlank(message="Name cannot be empty")
    private String name;

    private String description;

    private List<Attribute> attributes;

    @Positive(message = "Price must be greater than 0")
    private Double price;

    @DBRef
    private Category category;

    @Size(min = 1, message = "Brand must have at least 1 character")
    private String brand;

    @Positive(message = "Quantity must be greater than 0")
    private int quantity;

    private List<String> imgLinks;



    @Data
    public static class Attribute {
        private String name;
        private String value;

        public Attribute(String name, String value) {
            this.name = name;
            this.value = value;
        }

    }


}
