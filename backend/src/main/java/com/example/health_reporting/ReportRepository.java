package com.example.health_reporting;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Query("SELECT r FROM Report r JOIN r.user u WHERE u.createdBy = :doctor")
    Page<Report> findDoctorReports(Pageable pageable, @Param("doctor") long doctor);

    @Query("SELECT r FROM Report r JOIN r.user u WHERE u.createdBy = :doctor AND u.uuid = :user")
    Page<Report> findDoctorUserReports(Pageable pageable, @Param("doctor") long doctor, @Param("user") UUID user);
}