// PensionServiceTest.java
package com.example.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PensionServiceTest {

    @Test
    public void testCalculatePensionProjection() {
        PensionService service = new PensionService();

        double result = service.calculate(20000, 30, 65, 500, 0.05);

        // 精确到 2 位小数，允许浮动误差 ±0.1
        assertEquals(685087.44, result, 0.1);
    }

    @Test
    public void testZeroContribution() {
        PensionService service = new PensionService();

        double result = service.calculate(10000, 40, 65, 0, 0.05);

        assertTrue(result > 10000); // 至少增长
    }

    @Test
    public void testZeroInterest() {
        PensionService service = new PensionService();

        double result = service.calculate(10000, 40, 60, 100, 0.0);

        // 没有利息就是线性加总
        assertEquals(10000 + 100 * 12 * 20, result, 0.1);
    }
}
