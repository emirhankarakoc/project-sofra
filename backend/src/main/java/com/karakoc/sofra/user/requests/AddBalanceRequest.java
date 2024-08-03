package com.karakoc.sofra.user.requests;

import lombok.Data;

@Data
public class AddBalanceRequest {
    private String amount; //double olmali. form data ile geliyor. bu yuzden String olarak handle edecegiz.
}
