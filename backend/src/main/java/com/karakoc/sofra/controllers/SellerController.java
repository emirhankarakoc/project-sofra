package com.karakoc.sofra.controllers;


import com.karakoc.sofra.food.*;
import com.karakoc.sofra.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/seller")
@RestController
@RequiredArgsConstructor
public class SellerController {
    private final FoodAdService foodAdService;

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @PostMapping(value = "/ad", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public void postFoodAd(@AuthenticationPrincipal UserPrincipal principal,
                           @RequestPart("multipartFiles") MultipartFile[] files,
                           @RequestParam("name") String name,
                           @RequestParam("description") String description,
                           @RequestParam("price") String price,
                           @RequestParam("latitude") String latitude,
                           @RequestParam("longitude") String longitude
                           ) {
        CreateFoodAdRequest request = new CreateFoodAdRequest();
        request.setFiles(files);
        request.setName(name);
        request.setDescription(description);
        request.setPrice(price);
        request.setLatitude(latitude);
        request.setLongitude(longitude);

        foodAdService.createFoodAd(files, request, principal.getUserId());
    }
    //yemek ilanimi satistan kaldirmak istiyorum.
    @DeleteMapping("/ad/{id}")
    public void deleteFoodAd(@PathVariable String id) throws IOException {
        foodAdService.deleteFoodAd(id);
    }

    //yemek ilanlarimi gormek istiyorum HEPSINI
    @GetMapping("/ads")
    public List<FoodAdDTO> getAllMyAds(@AuthenticationPrincipal UserPrincipal principal){
        return foodAdService.getAllMyAds(principal.getUserId());
    }
    /*
*
*
*
*
* 1 tane yemek ilanini gormek isteyemem, cunku herkes gorecek. o metod burada degil.
*
*
*
*
     */

    //yemek ilanimi guncellemek istiyorum.







}
