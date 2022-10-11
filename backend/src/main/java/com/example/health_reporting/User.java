package com.example.health_reporting;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="users", indexes = @Index(name = "uuidIndex", columnList = "uuid", unique = true))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private UserType typeId;
    @Column(columnDefinition = "UUID")
    private UUID uuid;
    private long createdBy;

    @Basic(optional=false)
    private Instant createdAt;

    @OneToMany(mappedBy="user", cascade=CascadeType.ALL)
    List<Report> reports = null;

    public User setId(long value) {
        id = value;
        return this;
    }

    public User setCreatedBy(long value) {
        createdBy = value;
        return this;
    }

    public User setCreatedAt(Instant date) {
        createdAt = date;
        return this;
    }

    public User setName(String value) {
        name = value;
        return this;
    }

    public User setTypeId(UserType value) {
        typeId = value;
        return this;
    }

    public User setUuid(UUID value) {
        uuid = value;
        return this;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public UserType getTypeId() {
        return typeId;
    }

    public UUID getUuid() {
        return uuid;
    }
    
    public long getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}