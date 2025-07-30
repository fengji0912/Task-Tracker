// PensionController.java
package com.example.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/pension")
@CrossOrigin(origins = "*")
public class PensionController {

    @Autowired
    private PensionService service;

    @PostMapping("/simulate")
    public PensionResult simulate(@RequestBody PensionDTO input) {
        double result = service.calculate(
            input.currentSavings,
            input.currentAge,
            input.retirementAge,
            input.monthlyContribution,
            input.interestRate
        );
        return new PensionResult(result);
    }
}
