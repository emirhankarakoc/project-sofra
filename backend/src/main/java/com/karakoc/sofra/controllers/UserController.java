package com.karakoc.sofra.controllers;

import com.karakoc.sofra.food.FoodAdDTO;
import com.karakoc.sofra.food.FoodAdShortDTO;
import com.karakoc.sofra.security.UserPrincipal;
import com.karakoc.sofra.user.requests.AddBalanceRequest;
import com.karakoc.sofra.user.UserDTO;
import com.karakoc.sofra.user.UserService;
import com.karakoc.sofra.user.requests.SetRangeRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequestMapping("/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/{email}")
    public UserDTO getUser(@RequestParam String email, @AuthenticationPrincipal UserPrincipal principal){
        return userService.getUser(email);
    }

    @GetMapping("/list/shortfoodads")
    public List<FoodAdShortDTO> listAllFoodAdShorts(){
        return userService.listAllFoodAdShorts();
    }

    @GetMapping("/food/{id}")
    public FoodAdDTO getFoodAdDTO(@PathVariable String id){
        return userService.getFoodAdDTO(id);
    }


    @PostMapping("/food/buy/{adId}")
    public ResponseEntity buyFoodAd(@PathVariable String adId, @AuthenticationPrincipal UserPrincipal principal) throws IOException {
       return userService.buyFoodAd(adId,principal.getUserId());
    }

    @PostMapping("/balance/add")
    public UserDTO addBalance( @AuthenticationPrincipal UserPrincipal principal ,@RequestBody AddBalanceRequest request){
       return userService.increaseAccountBalance(Integer.parseInt(request.getAmount()), principal.getUserId());
    }

    @PostMapping("/food/all/range")
    public List<FoodAdDTO> getAllFoodsNearMe(@RequestBody SetRangeRequest request){
        return userService.getAllFoodsNearMe(request);
    }


}
