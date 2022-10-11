package com.example.health_reporting;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum UserType {
    NULL,
    ADMIN,
    DOCTOR,
    PATIENT,
}