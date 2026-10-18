import smtplib
from email.mime.text import MIMEText
from config import Config

def send_email(to_email, subject, body):
    if not Config.EMAIL_ADDRESS or not Config.EMAIL_PASSWORD:
        raise Exception("Email credentials missing")

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = Config.EMAIL_ADDRESS
    msg['To'] = to_email

    try:
        server = smtplib.SMTP(Config.EMAIL_SMTP_SERVER, Config.EMAIL_SMTP_PORT)
        server.starttls()
        server.login(Config.EMAIL_ADDRESS, Config.EMAIL_PASSWORD)
        server.sendmail(Config.EMAIL_ADDRESS, [to_email], msg.as_string())
        server.quit()
        print(f"Email sent to {to_email} [OK]")
    except Exception as e:
        print(f"Failed to send email to {to_email} [ERROR]:", e)
