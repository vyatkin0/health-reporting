package com.example.health_reporting;

import javax.persistence.Embeddable;

@Embeddable
public class BloodPressure {
    private int systolic;
    private int diastolic;

    public int getSystolic() {
        return systolic;
    }

    public int getDiastolic() {
        return diastolic;
    }

    public BloodPressure setSystolic(int value) {
        systolic = value;
        return this;
    }

    public BloodPressure setDiastolic(int value) {
        diastolic = value;
        return this;
    }
}