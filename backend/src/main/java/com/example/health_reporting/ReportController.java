package com.example.health_reporting;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/report")
public class ReportController {
    private static Logger log = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpServletRequest requestContext;

    private User authorizeUser(UserType typeId, HttpStatus status) {
        try {
            String userId = requestContext.getHeader("x-user");

            if (null != userId) {
                UUID uuid = UUID.fromString(userId);
                Optional<User> u = userRepository.findFirstByUuidAndTypeId(uuid, typeId);
                if (u.isPresent()) {
                    return u.get();
                }
            }
        } catch (Exception e) {
            log.debug("Unable to authorize doctor");
        }

        throw new ResponseStatusException(status);
    }

    private User authorizeAdmin() {
        return authorizeUser(UserType.ADMIN, HttpStatus.UNAUTHORIZED);
    }

    private User authorizeDoctor() {
        return authorizeUser(UserType.DOCTOR, HttpStatus.UNAUTHORIZED);
    }

    private User authorizePatient() {
        return authorizeUser(UserType.PATIENT, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(value = { "/list", "/list/{userId}" })
    public ListDto<ReportDto> list(@RequestParam("page") Optional<Integer> page,
            @RequestParam("size") Optional<Integer> size, @PathVariable Optional<UUID> userId) {

        boolean isAdmin = userId.isPresent() && new UUID(0, 0).equals(userId.get());

        User doctor = isAdmin ? authorizeAdmin() : authorizeDoctor();

        if (page.orElse(0) < 0) {
            page = Optional.of(0);
            log.debug("Wrong page {} specified, set to default value 0", page);
        }
        if (size.orElse(0) < 10) {
            size = Optional.of(10);
            log.debug("Wrong size {} specified, set to default value 10", page);
        }

        Pageable sortedByIdDesc = PageRequest.of(page.orElse(0), size.orElse(10), Sort.by("id").descending());
        Page<Report> p;
        if (isAdmin) {
            p = reportRepository.findAll(sortedByIdDesc);
        } else if (userId.isPresent()) {
            p = reportRepository.findDoctorUserReports(sortedByIdDesc, doctor.getId(), userId.get());
        } else {
            p = reportRepository.findDoctorReports(sortedByIdDesc, doctor.getId());
        }

        List<ReportDto> listDto = p.stream().map(r -> {
            BigDecimal t = new BigDecimal(r.getTemperature()).divide(new BigDecimal(10));
            return new ReportDto()
                    .setId(r.getId())
                    .setTemperature(t)
                    .setPulse(r.getPulse())
                    .setSystolic(r.getBloodPressure().getSystolic())
                    .setDiastolic(r.getBloodPressure().getDiastolic())
                    .setComment(r.getComment())
                    .setCreatedAt(r.getCreatedAt())
                    .setUserName(r.getUserName())
                    .setUserUuid(r.getUserUuid());
        }).collect(Collectors.toList());

        ListDto<ReportDto> result = new ListDto<>();
        result.setList(listDto);
        result.setPage(p.getNumber());
        result.setSize(p.getSize());
        result.setTotal(p.getTotalElements());
        return result;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Report postReport(ReportDto report) {

        User patient = authorizePatient();

        Report r = new Report()
                .setTemperature(report.getTemperature().multiply(new BigDecimal(10)).intValue())
                .setPulse(report.getPulse())
                .setBloodPressure(new BloodPressure()
                        .setSystolic(report.getSystolic())
                        .setDiastolic(report.getDiastolic()))
                .setComment(report.getComment())
                .setUser(patient)
                .setCreatedAt(Instant.now());
        reportRepository.save(r);
        return r;
    }
}
