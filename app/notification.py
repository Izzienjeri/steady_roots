import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr

def send_email_notification(subject, body, recipient_email):
    smtp_server = 'smtp.example.com'
    smtp_port = 587
    sender_email = 'your_email@example.com'
    sender_password = 'your_email_password'

    try:
        
        msg = MIMEMultipart()
        msg['From'] = formataddr(('Your App', sender_email))
        msg['To'] = recipient_email
        msg['Subject'] = subject

        
        msg.attach(MIMEText(body, 'plain'))

       
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)

            
            server.sendmail(sender_email, [recipient_email], msg.as_string())

        print(f"Email notification sent to {recipient_email}")
    except Exception as e:
        print(f"Error sending email: {e}")


