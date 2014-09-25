from app import db


class Academy(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	location = db.Column(db.String(255))
	category = db.Column(db.String(255))
	academy_name = db.Column(db.String(255))
	teacher_name = db.Column(db.String(255))
	academy_introduce = db.Column(db.Text())
	teacher_introduce = db.Column(db.Text())
	curriculum_introduce = db.Column(db.Text())
	academy_address = db.Column(db.String(255))
	academy_latlng = db.Column(db.String(255))
	welcome_line = db.Column(db.String(255))
	phone_number = db.Column(db.String(255))
	class_time = db.Column(db.Text())
	class_fee = db.Column(db.String(255))
	homepage = db.Column(db.String(255))