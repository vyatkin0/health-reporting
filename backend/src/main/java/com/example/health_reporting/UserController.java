package com.example.health_reporting;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpServletRequest requestContext;

    private User authenticateUser() {
        try {
            String userId = requestContext.getHeader("x-user");

            if (null != userId) {
                UUID uuid = UUID.fromString(userId);
                Optional<User> u = userRepository.findFirstByUuid(uuid);
                if (u.isPresent()) {
                    return u.get();
                }
            }
        } catch (Exception e) {
            log.debug("Unable to authorize doctor");
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
    }

    @GetMapping("/list")
    public ListDto<User> list(@RequestParam("page") Optional<Integer> page,
            @RequestParam("size") Optional<Integer> size) {
        User au = authenticateUser();

        if (page.orElse(0) < 0) {
            page = Optional.of(0);
            log.debug("Wrong page {} specified, set to default value 0", page);
        }
        if (size.orElse(0) < 10) {
            size = Optional.of(10);
            log.debug("Wrong size {} specified, set to default value 10", page);
        }

        Pageable sortedByName = PageRequest.of(page.orElse(0), size.orElse(10),
                Sort.by("typeId").and(Sort.by("name")).and(Sort.by("id")));

        Page<User> p;
        if (au.getTypeId() == UserType.ADMIN) {
            p = userRepository.findByTypeIdIn(sortedByName, new UserType[] { UserType.ADMIN, UserType.DOCTOR });
        } else {
            p = userRepository.findByTypeIdAndCreatedBy(sortedByName, UserType.PATIENT, au.getId());
        }

        ListDto<User> result = new ListDto<>();
        result.setList(p.toList());
        result.setPage(p.getNumber());
        result.setSize(p.getSize());
        result.setTotal(p.getTotalElements());
        return result;
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable(value = "id") Long id) {

        User au = authenticateUser();
        UserType type = au.getTypeId() == UserType.ADMIN ? UserType.DOCTOR : UserType.PATIENT;

        if (id > 0) {
            return userRepository.findByIdAndTypeId(id, type);
        }
        return Optional.empty();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User postUser(@RequestBody Optional<User> user) {
        User au = authenticateUser();

        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not specified");
        }

        UserType type = au.getTypeId() == UserType.ADMIN ? user.get().getTypeId() : UserType.PATIENT;

        User u = new User();
        u.setName(user.get().getName())
                .setTypeId(type)
                .setUuid(UUID.randomUUID())
                .setCreatedAt(Instant.now())
                .setCreatedBy(au.getId());

        userRepository.save(u);
        return u;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User putUser(@PathVariable("id") Long id, @RequestBody Optional<User> user) {
        User au = authenticateUser();

        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not specified");
        }

        Optional<User> ou = userRepository.findById(id);
        if (ou.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        User u = ou.get().setName(user.get().getName());

        if (au.getTypeId() == UserType.ADMIN) {
            u.setTypeId(user.get().getTypeId());
        }

        return userRepository.save(u);
    }

    @DeleteMapping("/{id}")
    public Optional<User> deleteUser(@PathVariable(value = "id") long id) {
        User au = authenticateUser();

        Optional<User> u;

        if (au.getTypeId() == UserType.ADMIN) {
            u = userRepository.findById(id);
        } else {
            u = userRepository.findByIdAndTypeId(id, UserType.PATIENT);
        }

        if (u.isPresent()) {
            userRepository.delete(u.get());
            return u;
        }
        return Optional.empty();
    }
}