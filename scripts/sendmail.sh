# !/bin/sh


from='noreply@rhesusbase.com'
to='xiaochunfu@126.com'

email_date=''
email_content='~/mail.html'
email_subject='Test'


function send_email(){
    email_date=$(date "+%Y-%m-%d_%H:%M:%S")
    echo $email_date

    email_subject=$email_subject"__"$email_date
    echo $email_subject

    cat $email_content | mail -I "From: $from" -I "MIME-Version:1.0" -I "Content-type:text/html;charset=gb2312" -I "Subject: $email_subject" | /usr/sbin/sendmail -oi $to

}

send_email