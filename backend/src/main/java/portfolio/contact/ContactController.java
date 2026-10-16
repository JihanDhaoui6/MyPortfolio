package portfolio.contact;

import portfolio.contact.dto.ContactRequest;
import portfolio.contact.dto.ContactResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> send(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {

        String ip = httpRequest.getRemoteAddr();
        service.save(request, ip);

        return ResponseEntity.ok(
            new ContactResponse(true, "Message envoyé avec succès")
        );
    }
}