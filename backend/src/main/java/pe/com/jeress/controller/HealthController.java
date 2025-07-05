package pe.com.jeress.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.com.jeress.modelo.Health;

@RestController
public class HealthController {
    @GetMapping("/")
    public Health health() {
        return new Health();
    }
}
