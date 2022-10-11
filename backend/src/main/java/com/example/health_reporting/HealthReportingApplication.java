package com.example.health_reporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
// @EnableAutoConfiguration(exclude = { SecurityAutoConfiguration.class,
// DataSourceAutoConfiguration.class })
public class HealthReportingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthReportingApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer(Environment environment) {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				String[] methods = new String[] { "GET", "POST", "PUT", "DELETE" };
				registry.addMapping("/**")
						.allowedMethods(methods)
						.allowedOrigins("http://localhost:3000", environment.getProperty("frontend_origin"));
				// .allowCredentials(true);
			}
		};
	}
}
