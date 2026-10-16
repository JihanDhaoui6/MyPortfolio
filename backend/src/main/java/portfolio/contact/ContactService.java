package portfolio.contact;

import portfolio.contact.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactRepository repository;
    private final JavaMailSender mailSender;

    @Value("${contact.email.to:jihandhaoui65@gmail.com}")
    private String recipientEmail;

    public ContactService(ContactRepository repository, JavaMailSender mailSender) {
        this.repository = repository;
        this.mailSender = mailSender;
    }

    public ContactMessage save(ContactRequest request, String ipAddress) {
        // 1️⃣ Sauvegarde en base
        ContactMessage entity = new ContactMessage();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setMessage(request.getMessage());
        entity.setIpAddress(ipAddress);

        ContactMessage saved = repository.save(entity);
        log.info("Message de contact sauvegardé (id={})", saved.getId());

        // 2️⃣ Envoi email (best effort)
        try {
            sendEmail(saved);
        } catch (Exception e) {
            log.warn("Échec envoi email: {}", e.getMessage());
        }

        return saved;
    }

    private void sendEmail(ContactMessage msg) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(recipientEmail);
        mail.setReplyTo(msg.getEmail());
        mail.setSubject("📬 Nouveau message de " + msg.getName() + " — Portfolio");
        mail.setText(
            "Nom : " + msg.getName() + "\n" +
            "Email : " + msg.getEmail() + "\n" +
            "IP : " + msg.getIpAddress() + "\n" +
            "Date : " + msg.getCreatedAt() + "\n" +
            "\n--- MESSAGE ---\n" +
            msg.getMessage()
        );
        mailSender.send(mail);
        log.info("Email envoyé à {}", recipientEmail);
    }
}