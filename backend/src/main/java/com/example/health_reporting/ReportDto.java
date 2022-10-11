package com.example.health_reporting;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

class ReportDto {
    private long id;
    private BigDecimal temperature;
    private int pulse;
    private int systolic;
    private int diastolic;
    private String comment;
    private Instant createdAt;
    private String userName;
    private UUID userUuid;

    public long getId() {
        return id;
    }

    public BigDecimal getTemperature() {
        return temperature;
    }

    public int getPulse() {
        return pulse;
    }

    public int getSystolic() {
        return systolic;
    }

    public int getDiastolic() {
        return diastolic;
    }

    public String getComment() {
        return comment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getUserName() {
        return userName;
    }

    public UUID getUserUuid() {
        return userUuid;
    }

    public ReportDto setId(long value) {
        id = value;
        return this;
    }

    public ReportDto setTemperature(BigDecimal value) {
        temperature = value;
        return this;
    }

    public ReportDto setPulse(int value) {
        pulse = value;
        return this;
    }

    public ReportDto setSystolic(int value) {
        systolic = value;
        return this;
    }

    public ReportDto setDiastolic(int value) {
        diastolic = value;
        return this;
    }

    public ReportDto setComment(String value) {
        comment = value;
        return this;
    }

    public ReportDto setCreatedAt(Instant value) {
        createdAt = value;
        return this;
    }

    public ReportDto setUserName(String value) {
        userName = value;
        return this;
    }

    public ReportDto setUserUuid(UUID value) {
        userUuid = value;
        return this;
    }
}