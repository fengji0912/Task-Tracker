// PensionService.java
package com.example.backend;

import org.springframework.stereotype.Service;

@Service
public class PensionService {
    public double calculate(double savings, int currentAge, int retirementAge, double monthly, double rate) {
        int months = (retirementAge - currentAge) * 12;
        double total = savings;

        for (int i = 0; i < months; i++) {
            total += monthly;
            total *= (1 + rate / 12);
        }

        return Math.round(total * 100.0) / 100.0;
    }
}
