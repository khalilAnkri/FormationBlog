package com.backend.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private void sendEmail(String to, String subject, String content) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        helper.setFrom("khalil100ankri@gmail.com");

        mailSender.send(message);
    }

       // ✅ Email when user registers (Pending Status)
       public void sendPendingNotification(String email) throws MessagingException {
        String subject = "Your Account is Pending Approval";
        String content = "<p>Thank you for registering! Your account is currently under review.</p>"
                        + "<p>You will receive an email once your account has been approved or rejected.</p>";
        sendEmail(email, subject, content);
    }


    public void sendApprovalNotification(String email) throws MessagingException {
        String subject = "Account Approved";
        String content = "<p>Congratulations! Your account has been approved. You can now log in.</p>";
        sendEmail(email, subject, content);
    }

    public void sendRejectionNotification(String email) throws MessagingException {
        String subject = "Account Rejected";
        String content = "<p>We regret to inform you that your account has been rejected.</p>";
        sendEmail(email, subject, content);
    }
}
