package com.karakoc.sofra.food;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.aop.target.LazyInitTargetSource;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class FoodAd {
    @Id
    private String id;

    private String sellerId;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private double price;
    private LocalDateTime sharedAt;
    @Enumerated
    private AdStatus adStatus;
    @ElementCollection
    private List<String> photoPaths; // Birden fazla resim yolu için listeyi kullanabilirsiniz
    @ElementCollection
    private List<String> cloudImageIds; // Cloudinary'den gelen ID'leri de liste olarak tutabilirsiniz

    private double latitude;

    private double longitude;

 /*
 * 8
 * 8
 * 8
 * 8
 * 8
 * 8
 * 8
  */
    public static FoodAdDTO foodAdToDTO(FoodAd foodAd) {
        var dto = new FoodAdDTO();
        dto.setId(foodAd.getId());
        dto.setSellerId(foodAd.getSellerId());
        dto.setName(foodAd.getName());
        dto.setDescription(foodAd.getDescription());
        dto.setPrice(foodAd.getPrice());
        dto.setLatitude(foodAd.getLatitude());
        dto.setLongitude(foodAd.getLongitude());
        dto.setAdStatus(foodAd.getAdStatus());
        dto.setSharedAt(foodAd.getSharedAt());
        dto.setPhotoPaths(foodAd.getPhotoPaths());
        return dto;
    }

    public static FoodAdShortDTO foodAdToShortDTO(FoodAd ad){
        var dto = new FoodAdShortDTO();
        dto.setName(ad.getName());
        dto.setPrice(ad.getPrice());
        dto.setDescription(ad.getDescription());
        return dto;
    }


    public static List<FoodAdShortDTO> foodAdsToShortDTOS(List<FoodAd> ads){
        List<FoodAdShortDTO> dtos = new ArrayList<>();
        for (FoodAd ad:ads) {
            dtos.add(foodAdToShortDTO(ad));
        }
        return dtos;
    }

    public static List<FoodAdDTO> foodAdsToDTOS(List<FoodAd> ads){
        List<FoodAdDTO> dtos = new ArrayList<>();
        for (FoodAd ad:ads) {
            dtos.add(foodAdToDTO(ad));
        }
        return dtos;
    }


}
