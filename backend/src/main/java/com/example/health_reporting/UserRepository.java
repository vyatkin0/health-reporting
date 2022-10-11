package com.example.health_reporting;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByUuid(UUID uuid);
    Optional<User> findFirstByUuidAndTypeId(UUID uuid, UserType typeId);
    Optional<User> findByIdAndTypeId(Long id, UserType typeId);
    Page<User> findByTypeIdIn(Pageable sortedByName, UserType[] typeId);
    Page<User> findByTypeIdAndCreatedBy(Pageable sortedByName, UserType typeId, long createdBy);
}