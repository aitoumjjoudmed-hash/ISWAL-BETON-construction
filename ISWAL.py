from flask import Flask, render_template, url_for,request,redirect,flash
from flask_mail import Mail, Message
from vars import MAIL_USERNAME, MAIL_PASSWORD

ISWAL = Flask(__name__)
ISWAL.config.update(
    MAIL_SERVER='sandbox.smtp.mailtrap.io',
    MAIL_PORT=2525,
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    SECRET_KEY='any_thing'
)

mail = Mail(ISWAL)
@ISWAL.route("/")
def Accueil():
  return render_template("Accueil.html",title="Accueil", custo_css="Accueil")
@ISWAL.route("/À propos")
def À_propos():
 return render_template("À_propos.html",title="À propos",custo_css="À_propos")
@ISWAL.route("/Services")
def Services():
  return render_template("Services.html",title="Services",custo_css="Services")
@ISWAL.route("/Projects")
def Projects():
   return render_template("Projects.html", title="Projects",custo_css="Projects")
@ISWAL.route("/album1")
def album1():
  return render_template("album1.html",title="album1",custo_css="album")
@ISWAL.route("/album2")
def album2():
  return render_template("album2.html",title="album2",custo_css="album")
@ISWAL.route("/album3")
def album3():
  return render_template("album3.html",title="album3",custo_css="album")
@ISWAL.route("/album4")
def album4():
  return render_template("album4.html",title="album4",custo_css="album")
@ISWAL.route("/album5")
def album5():
  return render_template("album5.html",title="album5",custo_css="album")
@ISWAL.route("/album6")
def album6():
  return render_template("album6.html",title="album6",custo_css="album")
@ISWAL.route("/Contact")
def Contact():
  return render_template("Contact.html",title="Contact",custo_css="Contact")
@ISWAL.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        Téléphone = request.form['Téléphone']
        Sujet = request.form['Sujet'] 
        msg = Message(
            subject=f"New Contact Form Submission from {name}",
            sender='mmedd9032@gmail.com',
            recipients=['recipient@example.com']
        )
        msg.body = f"Name: {name}\nTéléphone: {Téléphone}\nEmail: {email}\nSujet:{Sujet}\nMessage: {message}"
        mail.send(msg)
        
        flash('Message sent successfully!', 'success')
        
        return redirect(url_for('Contact'))

if __name__ == "__main__":
  ISWAL.run(host="0.0.0.0",debug=True, port=9000)