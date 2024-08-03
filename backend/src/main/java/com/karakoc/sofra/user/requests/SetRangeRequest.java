package com.karakoc.sofra.user.requests;

import lombok.Data;

@Data
public class SetRangeRequest {
    private double range;
    private double latitude;
    private double longitude;
}
