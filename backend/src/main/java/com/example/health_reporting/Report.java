package com.example.health_reporting;

import java.time.Instant;
import java.util.UUID;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="reports", indexes = @Index(name = "user_index", columnList = "user_id"))
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private int temperature;

    private int pulse;

    @Embedded
    private BloodPressure bloodPressure;

    @Column(length=500)
    String comment;

    @Basic(optional=false)
    private Instant createdAt;
    
    public Long getId() {
        return id;
    }

    public UUID getUserUuid() {
        return user.getUuid();
    }

    public String getUserName() {
        return user.getName();
    }

    public int getTemperature() {
        return temperature;
    }

    public int getPulse() {
        return pulse;
    }

    public BloodPressure getBloodPressure() {
        return bloodPressure;
    }

    public String getComment() {
        return comment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Report setId(Long value) {
        id = value;
        return this;
    }

    public Report setTemperature(int value) {
        temperature = value;
        return this;
    }

    public Report setPulse(int value) {
        pulse = value;
        return this;
    }

    public Report setBloodPressure(BloodPressure value) {
        bloodPressure = value;
        return this;
    }

    public Report setComment(String value) {
        comment = value;
        return this;
    }

    public Report setCreatedAt(Instant value) {
        createdAt = value;
        return this;
    }

    public Report setUser(User value) {
        user = value;
        return this;
    }
}
