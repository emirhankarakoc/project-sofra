package com.karakoc.sofra.food;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
//data transfer object
public class FoodAdDTO {
    private String id;
    private String sellerId;
    private String name;
    private String description;
    private double price;
    private AdStatus adStatus;
    private LocalDateTime sharedAt;
    private List<String> photoPaths; // Birden fazla resim yolu için listeyi kullanabilirsiniz
    private double latitude;
    private double longitude;
}
