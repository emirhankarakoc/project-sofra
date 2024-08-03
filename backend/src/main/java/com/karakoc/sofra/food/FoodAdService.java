package com.karakoc.sofra.food;


import com.karakoc.sofra.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FoodAdService {
    FoodAdDTO createFoodAd(MultipartFile[] files, CreateFoodAdRequest request, String sellerId);
    void deleteFoodAd(String id) throws IOException;
    List<FoodAdDTO> getAllMyAds(String sellerId);
}
