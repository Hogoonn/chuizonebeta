class Config(object):
	SECRET_KEY = "aaaaaaa"
	debug = False


class Production(Config):
	debug = True
	CSRF_ENABLED = False
	SQLALCHEMY_DATABASE_URI = "mysql://chuizonebeta:chuizone0000@54.64.144.138/chuizone"
	migration_directory = "migrations"

