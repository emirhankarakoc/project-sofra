package com.karakoc.sofra.food;


import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateFoodAdRequest {
    private MultipartFile[] files;
    private String name;
    private String description;
    private String price; //double
    private String latitude; //double
    private String longitude;// double

    //bu gotverenler, formdatadan sadece string gelebiliyor. o yuzden malesef durum boyle.
}
