package com.karakoc.sofra.food;

import com.karakoc.sofra.cloudinary.service.CloudinaryService;
import com.karakoc.sofra.exceptions.general.BadRequestException;
import com.karakoc.sofra.exceptions.general.NotfoundException;
import com.karakoc.sofra.exceptions.strings.ExceptionMessages;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.karakoc.sofra.food.FoodAd.*;

@Service
@Slf4j
@AllArgsConstructor
public class FoodAdManager implements FoodAdService {
    private final FoodAdRepository repository;
    private final ExceptionMessages messages;
    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional
    public FoodAdDTO createFoodAd(MultipartFile[] files, CreateFoodAdRequest request, String sellerId) {
        FoodAd ad = new FoodAd();
        ad.setId(UUID.randomUUID().toString());
        ad.setName(request.getName());
        ad.setPrice(Double.parseDouble(request.getPrice()));
        ad.setDescription(request.getDescription());
        ad.setLatitude(Double.parseDouble(request.getLatitude()));
        ad.setLongitude(Double.parseDouble(request.getLongitude()));
        ad.setSellerId(sellerId);
        ad.setAdStatus(AdStatus.LIVE);
        ad.setSharedAt(LocalDateTime.now());
        ad.setCloudImageIds(new ArrayList<>());
        ad.setPhotoPaths(new ArrayList<>());

        for (MultipartFile file: files) {
            try {
                if ( file.isEmpty()) {
                    throw new BadRequestException("Empty file.");
                }
                // Cloudinary'ye yükle
                Map uploadResult = cloudinaryService.upload(file);
                String photoPath = (String) uploadResult.get("url"); // Cloudinary'den gelen URL'yi al
                ad.getCloudImageIds().add((String) uploadResult.get("public_id"));
                ad.getPhotoPaths().add(photoPath); // Ürünün fotoğraf yolunu ayarla
            } catch (IOException e) {
                log.info(e.getMessage());
                throw new BadRequestException("Something went wrong at uploading image.");
            }
        }

        return foodAdToDTO(repository.save(ad));
    }

    @Override
    @Transactional
    public void deleteFoodAd(String id) throws IOException {
        FoodAd ad = repository.findById(id).orElseThrow(()->new NotfoundException(messages.getFOOD_NOT_FOUND_404()));
        ad.setAdStatus(AdStatus.REMOVED);
        for (String cloudId: ad.getCloudImageIds()) {
            cloudinaryService.delete(cloudId);
        }
        repository.save(ad);
    }

    @Override
    public List<FoodAdDTO> getAllMyAds(String sellerId) {
        List<FoodAd> ads = repository.findAllBySellerId(sellerId);
        return foodAdsToDTOS(ads);
    }
}
